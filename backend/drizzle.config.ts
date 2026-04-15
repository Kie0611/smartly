import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/config/env";

export default defineConfig({
  schema: "./src/models/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: ENV.DB_URL!,
  }
})