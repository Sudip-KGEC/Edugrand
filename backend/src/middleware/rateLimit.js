import rateLimit from "express-rate-limit";

const build = (windowMs, limit, message) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { success: false, message },
  });

export const apiLimiter = build(60_000, 120, "Too many requests, please slow down");
export const formLimiter = build(15 * 60_000, 10, "Too many submissions, please try again later");
export const chatLimiter = build(60_000, 20, "You are sending messages too quickly");
export const loginLimiter = build(15 * 60_000, 10, "Too many login attempts, please try again later");
