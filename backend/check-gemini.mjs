const model = process.env.GEMINI_MODEL || "gemini-flash-latest";
const started = Date.now();
try {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY ?? "" },
    body: JSON.stringify({ contents: [{ parts: [{ text: "Say hi in one word" }] }] }),
    signal: AbortSignal.timeout(40000),
  });
  const body = await response.text();
  console.log(`model: ${model}`);
  console.log(`status: ${response.status}`);
  console.log(`time: ${Date.now() - started} ms`);
  console.log(body.replace(/\s+/g, " ").slice(0, 400));
} catch (error) {
  console.log(`failed after ${Date.now() - started} ms: ${error.name} ${error.cause?.code ?? ""} ${error.message}`);
}