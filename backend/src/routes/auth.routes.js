import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { requireAdmin } from "../middleware/auth.js";
import { loginLimiter } from "../middleware/rateLimit.js";
import { loginBody } from "../validations/schemas.js";
import * as controller from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginLimiter, validate(loginBody), controller.login);
router.get("/me", requireAdmin, controller.me);

export default router;
