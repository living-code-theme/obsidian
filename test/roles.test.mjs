// Port-owned role-contract tests, exercising generated files and real grammars.
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {resolveAll} from '../scripts/palette.mjs';
import {generate} from '../src/generate.mjs';
import {OBSIDIAN_TOKENS} from './contract.mjs';

const root = new URL("../", import.meta.url);

const read = (path) => readFileSync(new URL(path, root), "utf8");

const flavors = resolveAll();

const norm = (hex) => hex?.toLowerCase().slice(0, 7);

test("Obsidian colors every Prism token and CodeMirror class with its role, in every flavor", async () => {

  const theme = read("theme.css");
  const block = (css, sel) => css.slice(css.indexOf(`${sel} {`), css.indexOf("}", css.indexOf(`${sel} {`)));
  const sources = [
    ["night", block(theme, ".theme-dark")], ["paper", block(theme, ".theme-light")],
    ["frost", block(read("snippets/living-code-frost.css"), ".theme-dark")],
    ["signal", block(read("snippets/living-code-signal.css"), ".theme-dark")],
  ];
  const failures = [];
  for (const [id, vars] of sources) {
    const f = flavors.find((x) => x.id === id);
    for (const [kind, prefix] of [["prism", ".token."], ["codemirror", ".cm-s-obsidian .cm-"]]) {
      for (const [cls, role] of Object.entries(OBSIDIAN_TOKENS[kind])) {
        const rule = theme.match(new RegExp(`^${(prefix + cls).replace(/[.]/g, "\\.")} \\{ color: var\\((--[\\w-]+)\\); \\}$`, "m"));
        const got = rule && vars.match(new RegExp(`${rule[1]}: (#[0-9a-f]{6});`))?.[1];
        if (norm(got) !== norm(f.r(role))) failures.push(`obsidian ${id} ${prefix}${cls}: ${role} is ${f.r(role)}, got ${got}`);
      }
    }
  }
  assert.deepEqual(failures, []);
});
