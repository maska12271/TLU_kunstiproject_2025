import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./trpc/routers/_app";
import cors from "cors";
import { createContext } from "./trpc/trpc";

const app = express();

app.use(cors());

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(2022);
