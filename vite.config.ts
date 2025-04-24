import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { loadEnv } from "vite";
import { resolve } from "path";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return mergeConfig(
    defineConfig({
      plugins: [react()],
    }),
    defineTestConfig({
      test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "src/setupTests.ts",
      },
      base: env.VITE_BASE_URL,
      build: {
        rollupOptions: {
          input: {
            main: resolve(__dirname, "index.refactoring.html"),
          },
        },
      },
    }),
  );
};
