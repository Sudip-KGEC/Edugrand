import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const skip = ["components/animation/Animations.tsx", "app/layout.tsx"];

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

for (const file of [...walk("app"), ...walk("components")]) {
  const normal = file.replaceAll("\\", "/");
  if (!file.endsWith(".tsx") || skip.includes(normal)) continue;

  const original = readFileSync(file, "utf8");
  let text = original;

  for (const attr of ["data-reveal", "data-hero", "data-float", "data-bar"]) {
    text = text.replace(
      new RegExp(`(?<![\\w-])${attr}(?![\\w-])(?! suppressHydrationWarning)`, "g"),
      `${attr} suppressHydrationWarning`,
    );
  }

  text = text
    .replaceAll("data-parallax=", "suppressHydrationWarning data-parallax=")
    .replaceAll("data-count=", "suppressHydrationWarning data-count=")
    .replaceAll("suppressHydrationWarning suppressHydrationWarning", "suppressHydrationWarning");

  if (text !== original) {
    writeFileSync(file, text);
    console.log("updated", file);
  }
}