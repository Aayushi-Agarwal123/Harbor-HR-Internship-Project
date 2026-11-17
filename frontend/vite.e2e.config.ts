import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const api = process.env.HARBOR_E2E_API ?? "";
if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(api)) {
  throw new Error("HARBOR_E2E_API must be an explicit 127.0.0.1 origin.");
}
if (api.endsWith(":8000") || api.endsWith(":5173")) {
  throw new Error("Refusing the development API and frontend ports.");
}

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    strictPort: true,
    proxy: { "/api": api },
  },
});
