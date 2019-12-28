import stylex from "../index-stylex"

test("c:red b:blue", () => {
	expect(stylex.parse(`
		c:red
		b:blue
	`)).toStrictEqual({
		color: "hsla(var(--red), 1)",
		background: "hsla(var(--blue), 1)",
	})
})

test("c:red -a:50% b:blue", () => {
	expect(stylex.parse(`
		c:red -a:50%
		b:blue
	`)).toStrictEqual({
		color: "hsla(var(--red), 0.5)",
		background: "hsla(var(--blue), 1)",
	})
})

test("c:red b:blue -a:50%", () => {
	expect(stylex.parse(`
		c:red
		b:blue -a:50%
	`)).toStrictEqual({
		color: "hsla(var(--red), 1)",
		background: "hsla(var(--blue), 0.5)",
	})
})

test("c:red -a:25% b:blue -a:75%", () => {
	expect(stylex.parse(`
		c:red  -a:25%
		b:blue -a:75%
	`)).toStrictEqual({
		color: "hsla(var(--red), 0.25)",
		background: "hsla(var(--blue), 0.75)",
	})
})
