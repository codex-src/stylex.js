import React from "react"
import stylex from "./index-stylex"

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

// const Text = ({ style, ...props }) => (
// 	<p style={{ ...stylex("m-x:4 p-x:12 p-y:8 fw:600 fs:18 ls:-1% b:gray-200 br:6"), ...style }}>
// 		Hello, world!
// 	</p>
// )
//
// const App = props => (
// 	<div style={stylex("m-x:-4 p:16 flex -r -y:end")}>
// 		<div style={stylex("no-flex-shrink flex -r -y:end")}>
// 			<Text style={stylex("lh:100%")} />
// 			<Text style={stylex("lh:125%")} />
// 			<Text style={stylex("lh:150%")} />
// 			<Text style={stylex("lh:175%")} />
// 			<Text style={stylex("lh:200%")} />
// 		</div>
// 	</div>
// )
//
// const App = props => (
// 	<div>
// 		{[...Array(29).keys()].map(index => (
// 			<p key={index} className="Inter" style={stylex(`fs:${8 + 2 * index}`)}>
// 				Hello, world!
// 			</p>
// 		))}
// 	</div>
// )
//
// const App = props => (
// 	<div style={stylex("p:64 flex -r -x:center")}>
// 		<div style={stylex("flex -r -y:center")}>
// 			<div style={stylex("wh:20  b:gray-200 br:8")} />
// 			<div style={stylex("wh:16")} />
// 			<div style={stylex("wh:40  b:gray-200 br:8")} />
// 			<div style={stylex("wh:16")} />
// 			<div style={stylex("wh:60  b:gray-200 br:8")} />
// 			<div style={stylex("wh:16")} />
// 			<div style={stylex("wh:80  b:gray-200 br:8")} />
// 			<div style={stylex("wh:16")} />
// 			<div style={stylex("wh:100 b:gray-200 br:8")} />
// 		</div>
// 	</div>
// )

export default App
