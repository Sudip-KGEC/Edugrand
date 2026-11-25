import { asyncHandler } from "../utils/asyncHandler.js";
import * as service from "../services/inquiry.service.js";

export const contact = asyncHandler(async (req, res) => {
  if (req.body.website) return res.status(201).json({ success: true });
  await service.createContact(req.body);
  res.status(201).json({ success: true, message: "Thanks, we will get back to you soon." });
});

export const newsletter = asyncHandler(async (req, res) => {
  await service.subscribe(req.body.email);
  res.status(201).json({ success: true, message: "You are subscribed to scholarship alerts." });
});
