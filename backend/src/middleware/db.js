import { connectDB } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const ensureDb = asyncHandler(async (_req, _res, next) => {
  await connectDB();
  next();
});
