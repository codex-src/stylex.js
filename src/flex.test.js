import stylex from "./stylex"

test("flex -r :center", () => {
	expect(stylex(`
		flex -r :center
	`)).toStrictEqual({
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	})
})

test("inline-flex -r :center", () => {
	expect(stylex(`
		inline-flex -r :center
	`)).toStrictEqual({
		display: "inline-flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	})
})
