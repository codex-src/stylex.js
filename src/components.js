import invariant from "invariant"
import nullable from "nullable"
import React from "react"

export const Styleable = render => props => {
	invariant(
		typeof render === "function" && nullable.isNonNullableObject(props),
		"stylex: Sstylable` expected a JSX component.",
	)
	return _Styleable(render)(props)
}

// `Styleable` is a higher-order component that extends a
// component’s styles.
const _Styleable = render => ({ style: extendedStyles, ...extendedProps }) => {
	const element = render(extendedProps)
	invariant(
		nullable.isNonNullableObject(element) && element.$$typeof === Symbol.for("react.element"),
		"stylex: `Styleable` expected a JSX component.",
	)
	const { props: { style, ...props } } = element
	const newRender = React.cloneElement(
		element,
		{
			style: {
				...style,          // Assigned styles.
				...extendedStyles, // Extended styles.
			},
			...props,
		},
	)
	return newRender
}

export const Unstyleable = render => props => {
	invariant(
		typeof render === "function" && nullable.isNonNullableObject(props),
		"stylex: `Unstylable` expected a JSX component.",
	)
	return _Unstyleable(render)(props)
}

// `Unstyleable` is a higher-order component that prevents a
// component’s styles from being extended.
const _Unstyleable = render => ({ style: extendedStyles, ...extendedProps }) => {
	const element = render(extendedProps)
	invariant(
		nullable.isNonNullableObject(element) && element.$$typeof === Symbol.for("react.element"),
		"stylex: `Unstylable` expected a JSX component.",
	)
	// The following `if` statements are longhand for:
	//
	// const margins = {
	//   ...(margin       || {}),
	//   ...(marginLeft   || {}),
	//   ...(marginRight  || {}),
	//   ...(marginTop    || {}),
	//   ...(marginBottom || {}),
	// }
	//
	// This pattern is used throughout `parse.js`. The reason
	// we need to do this is because spreading `undefined`
	// leads to unexpected behavior.
	let marginStyles = {}
	if (extendedStyles !== undefined) {
		const { margin, marginLeft, marginRight, marginTop, marginBottom } = extendedStyles
		if (margin !== undefined) {
			marginStyles = {
				...marginStyles,
				margin,
			}
		}
		if (marginLeft !== undefined) {
			marginStyles = {
				...marginStyles,
				marginLeft,
			}
		}
		if (marginRight !== undefined) {
			marginStyles = {
				...marginStyles,
				marginRight,
			}
		}
		if (marginTop !== undefined) {
			marginStyles = {
				...marginStyles,
				marginTop,
			}
		}
		if (marginBottom !== undefined) {
			marginStyles = {
				...marginStyles,
				marginBottom,
			}
		}
	}
	const { props: { style, ...props } } = element
	const newRender = React.cloneElement(
		element,
		{
			style: {
				...style,        // Assigned styles.
				...marginStyles, // Extended styles.
			},
			...props,
		},
	)
	return newRender
}
