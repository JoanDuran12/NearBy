import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";

// GET all users
export async function GET() {
  try {
    const users = await db.select().from(usersTable);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const result = await db.insert(usersTable).values(body).returning();

    return NextResponse.json({ user: result[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
