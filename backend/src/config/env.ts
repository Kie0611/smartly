import "dotenv/config";

export const ENV = {
  PORT: process.env.PORT || 4000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV || "development",
}