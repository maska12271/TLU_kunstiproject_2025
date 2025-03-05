import { initTRPC } from "@trpc/server";

export const createContext = async () => {
  return {};
};

export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;
