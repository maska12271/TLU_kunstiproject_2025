import type { Selectable } from "kysely";
import { Lucia } from "lucia";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import type { DB } from "../db/schema";
import { sqlite } from "../db";

const adapter = new BetterSqlite3Adapter(sqlite, {
  user: "User",
  session: "Session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: false, // CHNAGE TO DEV
    },
  },
  getUserAttributes(db) {
    return {
      username: db.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Selectable<DB["User"]>;
  }
}
