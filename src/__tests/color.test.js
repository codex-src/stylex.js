import stylex from "../index-stylex"

test("c:red", () => {
	expect(stylex.parse(`
		c:red
	`)).toStrictEqual({
		color: "hsla(var(--red), 1)",
	})
})

test("c:red -a:0%", () => {
	expect(stylex.parse(`
		c:red -a:0%
	`)).toStrictEqual({
		color: "hsla(var(--red), 0)",
	})
})

test("c:red -a:50%", () => {
	expect(stylex.parse(`
		c:red -a:50%
	`)).toStrictEqual({
		color: "hsla(var(--red), 0.5)",
	})
})

test("c:red -a:100%", () => {
	expect(stylex.parse(`
		c:red -a:100%
	`)).toStrictEqual({
		color: "hsla(var(--red), 1)",
	})
})
