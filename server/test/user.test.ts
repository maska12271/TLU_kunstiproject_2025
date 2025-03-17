import { describe, it, expect, afterAll } from "vitest";
import { DB } from "../db/schema";
import { db } from "../db";
import { lucia } from "../util/auth";

const createdUsers: DB["User"][] = [];

const createCaller = globalThis.createCaller;
const testProject = globalThis.testProject;
const testAdminUser = globalThis.testAdminUser;

describe("User Router", () => {
  it("Create a new Member user", async () => {
    console.log("First");

    const unauthedCaller = await globalThis.createCaller();

    await expect(
      unauthedCaller.user.create({
        name: "Test User",
        isAdmin: false,
        projectId: testProject.id,
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.create({
      name: "Test User",
      isAdmin: false,
      projectId: testProject.id,
    });

    expect(result).toBeDefined();

    expect(result!.name).toBe("Test User");
    expect(result!.role).toBe("Member");
    expect(result!.projectId).toBe(testProject.id);
    expect(result!.id).toBeDefined();

    const user = await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", result!.id)
      .executeTakeFirst();

    expect(user).toBeDefined();
    expect(user!.name).toBe("Test User");
    expect(user!.role).toBe("Member");
    expect(user!.projectId).toBe(testProject.id);

    createdUsers.push(result!);
  });

  it("Create a new Admin user", async () => {
    console.log("Second");
    const unauthedCaller = await createCaller();

    await expect(
      unauthedCaller.user.create({
        name: "Test User",
        isAdmin: true,
        projectId: testProject.id,
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.create({
      name: "Test User",
      isAdmin: true,
      projectId: testProject.id,
    });

    expect(result).toBeDefined();

    expect(result!.name).toBe("Test User");
    expect(result!.role).toBe("Admin");
    expect(result!.projectId).toBe(testProject.id);
    expect(result!.id).toBeDefined();

    const user = await db
      .selectFrom("User")
      .selectAll()
      .where("id", "=", result!.id)
      .executeTakeFirst();

    expect(user).toBeDefined();
    expect(user!.name).toBe("Test User");
    expect(user!.role).toBe("Admin");
    expect(user!.projectId).toBe(testProject.id);

    createdUsers.push(result!);
  });

  it("List users", async () => {
    console.log("Third");
    const unauthedCaller = await createCaller();

    await expect(unauthedCaller.user.getList()).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.getList({ perPage: 100 });
    const dbResult = await db.selectFrom("User").selectAll().execute();

    expect(dbResult).toBeDefined();

    expect(result).toBeDefined();

    expect(result).toBeInstanceOf(Object);
    expect(result).toHaveProperty("users");
    expect(result.users).toBeInstanceOf(Array);
    expect(result.users.length).toBeGreaterThanOrEqual(2);

    expect(result.users).toContainEqual({
      id: createdUsers[0].id,
      name: createdUsers[0].name,
      username: createdUsers[0].username,
      role: createdUsers[0].role,
      projectId: createdUsers[0].projectId,
    });
    expect(result.users).toContainEqual({
      id: createdUsers[1].id,
      name: createdUsers[1].name,
      username: createdUsers[1].username,
      role: createdUsers[1].role,
      projectId: createdUsers[1].projectId,
    });
  });

  it("Get user by id", async () => {
    const unauthedCaller = await globalThis.createCaller();

    await expect(
      unauthedCaller.user.getById({
        id: createdUsers[0].id,
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await globalThis.createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.getById({
      id: createdUsers[0].id,
    });

    console.log(result);

    expect(result).toBeDefined();

    expect(result.id).toBe(createdUsers[0].id);
    expect(result.name).toBe(createdUsers[0].name);
    expect(result.username).toBe(createdUsers[0].username);
    expect(result.role).toBe(createdUsers[0].role);
    expect(result.projectId).toBe(createdUsers[0].projectId);
  });

  it("Update user", async () => {
    const unauthedCaller = await globalThis.createCaller();

    await expect(
      unauthedCaller.user.update({
        id: createdUsers[0].id,
        name: "Test User Updated",
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await globalThis.createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.update({
      id: createdUsers[0].id,
      name: "Test User Updated",
    });

    expect(result).toBeDefined();

    expect(result.id).toBe(createdUsers[0].id);
    expect(result.name).toBe("Test User Updated");
    expect(result.username).toBe(createdUsers[0].username);
    expect(result.role).toBe(createdUsers[0].role);
    expect(result.projectId).toBe(createdUsers[0].projectId);
  });

  it("Delete user", async () => {
    const unauthedCaller = await globalThis.createCaller();

    await expect(
      unauthedCaller.user.delete({
        id: createdUsers[0].id,
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "UNAUTHORIZED",
      }),
    );

    const authedCaller = await globalThis.createCaller({
      user: testAdminUser,
    });

    const result = await authedCaller.user.delete({
      id: createdUsers[0].id,
    });

    expect(result).toBeDefined();

    expect(result.success).toBe(true);

    await expect(
      authedCaller.user.getById({
        id: createdUsers[0].id,
      }),
    ).rejects.toThrowError(
      expect.objectContaining({
        code: "NOT_FOUND",
      }),
    );
  });

  afterAll(async () => {
    console.log("User test cleanup");
    for (let i = 0; i < createdUsers.length; i++) {
      await lucia.invalidateUserSessions(createdUsers[i].id);
      await db
        .deleteFrom("User")
        .where("id", "=", createdUsers[i].id)
        .execute();
    }
  });
});
