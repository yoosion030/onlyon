import { uiConfig } from "@repo/vitest-config/ui";
import { mergeConfig } from "vitest/config";

export default mergeConfig(uiConfig, {
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
