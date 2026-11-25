import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  inquiryQuery,
  inquiryUpdate,
  scholarshipBody,
  scholarshipQuery,
  scholarshipUpdate,
} from "../validations/schemas.js";
import * as controller from "../controllers/admin.controller.js";

const router = Router();

router.use(requireAdmin);

router.get("/stats", controller.stats);

router.get("/scholarships", validate(scholarshipQuery, "query"), controller.listScholarships);
router.post("/scholarships", validate(scholarshipBody), controller.createScholarship);
router.get("/scholarships/:id", controller.getScholarship);
router.put("/scholarships/:id", validate(scholarshipUpdate), controller.updateScholarship);
router.delete("/scholarships/:id", controller.removeScholarship);

router.get("/inquiries", validate(inquiryQuery, "query"), controller.listInquiries);
router.patch("/inquiries/:id", validate(inquiryUpdate), controller.updateInquiry);
router.delete("/inquiries/:id", controller.removeInquiry);

export default router;
