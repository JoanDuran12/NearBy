import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log(process.env.NEXT_PUBLIC_DATABASE_URL);
if (!process.env.NEXT_PUBLIC_DATABASE_URL)
  throw new Error("DATABASE_URL is required");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
