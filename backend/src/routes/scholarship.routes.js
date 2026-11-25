import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { scholarshipQuery } from "../validations/schemas.js";
import * as controller from "../controllers/scholarship.controller.js";

const router = Router();

router.get("/", validate(scholarshipQuery, "query"), controller.list);
router.get("/meta", controller.meta);
router.get("/slugs", controller.slugs);
router.get("/:slug", controller.detail);

export default router;
