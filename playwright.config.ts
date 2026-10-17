import { defineConfig, devices } from "@playwright/test";

const E2E_SERVER = {
  port: Number(process.env.E2E_PORT ?? 8080),
  timeout: 120_000,
};

const baseURL = `http://localhost:${E2E_SERVER.port}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: `npm run build && npx next start -p ${E2E_SERVER.port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: E2E_SERVER.timeout,
  },
});
