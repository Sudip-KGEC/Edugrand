import { Router } from "express";
import mongoose from "mongoose";
import { ensureDb } from "../middleware/db.js";
import scholarshipRoutes from "./scholarship.routes.js";
import authRoutes from "./auth.routes.js";
import inquiryRoutes from "./inquiry.routes.js";
import chatRoutes from "./chat.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "idle",
    time: new Date().toISOString(),
  });
});

router.use("/scholarships", ensureDb, scholarshipRoutes);
router.use("/auth", ensureDb, authRoutes);
router.use("/inquiries", ensureDb, inquiryRoutes);
router.use("/chat", ensureDb, chatRoutes);
router.use("/admin", ensureDb, adminRoutes);

export default router;
