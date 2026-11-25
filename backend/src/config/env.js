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
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-flash-latest",
  geminiFallbackModels: list(process.env.GEMINI_FALLBACK_MODELS, "gemini-flash-lite-latest,gemini-2.5-flash"),
  geminiBaseUrl: process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/models",
  geminiTimeoutMs: Number(process.env.GEMINI_TIMEOUT_MS) || 18000,
};

export const isProd = env.nodeEnv === "production";
