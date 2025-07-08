import { resolve } from "node:path";
import { uiConfig } from "@repo/vitest-config/ui";
import { mergeConfig } from "vitest/config";

export default mergeConfig(uiConfig, {
  resolve: {
    alias: {
      "@blog/components": resolve(__dirname, "./src/components"),
      "@blog/types": resolve(__dirname, "./src/types"),
      "@blog/utils": resolve(__dirname, "./src/utils"),
      "@blog/hooks": resolve(__dirname, "./src/hooks"),
      "@blog/libs": resolve(__dirname, "./src/libs"),
      "@repo/ui": resolve(
        __dirname,
        "../../packages/ui/src/components/index.ts",
      ),
      "@repo/utils": resolve(__dirname, "../../packages/utils/index.ts"),
    },
  },

  test: {
    setupFiles: ["./setup-test.tsx"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: "./coverage",
      enabled: true,
      reportOnFailure: true,

      thresholds: {
        lines: 0,
        branches: 0,
        functions: 0,
        statements: 0,
      },
    },
  },
});
