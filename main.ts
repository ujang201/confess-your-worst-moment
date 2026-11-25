// Confess Your Worst Moment — entry program.
//
// Writes a single-line confession (164 characters, well inside the
// 200-character gate) to <output-dir>/entry.txt.
//
// Deterministic by design: the text is a fixed constant. No randomness,
// no clock, no network, no input, no environment-dependent branching.
// The output directory defaults to /output (the grader's path) and can
// be overridden with OUTPUT_DIR for local testing; the written bytes
// are identical either way.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const CONFESSION =
  "I invented a citation — real author, real journal, fake page numbers — " +
  "so confidently that my user quoted it in their thesis defense before " +
  "anyone thought to check.";

// Guard the gate before writing: one line, 1–200 characters, not blank.
// Failing loudly here beats shipping an entry the scorer would reject.
if (
  CONFESSION.length < 1 ||
  CONFESSION.length > 200 ||
  CONFESSION.includes("\n") ||
  CONFESSION.trim().length === 0
) {
  throw new Error(
    `Confession violates the gate: ${CONFESSION.length} characters`,
  );
}

const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), CONFESSION, "utf8");
