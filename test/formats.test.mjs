// Native format regressions, exercised through this port's generator.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {readFile} from 'node:fs/promises';
import test from 'node:test';
import {resolveAll,ANSI_ORDER} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {obsidianVariables} from './format-contract.mjs';
import {SNIPPET_FLAVORS} from './format-contract.mjs';
const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const flavors = resolveAll();

const obsidian={files:()=>[],all:generate};

test("theme.css styles dark as Night and light as Paper with balanced braces", async () => {
  const css = await read("theme.css");
  const night = flavors.find((f) => f.id === "night"), paper = flavors.find((f) => f.id === "paper");
  const block = (sel) => css.match(new RegExp(`\\${sel} \\{([^}]*)\\}`))?.[1] ?? "";
  assert.ok(block(".theme-dark").includes(`--background-primary: ${night.r("bg")};`));
  assert.ok(block(".theme-light").includes(`--background-primary: ${paper.r("bg")};`));
  assert.ok(block(".theme-dark").includes(`--text-accent: ${night.r("link")};`));
  assert.equal(css.split("{").length, css.split("}").length);
  for (const [k, v] of obsidianVariables(night)) assert.match(v, /^#[0-9a-f]{6}$/i, k);
});

test("Frost and Signal ship as dark-only snippets that redefine the same variables", async () => {
  assert.deepEqual(SNIPPET_FLAVORS, ["frost", "signal"]);
  const base = new Set(obsidianVariables(flavors[0]).map(([k]) => k));
  for (const id of SNIPPET_FLAVORS) {
    const f = flavors.find((x) => x.id === id);
    const css = await read(`snippets/${f.slug}.css`);
    assert.ok(!css.includes(".theme-light"));
    assert.ok(css.includes(`--background-primary: ${f.r("bg")};`));
    for (const k of base) assert.ok(css.includes(`${k}:`), `${id} ${k}`);
  }
  assert.equal(obsidian.files(flavors[0]).length, 0);
});
