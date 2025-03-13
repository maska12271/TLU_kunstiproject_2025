import type { ColumnType } from "kysely";
export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Image = {
  id: string;
  url: string;
  alt: string;
  /**
   * @kyselyType("Default" | "ZoomIn")
   */
  type: Generated<"Default" | "ZoomIn">;
  postId: string | null;
};
export type Post = {
  id: string;
  description: string;
  title: string;
  authorId: string;
};
export type Project = {
  id: string;
  name: string;
  isActive: number;
};
export type Session = {
  id: string;
  token: string;
  refreshToken: string;
  expires_at: number;
  user_id: string;
};
export type User = {
  id: string;
  username: string;
  name: string;
  password: string;
  salt: string;
  /**
   * @kyselyType("Member" | "Admin" | "SuperAdmin")
   */
  role: "Member" | "Admin" | "SuperAdmin";
  projectId: string | null;
};
export type DB = {
  Image: Image;
  Post: Post;
  Project: Project;
  Session: Session;
  User: User;
};
