import babel from "rollup-plugin-babel"

const config = {
	external: ["invariant"],
	input:    "src/stylex.js",
	output:   { file: "build/stylex.js", format: "cjs" },
	plugins:  [babel({ exclude: "node_modules/**" })]
}

export default config
