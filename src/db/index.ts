import "dotenv/config";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "./schema";

const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
});

export const db = drizzle(pool, { schema });
