import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "The senator drafting the law that will govern every AI on the planet just asked his aide to print the bill, scan it, and email it back so he could finally have it as a PDF.";

function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 320) {
    throw new Error(`entry must be 1-320 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  const sentences = text.split(".").filter((part) => part.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error(`entry must be one sentence, got ${sentences.length}`);
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write check: what landed on disk must be byte-identical to ENTRY.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk does not match ENTRY");
}
