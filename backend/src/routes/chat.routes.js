import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { chatLimiter } from "../middleware/rateLimit.js";
import { chatBody } from "../validations/schemas.js";
import * as controller from "../controllers/chat.controller.js";

const router = Router();

router.post("/", chatLimiter, validate(chatBody), controller.message);

export default router;
