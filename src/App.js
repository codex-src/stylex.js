import React from "react"
import stylex from "./index-stylex"

// /*
//  * Submit
//  */
//
// // https://stripe.com/docs/payments/checkout
// export const boxShadow = {
// 	boxShadow: "0 0 0 1px #E0E0E0, 0 2px 4px rgba(0, 0, 0, 0.07), 0 1px 1.5px rgba(0, 0, 0, 0.05)",
// }
//
// const Input = stylex.Styleable(props => (
// 	<input style={stylex.parse("block w:max")} {...props} />
// ))
//
// const StyledInput = stylex.Styleable(props => (
// 	<Input style={{ ...stylex.parse("p-x:16 p-y:12 br:6"), ...boxShadow }} {...props} />
// ))
//
// const Submit = stylex.Unstyleable(({ children, ...props }) => (
// 	<StyledInput style={stylex.parse("center fw:600 fs:17 ls:1.25% c:white b:blue-a400 pointer")} type="submit" value={children} {...props} />
// ))
//
// const App = props => (
// 	<div style={stylex.parse("flex -r :center h:max")}>
// 		<form style={stylex.parse("w:320")}>
// 			<Submit style={stylex.parse("m-y:16")}>
// 				Submit
// 			</Submit>
// 		</form>
// 	</div>
// )

/*
 * Box
 */

const Box = stylex.Styleable(props => (
	<div style={stylex.parse("wh:160 b:gray-200 br:8")} {...props} />
))

const RedBox = stylex.Styleable(props => (
	<Box style={stylex.parse("b:red")} {...props} />
))

const App = props => (
	<div style={stylex.parse("flex -r :center h:max")}>
		<Box />
		<div style={stylex.parse("w:16")} />
		<RedBox />
		<div style={stylex.parse("w:16")} />
		<RedBox style={stylex.parse("br:max")} />
	</div>
)

// /*
//  * Shape
//  */
//
// const App = props => (
// 	<div style={stylex.parse("flex -r :center h:max")}>
// 		<div style={stylex.parse("wh:20  b:gray-200 br:10")} />
// 		<div style={stylex.parse("wh:16")} />
// 		<div style={stylex.parse("wh:40  b:gray-200 br:10")} />
// 		<div style={stylex.parse("wh:16")} />
// 		<div style={stylex.parse("wh:60  b:gray-200 br:10")} />
// 		<div style={stylex.parse("wh:16")} />
// 		<div style={stylex.parse("wh:80  b:gray-200 br:10")} />
// 		<div style={stylex.parse("wh:16")} />
// 		<div style={stylex.parse("wh:100 b:gray-200 br:10")} />
// 	</div>
// )

export default App
