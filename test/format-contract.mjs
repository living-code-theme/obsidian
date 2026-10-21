// This port owns its application mappings. Inputs come only from the pinned local palette.


const SNIPPET_FLAVORS = ["frost", "signal"];

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

export { obsidianVariables, SNIPPET_FLAVORS };
