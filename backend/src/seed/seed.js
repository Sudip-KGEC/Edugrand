import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { env } from "../config/env.js";
import { Admin } from "../models/Admin.js";
import { Scholarship } from "../models/Scholarship.js";
import { slugify } from "../utils/slugify.js";
import { scholarships } from "./data.js";

async function run() {
  await connectDB();

  await Promise.all(
    scholarships.map((item) => {
      const slug = slugify(item.title);
      return Scholarship.updateOne({ slug }, { $set: { applyUrl: `https://example.org/scholarships/${slug}`, ...item, slug, status: "active" } }, { upsert: true });
    }),
  );
  console.log(`Seeded ${scholarships.length} scholarships`);

  if (env.adminEmail && env.adminPassword) {
    const passwordHash = await bcrypt.hash(env.adminPassword, 12);
    await Admin.updateOne(
      { email: env.adminEmail.toLowerCase() },
      { $set: { name: "Administrator", passwordHash } },
      { upsert: true },
    );
    console.log(`Admin ready: ${env.adminEmail}`);
  } else {
    console.log("ADMIN_EMAIL and ADMIN_PASSWORD not set, skipped admin creation");
  }

  await mongoose.disconnect();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
