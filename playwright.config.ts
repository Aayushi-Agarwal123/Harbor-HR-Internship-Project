import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  workers: 1,
  use: { baseURL: "http://127.0.0.1:5173" },
  webServer: [
    {
      command: "python -m uvicorn app.main:app --host 127.0.0.1 --port 8000",
      cwd: "backend",
      env: { ...process.env, DATABASE_URL: "sqlite:///./harbor-e2e.db", HARBOR_RESET: "1" },
      url: "http://127.0.0.1:8000/api/health",
      reuseExistingServer: false,
    },
    {
      command: "npx vite --host 127.0.0.1 --port 5173",
      cwd: "frontend",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: false,
    },
  ],
});
