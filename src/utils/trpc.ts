import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../server/trpc/routers/_app";
export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
