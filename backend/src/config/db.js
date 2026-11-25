import mongoose from "mongoose";
import { env } from "./env.js";

const cache = globalThis.__mongoose ?? (globalThis.__mongoose = { conn: null, promise: null });

export async function connectDB() {
  if (!env.mongoUri) throw new Error("MONGODB_URI is not configured");
  if (cache.conn) return cache.conn;
  mongoose.set("strictQuery", true);
  cache.promise ??= mongoose.connect(env.mongoUri, {
    bufferCommands: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 8000,
  });
  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    throw error;
  }
  return cache.conn;
}
