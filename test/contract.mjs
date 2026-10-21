// This port owns its application mappings. Inputs come only from the pinned local palette.


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

export { OBSIDIAN_TOKENS };
