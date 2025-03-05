import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routes/_app";
import cors from "cors";

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    return {};
  },
}).listen(2022);
