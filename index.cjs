// DO NOT EDIT BY HAND. Use `npm run build` to create this file.
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.mjs
var eslint_plugin_ignore_c_preprocessors_exports = {};
__export(eslint_plugin_ignore_c_preprocessors_exports, {
  default: () => eslint_plugin_ignore_c_preprocessors_default
});
module.exports = __toCommonJS(eslint_plugin_ignore_c_preprocessors_exports);
var plugin = {
  meta: {
    name: "@godot/eslint-plugin-ignore-c-preprocessors",
    version: "0.1.0"
  },
  processors: {
    "ignore-c-preprocessors": {
      meta: {
        name: "ignore-c-preprocessors",
        version: "0.1.0"
      },
      /**
       * @param {string} text
       * @param {string} filename
       * @returns {[{ text: string, filename: string }]}
       */
      preprocess(text, filename) {
        const SKIP_TOKENS = [
          "include",
          "if",
          "elif",
          "else",
          "endif",
          "ifdef",
          "ifndef",
          "define",
          "undef",
          "line",
          "error",
          "embed",
          "pragma"
        ];
        const skipSymbol = Symbol("skip");
        const isString = (x) => {
          return typeof x === "string";
        };
        const textLines = text.split("\n").map(
          /** @type {(string): string | unique symbol} */
          (line) => {
            for (const skipToken of SKIP_TOKENS) {
              if (line.replaceAll(" ", "").startsWith(`#${skipToken}`)) {
                return skipSymbol;
              }
            }
            return line;
          }
        ).filter(isString).join("\n");
        return [
          { text: textLines, filename }
        ];
      },
      /**
       * @typedef {{
       *   range: [number, number]
       *   text: string
       * }} Fix
       * @typedef {{
       *   desc?: string
       *   messageId?: string
       *   fix: Fix
       * }} Suggestion
       * @typedef {{
       *   line?: number
       *   column?: number
       *   endLine?: number
       *   endColumn?: number
       *   fatal?: boolean
       *   fix: Fix
       *   ruleId: string | null
       *   severity: 0 | 1 | 2
       *   suggestions?: Suggestion[]
       * }} LintMessage
       */
      /**
       * @param {LintMessage[]} messages
       * @param {string} filename
       * @returns {LintMessage[]}
       */
      postprocess(messages, filename) {
        return [].concat(...messages);
      },
      supportsAutofix: false
    }
  }
};
var eslint_plugin_ignore_c_preprocessors_default = plugin;
