import stylex from "./stylex"

test("stress test", () => {
	expect(stylex(`
		m:0
		m-l:0
		m-r:0
		m-x:0
		m-t:0
		m-b:0
		m-y:0
		p:0
		p-l:0
		p-r:0
		p-x:0
		p-t:0
		p-b:0
		p-y:0
		relative -l -r -x -t -b -y
		absolute -l -r -x -t -b -y
		fixed    -l -r -x -t -b -y
		sticky   -l -r -x -t -b -y
		block
		inline-block
		inline
		flex -r -c :stretch :start :center :end :between :around :evenly -x:stretch -x:start -x:center -x:end -x:between -x:around -x:evenly -y:stretch -y:start -y:center -y:end -y:between -y:around -y:evenly
		inline-flex -r -c :stretch :start :center :end :between :around :evenly -x:stretch -x:start -x:center -x:end -x:between -x:around -x:evenly -y:stretch -y:start -y:center -y:end -y:between -y:around -y:evenly
		grid
		inline-grid
		no-flex-shrink
		wh:0
		w:0
		h:0
		no-min-w
		center
		middle
		pre
		pre-wrap
		tnum
		square
		sw:400
		fw:400
		fs:0
		ls:0%
		lh:100%
		c:red
		b:red
		br:0
		br-l:0
		br-r:0
		br-t:0
		br-b:0
		overflow :scroll -x:scroll -y:scroll :hidden -x:hidden -y:hidden
		text-overflow -x -y:0
		z:0
		pointer-events
		no-pointer-events
		pointer
		no-pointer
		translate-z
		no-translate-z
	`)).toStrictEqual({
		margin: 0,
		marginLeft: 0,
		marginRight: 0,
		marginTop: 0,
		marginBottom: 0,
		padding: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		position: "sticky",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		display: "-webkit-box",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "space-evenly",
		flexShrink: 0,
		width: 0,
		height: 0,
		minWidth: 0,
		textAlign: "center",
		verticalAlign: "middle",
		whiteSpace: "pre-wrap",
		fontFeatureSettings: "'tnum'",
		strokeLinecap: "square",
		strokeWidth: 2,
		fontWeight: 400,
		fontSize: 0,
		letterSpacing: "0em",
		lineHeight: 1,
		color: "hsl(var(--red))",
		background: "hsl(var(--red))",
		borderRadius: 0,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		overflowY: "hidden",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: 0,
		zIndex: 0,
		pointerEvents: "none",
		cursor: "auto",
		transform: "none",
	})
})
