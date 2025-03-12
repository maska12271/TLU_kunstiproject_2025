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
      secure: false, // TODO: CHANGE TO DEV
    },
  },
  getUserAttributes(db) {
    return {
      username: db.username,
      name: db.name,
      role: db.role,
    };
  },
  getSessionAttributes(db) {
    return {
      token: db.token,
      refreshToken: db.refreshToken,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      username: Selectable<DB["User"]>["username"];
      name: Selectable<DB["User"]>["name"];
      role: Selectable<DB["User"]>["role"];
    };
    DatabaseSessionAttributes: {
      token: Selectable<DB["Session"]>["token"];
      refreshToken: Selectable<DB["Session"]>["refreshToken"];
    };
  }
}
