import { hash } from "bcryptjs";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, like, or, desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { userSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
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

    return NextResponse.json({
      data: allUsers,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = userSchema.parse(body);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(validatedData.password, 12);

    const newUser = await db
      .insert(users)
      .values({
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser[0].id,
          name: newUser[0].name,
          email: newUser[0].email,
          createdAt: newUser[0].createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'errors' in error) {
      const zodError = error as { errors: Array<{ message: string }> };
      return NextResponse.json(
        { message: zodError.errors[0]?.message || "Validation error" },
        { status: 400 }
      );
    }
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}