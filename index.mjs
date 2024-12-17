const plugin = {
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
					"pragma",
				]
				const skipSymbol = Symbol("skip");
				/**
				 * @param {unknown} x
				 * @returns {x is string}
				 */
				const isString = (x) => {
					return typeof x === "string";
				};
				const textLines = text
					.split("\n")
					.map(/** @type {(string): string | unique symbol} */(line) => {
						for (const skipToken of SKIP_TOKENS) {
							if (line.replaceAll(" ", "").startsWith(`#${skipToken}`)) {
								return skipSymbol;
							}
						}
						return line;
					})
					.filter(isString)
					.join("\n");

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
			supportsAutofix: false,
		}
	}
};

export default plugin;
