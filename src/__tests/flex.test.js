import stylex from "../index-stylex"

test("flex -r :center", () => {
	expect(stylex.parse(`
		flex -r :center
	`)).toStrictEqual({
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	})
})

test("inline-flex -r :center", () => {
	expect(stylex.parse(`
		inline-flex -r :center
	`)).toStrictEqual({
		display: "inline-flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	})
})
