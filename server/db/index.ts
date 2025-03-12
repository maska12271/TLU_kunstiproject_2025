import { Kysely, type RawBuilder, sql, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import type { DB } from "./schema";
import { generateIdFromEntropySize } from "lucia";
import bcrypt from "bcrypt";

export const sqlite = new Database("./db/db.sqlite");

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});

export function json<T>(obj: T): RawBuilder<T> {
  return sql`${JSON.stringify(obj)}`;
}

export async function initDB() {
  if ((await db.selectFrom("Project").selectAll().execute()).length == 0) {
    db.insertInto("Project").values([
      {
        id: generateIdFromEntropySize(10),
        name: "Project 1",
        isActive: true,
      },
      {
        id: generateIdFromEntropySize(10),
        name: "Project 2",
        isActive: true,
      },
      {
        id: generateIdFromEntropySize(10),
        name: "Project 3",
        isActive: true,
      },
      {
        id: generateIdFromEntropySize(10),
        name: "Project 4",
        isActive: true,
      },
    ]);
  }
  if ((await db.selectFrom("User").selectAll().execute()).length == 0) {
    const salt = generateIdFromEntropySize(10);
    db.insertInto("User").values({
      id: generateIdFromEntropySize(10),
      username: "admin",
      name: "Admin",
      password: bcrypt.hashSync("admin", salt),
      salt: salt,
      role: "SuperAdmin",
      projectId: (
        await db.selectFrom("Project").select("id").executeTakeFirstOrThrow()
      )?.id,
    });
  }
}
