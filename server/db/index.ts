import { Kysely, type RawBuilder, sql, SqliteDialect } from "kysely";
import Database from "better-sqlite3";
import type { DB } from "./schema";

export const sqlite = new Database("./db/db.sqlite");

export const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: sqlite,
  }),
});

export function json<T>(obj: T): RawBuilder<T> {
  return sql`${JSON.stringify(obj)}`;
}
