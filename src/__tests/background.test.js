import stylex from "../index-stylex"

test("b:blue", () => {
	expect(stylex.parse(`
		b:blue
	`)).toStrictEqual({
		background: "hsla(var(--blue), 1)",
	})
})

test("b:blue -a:0%", () => {
	expect(stylex.parse(`
		b:blue -a:0%
	`)).toStrictEqual({
		background: "hsla(var(--blue), 0)",
	})
})

test("b:blue -a:50%", () => {
	expect(stylex.parse(`
		b:blue -a:50%
	`)).toStrictEqual({
		background: "hsla(var(--blue), 0.5)",
	})
})

test("b:blue -a:100%", () => {
	expect(stylex.parse(`
		b:blue -a:100%
	`)).toStrictEqual({
		background: "hsla(var(--blue), 1)",
	})
})
