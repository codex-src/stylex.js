import babel from "rollup-plugin-babel"

const config = {
	external: ["invariant", "react"],
	input:    "src/index-stylex.js",
	output:   { file: "build/stylex.js", format: "cjs" },
	plugins:  [babel({ exclude: "node_modules/**" })],
}

export default config
