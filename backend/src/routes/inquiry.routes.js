import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { formLimiter } from "../middleware/rateLimit.js";
import { contactBody, newsletterBody } from "../validations/schemas.js";
import * as controller from "../controllers/inquiry.controller.js";

const router = Router();

router.post("/contact", formLimiter, validate(contactBody), controller.contact);
router.post("/newsletter", formLimiter, validate(newsletterBody), controller.newsletter);

export default router;
