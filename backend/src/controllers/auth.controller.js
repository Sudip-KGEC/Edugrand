import { asyncHandler } from "../utils/asyncHandler.js";
import * as service from "../services/auth.service.js";

export const login = asyncHandler(async (req, res) => {
  const data = await service.loginAdmin(req.body);
  res.json({ success: true, data });
});

export const me = asyncHandler(async (req, res) => {
  const data = await service.getAdminProfile(req.admin.id);
  res.json({ success: true, data });
});
