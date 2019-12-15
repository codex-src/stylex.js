import invariant from "invariant"

const styleParsers = {
	"m":                 margin,
	"m-l":               margin,
	"m-r":               margin,
	"m-x":               margin,
	"m-t":               margin,
	"m-b":               margin,
	"m-y":               margin,
	"p":                 padding,
	"p-l":               padding,
	"p-r":               padding,
	"p-x":               padding,
	"p-t":               padding,
	"p-b":               padding,
	"p-y":               padding,
	"relative":          position,
	"absolute":          position,
	"fixed":             position,
	"sticky":            position,
	"block":             () => ({ display: "block" }),
	"inline-block":      () => ({ display: "inline-block" }),
	"inline":            () => ({ display: "inline" }),
	"flex":              flex,
	"no-flex-shrink":    () => ({ flexShrink: 0 }),
	"wh":                widthHeight,
	"w":                 widthHeight,
	"h":                 widthHeight,
	"no-min-w":          () => ({ minWidth: 0 }),
	"center":            () => ({ textAlign: "center" }),
	"middle":            () => ({ verticalAlign: "middle" }),
	"pre":               () => ({ whiteSpace: "pre" }),
	"pre-wrap":          () => ({ whiteSpace: "pre-wrap" }),
	"tnum":              () => ({ fontFeatureSettings: "'tnum'" }),
	"square":            () => ({ strokeLinecap: "square" }),
	"sw":                strokeWidth,
	"fw":                fontWeight,
	"fs":                fontSize,
	"ls":                letterSpacing,
	"lh":                lineHeight,
	"c":                 iter => ({ color: `hsl(var(--${iter.token()}))` }),      // FIXME: Warn if there’s no token?
	"b":                 iter => ({ background: `hsl(var(--${iter.token()}))` }), // FIXME: Warn if there’s no token?
	"br":                borderRadius,
	"br-l":              borderRadius,
	"br-r":              borderRadius,
	"br-t":              borderRadius,
	"br-b":              borderRadius,
	"overflow":          overflow,
	"text-overflow":     textOverflow,
	"z":                 zIndex,
	"pointer-events":    () => ({ pointerEvents: "auto" }),
	"no-pointer-events": () => ({ pointerEvents: "none" }),
	"pointer":           () => ({ cursor: "pointer" }),
	"no-pointer":        () => ({ cursor: "auto" }),
	"translate-z":       () => ({ transform: "translateZ(0px)" }),
	"no-translate-z":    () => ({ transform: "none" })
}

