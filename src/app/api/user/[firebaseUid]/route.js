import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

// GET a specific user
export async function GET(request, { params }) {
  try {
    const { firebaseUid } = await params;

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.firebase_uid, firebaseUid))
      .limit(1);

    if (!user[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE a specific user
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const { firebaseUid } = await params;

    const result = await db
      .update(usersTable)
      .set(body)
      .where(eq(usersTable.firebase_uid, firebaseUid))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: result[0] });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE a specific user
export async function DELETE(request, { params }) {
  try {
    const { firebaseUid } = await params;

    const result = await db
      .delete(usersTable)
      .where(eq(usersTable.firebase_uid, firebaseUid))
      .returning();

    if (!result[0]) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
