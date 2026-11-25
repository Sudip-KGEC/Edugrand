
import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import { env } from "./config/env.js";
import { apiLimiter } from "./middleware/rateLimit.js";
import { errorHandler, notFound } from "./middleware/error.js";
import routes from "./routes/index.js";

const app = express();

app.disable("x-powered-by");
app.set("trust proxy", 1);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.clientOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],

  credentials: true,
  maxAge: 86400,
};

app.use(helmet());

app.use(cors(corsOptions));

app.use(compression());

app.use(express.json({ limit: "100kb" }));

app.use(apiLimiter);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    name: "EduGrand API",
    version: "1.0.0",
  });
});

app.use("/api", routes);

app.use(notFound);

app.use(errorHandler);

export default app;