function margin(iter) {
	invariant(
		iter.classNameMatches(/^m(-(x|y|l|r|t|b))?:-?\d+(\.\d+)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	const value = Number(iter.token())
	let style = {}
	switch (iter.key()) {
	case "m":
		style = {
			margin: value
		}
		break
	case "m-l":
		style = {
			marginLeft: value
		}
		break
	case "m-r":
		style = {
			marginRight: value
		}
		break
	case "m-x":
		style = {
			marginLeft: value,
			marginRight: value
		}
		break
	case "m-t":
		style = {
			marginTop: value
		}
		break
	case "m-b":
		style = {
			marginBottom: value
		}
		break
	case "m-y":
		style = {
			marginTop: value,
			marginBottom: value
		}
		break
	default:
		// No-op.
		break
	}
	return style
}

function padding(iter) {
	invariant(
		iter.classNameMatches(/^p(-(x|y|l|r|t|b))?:\d+(\.\d+)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	const value = Number(iter.token())
	let style = {}
	switch (iter.key()) {
	case "p":
		style = {
			padding: value
		}
		break
	case "p-l":
		style = {
			paddingLeft: value
		}
		break
	case "p-r":
		style = {
			paddingRight: value
		}
		break
	case "p-x":
		style = {
			paddingLeft: value,
			paddingRight: value
		}
		break
	case "p-t":
		style = {
			paddingTop: value
		}
		break
	case "p-b":
		style = {
			paddingBottom: value
		}
		break
	case "p-y":
		style = {
			paddingTop: value,
			paddingBottom: value
		}
		break
	default:
		// No-op.
		break
	}
	return style
}

// NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.
function position(iter) {
	const position  = iter.key()
	const positionL = iter.nextClassName("-l")
	const positionR = iter.nextClassName("-r")
	const positionX = iter.nextClassName("-x") // Order matters.
	const positionT = iter.nextClassName("-t")
	const positionB = iter.nextClassName("-b")
	const positionY = iter.nextClassName("-y") // Order matters.
	let style = {
		position
	}
	if (positionX) {
		style = {
			...style,
			left: 0,
			right: 0
		}
	}
	if (positionY) {
		style = {
			...style,
			top: 0,
			bottom: 0
		}
	}
	if (positionL) {
		style = {
			...style,
			left: 0
		}
	}
	if (positionR) {
		style = {
			...style,
			right: 0
		}
	}
	if (positionT) {
		style = {
			...style,
			top: 0
		}
	}
	if (positionB) {
		style = {
			...style,
			bottom: 0
		}
	}
	return style
}

// NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.
function flex(iter) {
	const flexRow      = iter.nextClassName("-r"        )
	const flexColumn   = iter.nextClassName("-c"        )
	const flexStretch  = iter.nextClassName(":stretch"  )
	const flexStart    = iter.nextClassName(":start"    )
	const flexCenter   = iter.nextClassName(":center"   )
	const flexEnd      = iter.nextClassName(":end"      )
	const flexBetween  = iter.nextClassName(":between"  )
	const flexAround   = iter.nextClassName(":around"   )
	const flexEvenly   = iter.nextClassName(":evenly"   )
	const flexXStretch = iter.nextClassName("-x:stretch")
	const flexXStart   = iter.nextClassName("-x:start"  )
	const flexXCenter  = iter.nextClassName("-x:center" )
	const flexXEnd     = iter.nextClassName("-x:end"    )
	const flexXBetween = iter.nextClassName("-x:between")
	const flexXAround  = iter.nextClassName("-x:around" )
	const flexXEvenly  = iter.nextClassName("-x:evenly" )
	const flexYStretch = iter.nextClassName("-y:stretch")
	const flexYStart   = iter.nextClassName("-y:start"  )
	const flexYCenter  = iter.nextClassName("-y:center" )
	const flexYEnd     = iter.nextClassName("-y:end"    )
	const flexYBetween = iter.nextClassName("-y:between")
	const flexYAround  = iter.nextClassName("-y:around" )
	const flexYEvenly  = iter.nextClassName("-y:evenly" )
	invariant(
		flexRow || flexColumn,
		`stylex: \`${iter.className()}\` expects \`-r\` or \`-c\`.`
	)
	let style = {
		display: "flex",
		flexDirection: (
			(flexRow && "row") ||
			(flexColumn && "column")
		)
	}
	// .flex.-r.\:stretch, .flex.-c.\:stretch { ... }
	// .flex.-r.\:start,   .flex.-c.\:start   { ... }
	// .flex.-r.\:center,  .flex.-c.\:center  { ... }
	// .flex.-r.\:end,     .flex.-c.\:end     { ... }
	// .flex.-r.\:between, .flex.-c.\:between { ... }
	// .flex.-r.\:around,  .flex.-c.\:around  { ... }
	// .flex.-r.\:evenly,  .flex.-c.\:evenly  { ... }
	if (flexStretch) {
		style = {
			...style,
			justifyContent: "stretch",
			alignItems: "stretch"
		}
	}
	if (flexStart) {
		style = {
			...style,
			justifyContent: "flex-start",
			alignItems: "flex-start"
		}
	}
	if (flexCenter) {
		style = {
			...style,
			justifyContent: "center",
			alignItems: "center"
		}
	}
	if (flexEnd) {
		style = {
			...style,
			justifyContent: "flex-end",
			alignItems: "flex-end"
		}
	}
	if (flexBetween) {
		style = {
			...style,
			justifyContent: "space-between",
			alignItems: "space-between"
		}
	}
	if (flexAround) {
		style = {
			...style,
			justifyContent: "space-around",
			alignItems: "space-around"
		}
	}
	if (flexEvenly) {
		style = {
			...style,
			justifyContent: "space-evenly",
			alignItems: "space-evenly"
		}
	}
	// .flex.-r.-x\:stretch { justify-content: ... }
	// .flex.-r.-x\:start   { justify-content: ... }
	// .flex.-r.-x\:center  { justify-content: ... }
	// .flex.-r.-x\:end     { justify-content: ... }
	// .flex.-r.-x\:between { justify-content: ... }
	// .flex.-r.-x\:around  { justify-content: ... }
	// .flex.-r.-x\:evenly  { justify-content: ... }
	if (flexRow && flexXStretch) {
		style = {
			...style,
			justifyContent: "stretch"
		}
	}
	if (flexRow && flexXStart) {
		style = {
			...style,
			justifyContent: "flex-start"
		}
	}
	if (flexRow && flexXCenter) {
		style = {
			...style,
			justifyContent: "center"
		}
	}
	if (flexRow && flexXEnd) {
		style = {
			...style,
			justifyContent: "flex-end"
		}
	}
	if (flexRow && flexXBetween) {
		style = {
			...style,
			justifyContent: "space-between"
		}
	}
	if (flexRow && flexXAround) {
		style = {
			...style,
			justifyContent: "space-around"
		}
	}
	if (flexRow && flexXEvenly) {
		style = {
			...style,
			justifyContent: "space-evenly"
		}
	}
	// .flex.-r.-y\:stretch { align-items: ... }
	// .flex.-r.-y\:start   { align-items: ... }
	// .flex.-r.-y\:center  { align-items: ... }
	// .flex.-r.-y\:end     { align-items: ... }
	// .flex.-r.-y\:between { align-items: ... }
	// .flex.-r.-y\:around  { align-items: ... }
	// .flex.-r.-y\:evenly  { align-items: ... }
	if (flexRow && flexYStretch) {
		style = {
			...style,
			alignItems: "stretch"
		}
	}
	if (flexRow && flexYStart) {
		style = {
			...style,
			alignItems: "flex-start"
		}
	}
	if (flexRow && flexYCenter) {
		style = {
			...style,
			alignItems: "center"
		}
	}
	if (flexRow && flexYEnd) {
		style = {
			...style,
			alignItems: "flex-end"
		}
	}
	if (flexRow && flexYBetween) {
		style = {
			...style,
			alignItems: "space-between"
		}
	}
	if (flexRow && flexYAround) {
		style = {
			...style,
			alignItems: "space-around"
		}
	}
	if (flexRow && flexYEvenly) {
		style = {
			...style,
			alignItems: "space-evenly"
		}
	}
	// .flex.-c.-x\:stretch { align-items: ... }
	// .flex.-c.-x\:start   { align-items: ... }
	// .flex.-c.-x\:center  { align-items: ... }
	// .flex.-c.-x\:end     { align-items: ... }
	// .flex.-c.-x\:between { align-items: ... }
	// .flex.-c.-x\:around  { align-items: ... }
	// .flex.-c.-x\:evenly  { align-items: ... }
	if (flexColumn && flexXStretch) {
		style = {
			...style,
			alignItems: "stretch"
		}
	}
	if (flexColumn && flexXStart) {
		style = {
			...style,
			alignItems: "flex-start"
		}
	}
	if (flexColumn && flexXCenter) {
		style = {
			...style,
			alignItems: "center"
		}
	}
	if (flexColumn && flexXEnd) {
		style = {
			...style,
			alignItems: "flex-end"
		}
	}
	if (flexColumn && flexXBetween) {
		style = {
			...style,
			alignItems: "space-between"
		}
	}
	if (flexColumn && flexXAround) {
		style = {
			...style,
			alignItems: "space-around"
		}
	}
	if (flexColumn && flexXEvenly) {
		style = {
			...style,
			alignItems: "space-evenly"
		}
	}
	// .flex.-c.-y\:stretch { justify-content: ... }
	// .flex.-c.-y\:start   { justify-content: ... }
	// .flex.-c.-y\:center  { justify-content: ... }
	// .flex.-c.-y\:end     { justify-content: ... }
	// .flex.-c.-y\:between { justify-content: ... }
	// .flex.-c.-y\:around  { justify-content: ... }
	// .flex.-c.-y\:evenly  { justify-content: ... }
	if (flexColumn && flexYStretch) {
		style = {
			...style,
			justifyContent: "stretch"
		}
	}
	if (flexColumn && flexYStart) {
		style = {
			...style,
			justifyContent: "flex-start"
		}
	}
	if (flexColumn && flexYCenter) {
		style = {
			...style,
			justifyContent: "center"
		}
	}
	if (flexColumn && flexYEnd) {
		style = {
			...style,
			justifyContent: "flex-end"
		}
	}
	if (flexColumn && flexYBetween) {
		style = {
			...style,
			justifyContent: "space-between"
		}
	}
	if (flexColumn && flexYAround) {
		style = {
			...style,
			justifyContent: "space-around"
		}
	}
	if (flexColumn && flexYEvenly) {
		style = {
			...style,
			justifyContent: "space-evenly"
		}
	}
	return style
}

function widthHeight(iter) {
	invariant(
		iter.classNameMatches(/^(wh|w|h):(\d+(\.\d+)?|auto|max)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	let value = 0
	if (iter.token() !== "auto" && iter.token() !== "max") {
		value = Number(iter.token())
	} else if (iter.token() === "auto") {
		value = "auto"
	} else {
		value = "100%"
	}
	let style = {}
	switch (iter.key()) {
	case "wh":
		style = {
			width: value,
			height: value
		}
		break
	case "w":
		style = {
			width: value
		}
		break
	case "h":
		style = {
			height: value
		}
		break
	default:
		// No-op
		break
	}
	return style
}

function strokeWidth(iter) {
	invariant(
		iter.classNameMatches(/^sw:([1-8]\d{2}(\.\d+)?|900)$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	const value = Number(iter.token())
	return { strokeWidth: value * 0.005 }
}

function fontWeight(iter) {
	invariant(
		iter.classNameMatches(/^fw:([1-8]\d{2}(\.\d+)?|900)$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	const value = Number(iter.token())
	return { fontWeight: value }
}

function fontSize(iter) {
	invariant(
		iter.classNameMatches(/^fs:\d+(\.\d+)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	const value = Number(iter.token())
	return { fontSize: value }
}

function letterSpacing(iter) {
	invariant(
		iter.classNameMatches(/^ls:-?\d+(\.\d+)?%$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	// Convert percent to decimal:
	const value = Number(iter.token().slice(0, -1))
	return { letterSpacing: value * 0.01 + "em" }
}

// FIXME: `^(1\d{2}(\.\d+)?|200)$`?
function lineHeight(iter) {
	invariant(
		iter.classNameMatches(/^lh:\d+(\.\d+)?%$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	// Convert percent to decimal:
	const value = Number(iter.token().slice(0, -1))
	return { lineHeight: value * 0.01 }
}

function borderRadius(iter) {
	invariant(
		iter.classNameMatches(/^br(-(l|r|t|b))?:(\d+(\.\d+)?|max)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	let value = 0
	if (iter.token() !== "max") {
		value = Number(iter.token())
	} else {
		value = 9999
	}
	let style = {}
	switch (iter.key()) {
	case "br":
		style = {
			borderRadius: value
		}
		break
	case "br-l":
		style = {
			borderTopLeftRadius: value,
			borderBottomLeftRadius: value
		}
		break
	case "br-r":
		style = {
			borderTopRightRadius: value,
			borderBottomRightRadius: value
		}
		break
	case "br-t":
		style = {
			borderTopLeftRadius: value,
			borderTopRightRadius: value
		}
		break
	case "br-b":
		style = {
			borderBottomLeftRadius: value,
			borderBottomRightRadius: value
		}
		break
	default:
		// No-op.
		break
	}
	return style
}

// NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.
function overflow(iter) {
	const overflowScroll  = iter.nextClassName(":scroll"  )
	const overflowXScroll = iter.nextClassName("-x:scroll")
	const overflowYScroll = iter.nextClassName("-y:scroll")
	const overflowHidden  = iter.nextClassName(":hidden"  )
	const overflowXHidden = iter.nextClassName("-x:hidden")
	const overflowYHidden = iter.nextClassName("-y:hidden")
	invariant(
		overflowScroll || overflowHidden || overflowXScroll || overflowYScroll || overflowXHidden || overflowYHidden,
		`stylex: \`${iter.className()}\` expects \`(-(x|y))?:scroll\` or \`(-(x|y))?:hidden\`.`
	)
	let style = {}
	if (overflowScroll) {
		style = {
			WebkitOverflowScrolling: "touch",
			overflow: "scroll"
		}
	}
	if (overflowXScroll) {
		style = {
			WebkitOverflowScrolling: "touch",
			overflowX: "scroll"
		}
	}
	if (overflowYScroll) {
		style = {
			WebkitOverflowScrolling: "touch",
			overflowY: "scroll"
		}
	}
	if (overflowHidden) {
		style = {
			overflow: "hidden"
		}
	}
	if (overflowXHidden) {
		style = {
			overflowX: "hidden"
		}
	}
	if (overflowYHidden) {
		style = {
			overflowY: "hidden"
		}
	}
	return style
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow
// https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
//
// NOTE: Use `if`s instead of a `switch`; multiple
// subclasses are allowed.
function textOverflow(iter) {
	/*eslint-disable no-useless-escape*/
	const textOverflowX = iter.nextClassName("-x")
	const textOverflowY = iter.nextClassNameRegex(/^-y\:\d+$/)
	invariant(
		textOverflowX || textOverflowY,
		`stylex: \`${iter.className()}\` expects \`-x\` or \`-y:\\d+\`.`
	)
	const yValue = Number(iter.token())
	let style = {}
	if (textOverflowX) {
		style = {
			whiteSpace: "nowrap",
			overflowX: "hidden",
			textOverflow: "ellipsis"
		}
	}
	if (textOverflowY) {
		style = {
			display: "-webkit-box",
			WebkitBoxOrient: "vertical",
			WebkitLineClamp: yValue,
			overflowY: "hidden"
		}
	}
	return style
}

function zIndex(iter) {
	invariant(
		iter.classNameMatches(/^z:(-?\d+|min|max)?$/),
		`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
		`Please refer to https://git.io/JeQtB for documentation.`
	)
	let value = 0
	if (iter.token() !== "min" && iter.token() !== "max") {
		value = Number(iter.token())
	} else {
		value = iter.token() === "min" ? -9999 : 9999
	}
	return { zIndex: value }
}

class Iterator {
	state = {
		classString: "",
		classes: [],
		started: false,
		index: 0,
		keyToken: [] // Cache of the current key-token.
	}
	constructor(classString) {
		this.state.classString = classString
		this.state.classes = classString.split(/[ \t\n]+/).filter(each => each !== "")
	}
	// `classString` returns the current class string.
	classString() {
		return this.state.classString
	}
	// `className` returns the current class name.
	className() {
		return this.state.classes[this.state.index]
	}
	// `classNameMatches` returns whether the current class
	// name matches a regex.
	classNameMatches(regex) {
		return regex.test(this.state.classes[this.state.index])
	}
	// `keyToken` returns the current key-token.
	keyToken() {
		// Reuse the cache:
		if (this.state.keyToken.length === 2) {
			return this.state.keyToken
		}
		const arr = this.className().split(":")
		if (arr.length !== 2) {
			this.state.keyToken = [arr[0], ""]
			return this.keyToken()
		}
		this.state.keyToken = [arr[0], arr[1]]
		return this.keyToken()
	}
	// `key` returns the current key.
	key() {
		const cache = this.keyToken()
		if (cache.length < 1) {
			return ""
		}
		return cache[0]
	}
	// `token` returns the current token.
	token() {
		const cache = this.keyToken()
		if (cache.length < 2) {
			return ""
		}
		return cache[1]
	}
	// `nextClassName` returns whether the next class name
	// matches (calls `next` if true).
	nextClassName(className) {
		const matches = (
			this.state.index + 1 < this.state.classes.length &&
			this.state.classes[this.state.index + 1] === className
		)
		if (matches) {
			this.next()
		}
		return matches
	}
	// `nextClassNameRegex` returns whether the next class
	// matches a regex (calls `next` if true).
	nextClassNameRegex(regex) {
		const matches = (
			this.state.index + 1 < this.state.classes.length &&
			regex.test(this.state.classes[this.state.index + 1])
		)
		if (matches) {
			this.next()
		}
		return matches
	}
	// `next` iterates the iterator.
	next() {
		if (!this.state.started) {
			this.state.started = true
			return true
		} else if (this.state.index + 1 === this.state.classes.length) {
			return false
		}
		// Empty the key-token cache:
		this.state.keyToken = []
		this.state.index++
		return true
	}
}

function stylex(classString) {
	let styles = {}
	const iter = new Iterator(classString)
	while (iter.next()) {
		const key = iter.key()
		const parseStyle = styleParsers[key]
		invariant(
			parseStyle,
			`stylex: Cannot parse class \`${iter.className()}\` from class string \`${iter.classString()}\`. ` +
			`Please refer to https://git.io/JeQtB for documentation.`
		)
		styles = {
			...styles,
			...parseStyle(iter)
		}
	}
	return styles
}

export default stylex
