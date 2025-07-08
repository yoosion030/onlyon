import react from "@vitejs/plugin-react";
import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    plugins: [react()],

    test: {
      environment: "jsdom",
      pool: "threads",
      globals: true,
    },
  }),
);
