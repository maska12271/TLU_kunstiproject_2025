import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { appRouter } from "./trpc/routers/_app";
import cors from "cors";
import { createContext } from "./trpc/trpc";
import { lucia } from "./util/auth";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use(async (req, res, next) => {
  const sessionId = req.cookies[lucia.sessionCookieName];
  if (!sessionId) {
    res.locals.user = null;
    res.locals.session = null;
    return next();
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    res.cookie(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    res.cookie(sessionCookie.name, sessionCookie.value, {
      path: "/",
      ...sessionCookie.attributes,
    });
  }
  res.locals.user = user;
  res.locals.session = session;
  return next();
});

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

app.listen(2022);

declare module "express-serve-static-core" {
  interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    locals?: Record<string, any>;
  }
}
