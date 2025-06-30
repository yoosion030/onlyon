import { defineConfig } from "vitest/config";

export const baseConfig = defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      enabled: true,
    },
  },
});
