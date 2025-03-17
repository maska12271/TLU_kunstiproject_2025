import { Context, createContext } from "../trpc/trpc";
import { appRouter } from "../trpc/routers/_app";
import { createRequest, createResponse } from "node-mocks-http";
import { DB } from "../db/schema";
import { afterAll, expect } from "vitest";
import { generateIdFromEntropySize } from "lucia";
import { genSaltSync, hashSync } from "bcrypt";
import { db } from "../db";
import { lucia } from "../util/auth";
const salt = genSaltSync(10);

const callerUserList: DB["User"][] = [];

const testProjectResult = await db
  .insertInto("Project")
  .values({
    id: generateIdFromEntropySize(10),
    name: "Test Project " + generateIdFromEntropySize(5),
    isActive: 1,
  })
  .returningAll()
  .executeTakeFirstOrThrow();

expect(testProjectResult).toBeDefined();

globalThis.testProject = testProjectResult!;

const testAdminUserResult = await db
  .insertInto("User")
  .values({
    id: generateIdFromEntropySize(10),
    username: "TestAdmin" + generateIdFromEntropySize(5),
    name: "Test Admin " + generateIdFromEntropySize(5),
    password: hashSync("test", salt),
    salt: salt,
    role: "Admin",
    projectId: globalThis.testProject.id,
  })
  .returningAll()
  .executeTakeFirstOrThrow();

expect(testAdminUserResult).toBeDefined();

globalThis.testAdminUser = testAdminUserResult!;

globalThis.createCaller = async ({ user }: { user?: Context["user"] } = {}) => {
  const ctx = await createContext({
    req: createRequest(),
    res: createResponse(),
  });

  if (user != undefined) {
    await lucia.invalidateUserSessions(user.id);

    const session = await lucia.createSession(user.id, {
      token: generateIdFromEntropySize(10),
      refreshToken: generateIdFromEntropySize(10),
    });

    const { session: validatedSession, user: validatedUser } =
      await lucia.validateSession(session.id);
    ctx.user = validatedUser;
    ctx.session = validatedSession;

    expect(ctx.user).not.toBeNull();
    expect(ctx.session).not.toBeNull();

    callerUserList.push(ctx.user);
  }

  return appRouter.createCaller(ctx);
};

afterAll(async () => {
  console.log("Final cleanup");
  await lucia.invalidateUserSessions(globalThis.testAdminUser.id);
  await db
    .deleteFrom("Project")
    .where("id", "=", globalThis.testProject.id)
    .execute();
  await db
    .deleteFrom("User")
    .where("id", "=", globalThis.testAdminUser.id)
    .execute();

  for (let i = 0; i < callerUserList.length; i++) {
    await lucia.invalidateUserSessions(callerUserList[i].id);
    await db
      .deleteFrom("User")
      .where("id", "=", callerUserList[i].id)
      .execute();
  }
});
