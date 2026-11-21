import assert from "node:assert/strict";
import { test } from "node:test";

import { penaltyIfWait, penaltyMax, penaltySoFar } from "./penalty.ts";

const MAX = 35;

test("R500, 2 returns, 12 months", () => {
  assert.equal(penaltySoFar(500, 2, 12, MAX), 12000);
  assert.equal(penaltyIfWait(500, 2, 12, 3, MAX), 15000);
  assert.equal(penaltyMax(500, 2, MAX), 35000);
});

test("R500, 2 returns, 34 months: waiting 3 more is capped at 35 months", () => {
  assert.equal(penaltyIfWait(500, 2, 34, 3, MAX), 35000);
});

test("R250, 1 return, 0 months is zero", () => {
  assert.equal(penaltySoFar(250, 1, 0, MAX), 0);
});

test("inputs are clamped", () => {
  assert.equal(penaltySoFar(250, 99, 99, MAX), 250 * 10 * MAX);
  assert.equal(penaltySoFar(250, 0, -5, MAX), 0);
  assert.equal(penaltyMax(250, 0, MAX), 250 * 1 * MAX);
});
