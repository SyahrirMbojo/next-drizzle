'use server'
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq, like, or, desc } from "drizzle-orm";
import { listRowPagination, ResultState } from "@/lib/utils";
import { CreateUserFormData, createUserSchema, UpdateUserFormData, updateUserSchema } from "./user-model";
import { hash } from "bcryptjs";
import z from "zod";

export async function getListUser(pg?: number, lm?: number, search?: string) {
  try {
    let page: number = 1;
    if (pg) {
      if (pg > 0) {
        page = Math.ceil(pg);
      }
    }

    let limit: number = 10;
    if (lm) {
      if (listRowPagination.includes(Number(lm))) {
        limit = Math.ceil(lm);
      }
    }

    const offset = (page - 1) * limit;

    let allUsers;
    let totalData;
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
        .where(
          or(like(users.name, `%${search}%`), like(users.email, `%${search}%`)),
        )
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset);

      totalData = await db
        .select({ count: users.id })
        .from(users)
        .where(
          or(like(users.name, `%${search}%`), like(users.email, `%${search}%`)),
        );
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

      totalData = await db.select({ count: users.id }).from(users);
    }

    const totalCount = totalData.length;
    const totalPages = Math.ceil(totalCount / limit);

    const results = {
      data: allUsers,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages,
      },
    };

    return results;
  } catch (error) {
    console.error("Error fetching users:", error);
    const results = {
      data: [],
      meta: null,
      message: "Internal server error",
      status: 500,
    };
    return results;
  }
}

export async function addUserWithApi(formdata: CreateUserFormData) {
  let formState: ResultState | null = null;
  try {
    const url = "/api/users";
    const method = "POST";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    });

    const result = await response.json();

    if (response.ok) {
      formState = {
        message: result.message,
        success: true,
        status: result.status,
      };
    } else {
      formState = {
        success: false,
        message: result.message,
        status: result.status,
      };
    }

    return formState;

  } catch (err) {
    formState = {
      success: false,
      message: "Internal server error",
      status: 500,
    };
    return formState;
  }
}

export async function createUser(
  formdata: CreateUserFormData,
): Promise<ResultState> {
  let formState: ResultState | null = null;
  try {
    const validatedData = createUserSchema.parse(formdata);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validatedData.email),
    });

    if (existingUser) {
      formState = {
        success: false,
        message: "User with this email already exists",
        status: 400,
      };
    } else {
      const hashedPassword = await hash(validatedData.password, 12);

      await db
        .insert(users)
        .values({
          name: validatedData.name,
          email: validatedData.email,
          password: hashedPassword,
        })
        .returning();

      formState = {
        message: "User created successfully",
        success: true,
        status: 201,
      };
    }

    return formState;
  } catch (error) {
    if (error && typeof error === "object" && "errors" in error) {
      const zodError = error as { errors: Array<{ message: string }> };
      formState = {
        message: zodError.errors[0]?.message || "Validation error",
        success: false,
        status: 400,
      };
    } else {
      formState = {
        message: "Internal server error",
        success: false,
        status: 500,
      };
    }
    console.error("Error creating user:", error);
    return formState;
  }
}

export async function updateuser(
  id: string,
  formdata: UpdateUserFormData
) {
  let formState: ResultState | null = null;
  try {
    // Parse with id included
    const validatedData = updateUserSchema.parse(formdata);

    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existingUser) {
      formState = {
        success: false,
        status: 404,
        message: "User not found"
      }
      return formState;
    }

    if (validatedData.email && validatedData.email !== existingUser.email) {
      const emailExists = await db.query.users.findFirst({
        where: eq(users.email, validatedData.email),
      });
      if (emailExists) {
        formState = {
          success: false,
          status: 400,
          message: "Email already exists"
        }
        return formState;
      }
    }

    const updateData: { name?: string; email?: string } = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.email) updateData.email = validatedData.email;

    await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    formState = {
      success: true,
      status: 200,
      message: "User updated successfully"
    }

    return formState;

  } catch (error) {
    if (error instanceof z.ZodError) {
      formState = {
        success: false,
        status: 400,
        message: error.message
      }
      return formState;
    }
    console.error("Error updating user:", error);
    formState = {
      success: false,
      status: 500,
      message: "Internal server error"
    }
    return formState;
  }
}

export async function deleteUser(
  id: string,
) {
  let resultState: ResultState | null = null;
  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.id, id),
    });

    if (!existingUser) {
      resultState = {
        success: false,
        status: 404,
        message: "User not found"
      }
      return resultState;
    }

    await db.delete(users).where(eq(users.id, id));

    resultState = {
      success: true,
      status: 200,
      message: "User deleted successfully"
    }

    return resultState;
  } catch (error) {
    console.error("Error deleting user:", error);
    resultState = {
      success: false,
      status: 500,
      message: "Internal server error"
    }
    return resultState
  }
}
