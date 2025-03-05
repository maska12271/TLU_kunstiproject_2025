import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/TLU_kunstiproject_2025/", // Make sure this matches your repo name
});
