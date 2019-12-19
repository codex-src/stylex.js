import invariant from "invariant"
import React from "react"

// `Styleable` is a HOC that extends a rendered component’s
// styles.
//
// The following are roughly equivalent:
//
// const Component = ({ style, ...props }) => (
//   <div style={{ ...stylex("x y z"), ...style }} {...props}>
//     {props.children}
//   </div>
// )
//
// const Component = Styleable(props => (
//   <div style={stylex("x y z")} {...props}>
//     {props.children}
//   </div>
// ))
//
// *Note that the use of `{...props}` is up to the
// discretion of the component author.
//
// Generally, lower-level components should use `Stylable`,
// thus making them more reusable.
//
export const Styleable = render => ({ style, ...props }) => {
	invariant(
		typeof render === "function",
		"stylex: `Styleable` is meant to be used with a component. " +
		"Did you mean `const Component = Styleable(props => ( ... ))`?",
	)

	// Render the original component; `element` is an object
	// with `props`, `props.style`, `props.children`, etc.
	const element = render(props)
	const newRender = React.cloneElement(
		element,
		{
			style: {
				...element.props.style, // Original styles.
				...style,               // Extended styles.
			},
			...props,
		},
		props.children, // Not needed but easier to read.
	)
	return newRender
}

// FIXME: Consider using `throw new Error("...")` instead of
// better developer experience.
export const Stylable = render => props => {
	invariant(
		false,
		"stylex: `Stylable` is not exported. " +
		"Did you mean `Styleable`?",
	)
	return render(props)
}

// `Unstyleable` is a HOC that prevents a rendered
// component’s styles from being extended or overwritten.
//
// The following are roughly equivalent:
//
// const Component = ({ style, ...props }) => (
//   <div style={stylex("x y z")} {...props}>
//     {props.children}
//   </div>
// )
//
// const Component = Unstyleable(props => (
//   <div style={stylex("x y z")} {...props}>
//     {props.children}
//   </div>
// ))
//
// *Note that the use of `{...props}` is up to the
// discretion of the component author.
//
// Generally, higher-level components should use
// `Unstyleable`, thus making them more predictable.
//
export const Unstyleable = render => ({ style, ...props }) => {
	invariant(
		typeof render === "function",
		"stylex: `Unstyleable` is meant to be used with a component. " +
		"Did you mean `const Component = Unstyleable(props => ( ... ))`?",
	)

	const element = render(props)
	const newRender = React.cloneElement(
		element,
		{
			style: element.props.style,
			...props,
		},
		props.children, // Not needed but easier to read.
	)
	return newRender
}

// FIXME: Consider using `throw new Error("...")` instead of
// better developer experience.
export const Unstylable = render => props => {
	invariant(
		false,
		"stylex: `Unstylable` is not exported. " +
		"Did you mean `Unstyleable`?",
	)
	return render(props)
}
