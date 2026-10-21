// This port owns its application mappings. Inputs come only from the pinned local palette.


const snippetCss = (f) => `/* Living Code ${f.name.replace("Living Code ", "")} for Obsidian. A dark flavor, so it replaces the dark mode colors of the Living Code theme.
   Enable the "Living Code" theme first, then turn this snippet on under Appearance > CSS snippets. */

.theme-dark {
${decl(obsidianVariables(f))}
}
`;

const OBSIDIAN_TOKENS = {
  prism: {
    comment: "comment", prolog: "comment", doctype: "comment", cdata: "comment",
    keyword: "keyword", atrule: "keyword", important: "keyword", "interpolation-punctuation": "keyword",
    string: "string", char: "string", "attr-value": "string", "template-string": "string",
    number: "number", boolean: "constant", constant: "variable", symbol: "constant",
    regex: "regex", entity: "escape", url: "link",
    function: "function", "class-name": "type", selector: "type", builtin: "builtin", namespace: "namespace",
    tag: "tag", "attr-name": "attribute", property: "property", "property-access": "property",
    parameter: "parameter", variable: "variable", operator: "operator", punctuation: "punctuation",
    annotation: "decorator", decorator: "decorator", inserted: "added", deleted: "removed",
  },
  codemirror: {
    comment: "comment", meta: "comment", keyword: "keyword", string: "string", "string-2": "string",
    number: "number", atom: "constant", def: "function", builtin: "builtin", type: "type", qualifier: "type",
    "variable-3": "type", tag: "tag", attribute: "attribute", property: "property", variable: "variable",
    "variable-2": "variable", operator: "operator", punctuation: "punctuation", bracket: "punctuation", hr: "punctuation",
    link: "link",
  },
};

const SYNTAX_ROLES = [...new Set([...Object.values(OBSIDIAN_TOKENS.prism), ...Object.values(OBSIDIAN_TOKENS.codemirror)])];

function obsidianVariables(f) {
  const r = f.r, c = f.c;
  return [
    ["--background-primary", r("bg")],
    ["--background-primary-alt", r("bgAlt")],
    ["--background-secondary", r("bgDeep")],
    ["--background-secondary-alt", r("bgDeep")],
    ["--background-modifier-border", r("border")],
    ["--background-modifier-border-hover", r("borderActive")],
    ["--background-modifier-border-focus", r("accent")],
    ["--background-modifier-hover", c("surface0")],
    ["--background-modifier-active-hover", c("surface1")],
    ["--background-modifier-form-field", r("bgDeep")],
    ["--background-modifier-error", r("error")],
    ["--background-modifier-success", r("success")],
    ["--background-modifier-message", r("bgAlt")],
    ["--text-normal", r("fg")],
    ["--text-muted", r("fgMuted")],
    ["--text-faint", r("fgSubtle")],
    ["--text-on-accent", r("bg")],
    ["--text-error", r("error")],
    ["--text-success", r("success")],
    ["--text-warning", r("warning")],
    ["--text-accent", r("link")],
    ["--text-accent-hover", r("accent")],
    ["--text-selection", f.mix("bg", "selection", 0.85)],
    ["--text-highlight-bg", f.mix("bg", "match", 0.35)],
    ["--interactive-normal", c("surface0")],
    ["--interactive-hover", c("surface1")],
    ["--interactive-accent", r("accent")],
    ["--interactive-accent-hover", r("accent")],
    ["--link-color", r("link")],
    ["--link-color-hover", r("accent")],
    ["--link-unresolved-color", r("fgMuted")],
    ["--tag-color", r("tag")],
    ["--h1-color", r("heading")],
    ["--h2-color", r("heading")],
    ["--h3-color", r("heading")],
    ["--h4-color", r("heading")],
    ["--h5-color", r("heading")],
    ["--h6-color", r("heading")],
    ["--blockquote-color", r("quote")],
    ["--blockquote-border-color", r("border")],
    ["--hr-color", r("border")],
    ["--code-background", r("bgAlt")],
    ["--code-normal", r("fg")],
    ["--code-comment", r("comment")],
    ["--code-function", r("function")],
    ["--code-keyword", r("keyword")],
    ["--code-string", r("string")],
    ["--code-value", r("number")],
    ["--code-important", r("warning")],
    ["--code-property", r("property")],
    ["--code-operator", r("operator")],
    ["--code-punctuation", r("punctuation")],
    ["--code-tag", r("tag")],
    ["--color-red", r("error")],
    ["--color-orange", r("warning")],
    ["--color-yellow", r("modified")],
    ["--color-green", r("success")],
    ["--color-cyan", r("info")],
    ["--color-blue", r("link")],
    ["--color-purple", r("keyword")],
    ["--color-pink", r("removed")],
    ["--color-accent", r("accent")],
    ["--color-accent-1", r("accent")],
    ["--color-accent-2", r("accent")],
    // One variable per syntax role, for the token rules in theme.css.
    ...SYNTAX_ROLES.map((role) => [`--lc-syntax-${role}`, r(role)]),
    ["--scrollbar-thumb-bg", c("surface1")],
    ["--scrollbar-active-thumb-bg", c("surface2")],
  ];
}

const decl = (pairs) => pairs.map(([k, v]) => `  ${k}: ${v};`).join("\n");

const REPO = "https://github.com/living-code-theme/obsidian";

const themeCss = (night, paper) => `/* Living Code for Obsidian. Dark mode is Night, light mode is Paper.
   Generated by scripts/generate.mjs from ${REPO}. Frost and Signal are dark flavors:
   copy a file from snippets/ into <vault>/.obsidian/snippets/ and enable it under Appearance > CSS snippets. */

.theme-dark {
${decl(obsidianVariables(night))}
}

.theme-light {
${decl(obsidianVariables(paper))}
}

body {
  --bold-color: var(--text-normal);
  --italic-color: var(--text-normal);
}

.markdown-rendered strong, .cm-strong { color: var(--bold-color); }
.markdown-rendered em, .cm-em { color: var(--italic-color); }
.markdown-rendered code, .cm-inline-code { color: var(--code-normal); }
.markdown-rendered mark, .cm-highlight { color: var(--text-normal); }
.cm-s-obsidian .cm-formatting-header, .cm-s-obsidian .cm-header { color: var(--h1-color); }

/* Code, token by token, with the roles every Living Code port uses (test/contract.mjs). Obsidian's own rules group
   them coarsely: constants with tags, types with functions. */
${Object.entries(OBSIDIAN_TOKENS.prism).map(([t, role]) => `.token.${t} { color: var(--lc-syntax-${role}); }`).join("\n")}
${Object.entries(OBSIDIAN_TOKENS.codemirror).map(([t, role]) => `.cm-s-obsidian .cm-${t} { color: var(--lc-syntax-${role}); }`).join("\n")}
`;

const obsidian = { files: () => [], all: fs => [{path: "theme.css", content: themeCss(fs.find(f=>f.id==="night"),fs.find(f=>f.id==="paper"))}, ...fs.filter(f=>["frost","signal"].includes(f.id)).map(f=>({path:`snippets/${f.slug}.css`,content:snippetCss(f)}))] };

export function generate(flavors) {
  return [...flavors.flatMap(f => obsidian.files(f)), ...(obsidian.all?.(flavors) ?? [])].filter(f => !["LICENSE", "README.md", "package.json", "extension.toml"].includes(f.path.split("/").at(-1)));
}
