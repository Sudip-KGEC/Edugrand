import { asyncHandler } from "../utils/asyncHandler.js";
import * as scholarships from "../services/scholarship.service.js";
import * as inquiries from "../services/inquiry.service.js";
import { getDashboardStats } from "../services/stats.service.js";

export const stats = asyncHandler(async (_req, res) => {
  res.json({ success: true, data: await getDashboardStats() });
});

export const listScholarships = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await scholarships.listScholarships(req.validQuery, { publicOnly: false }) });
});

export const getScholarship = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await scholarships.getAdminScholarship(req.params.id) });
});

export const createScholarship = asyncHandler(async (req, res) => {
  res.status(201).json({ success: true, data: await scholarships.createScholarship(req.body) });
});

export const updateScholarship = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await scholarships.updateScholarship(req.params.id, req.body) });
});

export const removeScholarship = asyncHandler(async (req, res) => {
  await scholarships.deleteScholarship(req.params.id);
  res.json({ success: true });
});

export const listInquiries = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await inquiries.listInquiries(req.validQuery) });
});

export const updateInquiry = asyncHandler(async (req, res) => {
  res.json({ success: true, data: await inquiries.updateInquiry(req.params.id, req.body.status) });
});

export const removeInquiry = asyncHandler(async (req, res) => {
  await inquiries.deleteInquiry(req.params.id);
  res.json({ success: true });
});
