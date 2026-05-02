import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const text = readFileSync(
  join(__dirname, "../app/_lib/Thich_Nhat_Hanh.txt"),
  "utf8",
);

// Curly open/close quotes used in the Goodreads export
const OPEN = "“";
const CLOSE = "”";
const regex = new RegExp(`${OPEN}([\\s\\S]*?)${CLOSE}`, "g");

const quotes = [];
let match;
while ((match = regex.exec(text)) !== null) {
  const q = match[1].replace(/\n/g, " ").replace(/\s+/g, " ").trim();
  if (q.length > 10) quotes.push(q);
}

writeFileSync(
  join(__dirname, "../app/_lib/tnh-quotes.json"),
  JSON.stringify(quotes, null, 2),
);
console.log(`Extracted ${quotes.length} quotes → app/_lib/tnh-quotes.json`);
