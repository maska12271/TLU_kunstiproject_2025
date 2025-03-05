import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./trpc/routes/_app";
import cors from "cors";

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log("context 3");
    return {};
  },
}).listen(2022);
