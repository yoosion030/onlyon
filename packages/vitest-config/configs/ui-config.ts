import { defineProject, mergeConfig } from "vitest/config";
import { baseConfig } from "./base-config.js";
import react from "@vitejs/plugin-react";

export const uiConfig = mergeConfig(
  baseConfig,
  defineProject({
    plugins: [react()],

    test: {
      environment: "jsdom",
      pool: "threads",
      globals: true,
    },
  })
);
