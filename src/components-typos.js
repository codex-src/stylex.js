import invariant from "invariant"

export const Stylable = render => props => {
	invariant(
		false,
		"stylex: `Stylable` is not exported. " +
		"Did you mean `Styleable`?",
	)
	return render(props)
}

export const Unstylable = render => props => {
	invariant(
		false,
		"stylex: `Unstylable` is not exported. " +
		"Did you mean `Unstyleable`?",
	)
	return render(props)
}
