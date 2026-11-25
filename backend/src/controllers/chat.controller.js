import { asyncHandler } from "../utils/asyncHandler.js";
import { answer } from "../services/chat.service.js";

export const message = asyncHandler(async (req, res) => {
const data = await answer(req.body.message, req.body.history);
  res.json({ success: true, data });
});
