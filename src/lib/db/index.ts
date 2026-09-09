import { createPool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from "@/lib/db/schema/auth";

const pool = createPool(process.env.DATABASE_URL!);

export const db = drizzle(pool, { schema, mode: "default" });
