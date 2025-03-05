import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Post = {
  id: string;
  description: string;
  title: string;
  imageUrl: string;
  userId: string | null;
};
export type Project = {
  id: string;
  name: string;
};
export type ProjectToUser = {
  A: string;
  B: string;
};
export type Session = {
  id: string;
  expires_at: number;
  user_id: string;
};
export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
  /**
   * @kyselyType("Member" | "Admin" | "SuperAdmin")
   */
  role: "Member" | "Admin" | "SuperAdmin";
};
export type DB = {
  _ProjectToUser: ProjectToUser;
  Post: Post;
  Project: Project;
  Session: Session;
  User: User;
};
