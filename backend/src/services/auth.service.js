import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { Admin } from "../models/Admin.js";
import { ApiError } from "../utils/ApiError.js";

export async function loginAdmin({ email, password }) {
  if (!env.jwtSecret) throw new ApiError(500, "Server authentication is not configured");
  const admin = await Admin.findOne({ email }).select("+passwordHash");
  const valid = admin ? await bcrypt.compare(password, admin.passwordHash) : false;
  if (!admin || !valid) throw new ApiError(401, "Invalid email or password");
  const token = jwt.sign({ email: admin.email }, env.jwtSecret, {
    subject: String(admin._id),
    expiresIn: env.jwtExpiresIn,
  });
  return { token, admin: { id: admin._id, name: admin.name, email: admin.email } };
}

export async function getAdminProfile(id) {
  const admin = await Admin.findById(id).lean();
  if (!admin) throw new ApiError(401, "Account no longer exists");
  return { id: admin._id, name: admin.name, email: admin.email };
}
