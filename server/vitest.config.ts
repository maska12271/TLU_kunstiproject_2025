import { defineConfig } from "vite";

export default defineConfig({
  test: {
    include: ["./**/*.test.ts"],
    setupFiles: "./test/setup.ts",
    inspect: true,
    fileParallelism: false,
    watch: false,
  },
});
