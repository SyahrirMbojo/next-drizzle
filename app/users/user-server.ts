import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, like, or, desc } from "drizzle-orm";

export async function getListUser(pg?: number, lm?: number, search?: string) {
    try {
        const page = pg ? Math.ceil(pg) : 1;
        const limit = lm ? Math.ceil(lm) : 10;
        const offset = (page - 1) * limit;

        let allUsers;
        if (search) {
          allUsers = await db
            .select({
              id: users.id,
              name: users.name,
              email: users.email,
              image: users.image,
              createdAt: users.createdAt,
              updatedAt: users.updatedAt,
            })
            .from(users)
            .where(or(like(users.name, `%${search}%`), like(users.email, `%${search}%`)))
            .orderBy(desc(users.createdAt))
            .limit(limit)
            .offset(offset);
        } else {
          allUsers = await db
            .select({
              id: users.id,
              name: users.name,
              email: users.email,
              image: users.image,
              createdAt: users.createdAt,
              updatedAt: users.updatedAt,
            })
            .from(users)
            .orderBy(desc(users.createdAt))
            .limit(limit)
            .offset(offset);
        }
    
        const totalCountResult = await db.select({ count: users.id }).from(users);
        const totalCount = totalCountResult.length;

        const totalPages = Math.ceil(totalCount / limit)

        const results = {
            data: allUsers,
            meta: {
                total: totalCount,
                page,
                limit,
                totalPages
            }
        }
    
        return results
      } catch (error) {
        console.error("Error fetching users:", error);
        const results = {
            data: [],
            meta: null,
            message: "Internal server error",
            status: 500
        }
        return results
      }
}