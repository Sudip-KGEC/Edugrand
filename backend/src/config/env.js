import "dotenv/config";

const list = (value, fallback) =>
  (value || fallback)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientOrigins: list(process.env.CLIENT_ORIGINS, "http://localhost:3000,http://localhost:5173"),
  adminEmail: process.env.ADMIN_EMAIL || "",
  adminPassword: process.env.ADMIN_PASSWORD || "",
};

export const isProd = env.nodeEnv === "production";
