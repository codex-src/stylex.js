<!-- https://github.com/streamich/react-use/blob/master/README.md -->
<div align="center">
  <h1>
    <br>
    <br>
    stylex ✨
    <br>
    <br>
    <br>
    <br>
  </h1>
</div>

![](https://img.shields.io/badge/eslint-passing-brightgreen) ![](https://img.shields.io/badge/jest-passing-brightgreen)

<br>

stylex is a CSS-in-JS library that is:

- [Atomic](#atomic)
- [Teaches CSS in the process](#teaches-css)
- [Extensible](#extensible)

This readme also documents several [MVP examples](#mvp-examples) and [talks that inspired stylex](#talks-that-inspired-stylex).

#### We use stylex almost exclusively at [Codex](https://github.com/codex-src) for styling our [frontend](https://github.com/codex-src/codex-app.js). Contributions are welcome!

stylex is under active development and is not yet considered stable. Even so, we’ve found stylex to be _extremely useful_ for prototyping and shipping highly maintainble code bases.

⚠️ stylex uses inline styles behind the scenes, as supposed to classes. The reasoning for this simply has to do with building getting the API and abstractions right, rather than prematurely optimizing for browser paint times. Note that this may very well change in the future.

#### You can improve stylex; don’t hesitate to [file an issue](https://github.com/codex-src/stylex.js/issues) or [submit a pull request](https://github.com/codex-src/stylex.js/pulls). We are community friendly. ☺️

## Atomic

Conceptually, an atom describes the smallest indivisible unit by which something can be measured. The way most atomic CSS libraries work is by following this principle with an army CSS classes. The idea is that each class shares a 1:1 to mapping with a CSS property and value.

For example:

```css
.p-x\:16 { padding-left: 16px; padding-right: 16px; }
.p-x\:18 { padding-left: 18px; padding-right: 18px; }
.p-x\:20 { padding-left: 20px; padding-right: 20px; }
/* ... */
```

Where `p-x` is shorthand for `padding-x-axis`. Technically, `padding-x-axis` isn’t a CSS property … but why not? stylex emphasizes the atomic pattern without being overly restrictive.

How stylex actually works is by parsing a string composed of atomic class names and generating a style object. In practice, this looks like `stylex.parse("p-x:16 ...")`. The reason why we generate a style object is that we can have a lot more degrees of freedom with a lot less code. For example, we don’t need to specify what number literals are allowed; we just specify number ranges, like `0-Inf`, and parse your input as output.

Note that stylex doesn’t solve for every CSS property. Instead, we focus on the 90% use case. That turns out to be about 35 properties total. And before your eyes glaze over, know that there’s only about 15 classes of properties to remember. And because about half of those use shorthands, we find that stylex feels incredibly lightweight and easy to remember.

As far as naming shorthand keys, we reliably follow this pattern: use the first letter of a property name, and if a property name is `kebab-case`, then use each first letter of every word. The only exception to this rule is `z-index`, which succinctly uses `z`. From this, we derive `p-x` from `padding-x-axis`, `b` from `background`, and `br` for `border-radius`. All shorthands are documented in the [shorthand reference guide](#shorthand-reference-guide).

If parsing `p-x:16 ...`, we colloquially refer to:

- `p-x:16 ...` as the class string
- `p-x:16` as the class name
- `p-x` as the key
- and `16` as the token

If a token exists (sometimes it doesn’t), the key and token are delimited with a colon.

Because not all shorthands are easily discernible from their first letters, the actual CSS property name is substituted. For example, `relative`, `absolute`, etc. It may seem like a lot to remember — we say this having hesitated with these concepts ourselves — but we find working with stylex to be much more comfortable and easier to work with than CSS alone.

And because stylex uses JavaScript under the hood, we also emit a warning whenever a key or token doesn’t map to stylex’s resolver. All class strings, class names, and keys and tokens are linted for typos and number ranges before emitting a style object.

## Teaches CSS

Me personally speaking, [Zaydek](https://github.com/codex-zaydek), I taught myself full stack development and found that if I really wanted to be a full stack developer, I’d better style my websites, too. And at the time, this felt daunting to say the least. However, what did make sense to me was thinking about CSS properties as primitives, very much like how booleans, numbers, and strings in programming languages are primitives.

With this, I learned how to teach myself CSS and CSS patterns _as a programmer_ which seriously tipped my balance in favor of atomic CSS patterns over semantic CSS patterns. That’s not to say one or the other is better, because I don’t think they are comparable, but what I will say is that stylex and its numerous predecessors have taught me how to think about design programmatically.

When you write stylex alongside your components, you find that you have a lot less files to worry about (you don’t need a monolithic CSS file or even N+1 files for every file you write), and you find that because stylex uses shorthands as much as possible, components that use stylex aren’t dramatically harder to grok. And not having to worry about semantic class names means that your components aren’t married to any predetermined cognitive structure, which is extremely important if you are constantly shuffling things about.

Whether you’re interested in stylex or not, if you’re curious about atomic CSS learning to read and write CSS programmatically, I encourage you to review the following talks that inspired aspects of stylex:

#### Talks that inspired stylex

- [Adam Wathan - Utility-First CSS with Tailwind CSS](https://www.youtube.com/watch?v=BeZbMx9y1FE)
- [Frank Yan - Building the New Facebook with React and Relay](https://www.youtube.com/watch?v=9JZHodNR184)

## Extensible

To be clear, stylex is designed to be used in conjunction with a frontend framework or library like [Angular](https://angular.io), [React](https://reactjs.org), or [Vue](https://vuejs.org). stylex is generally framework agnostic and only has two dependencies for the time being: `react` for opt-in higher order components and `invariant` for emitting warnings. Note that stylex does not rely on `autoprefixer` as we’re relying on the host environment to do so.

One of the differentiating features of stylex is that when coupled with a library like React, is its ability to extend a component’s style object. This feature is what convinced us we better share stylex with the world. When working with the class-based predecessor of stylex, we quickly discovered that the greatest limiting factor was the inability to reuse existing components without needing to copy dozens of class names.

How do we do this?

It turns out the solution is quite subtle. In React, a component can extend another component with `{...props}`. This works except for when `style={...}` is declared on both components, thereby overwriting the original component’s `props`.

To solve for this without the need for higher-order components, you can write:

```jsx
const Component = ({ style, ...props }) => (
  <div style={{ stylex.parse("..."), ...style }} {...props}>
    {props.children}
  </div>
)
```

This destructures `styles` from `props`, disallowing `{...props}` from overwriting the underlying component’s `style`, which is an unintended consequence of using `{...props}`. This is the difference between extending an existing component’s styles.

This is exactly what we did until it grew to become untenable. So we wrote two simple higher-order components to self-document the answer to the following question: _does this component allow or prevent its styles from being extended?_

In answering this, we created `stylex.Styleable` and `stylex.Unstyleable` (that’s styleable _with_ an e — don’t worry, you’ll be gently warned if you misspelled either of them). These two higher-order components allow or prevent a component from being restyled without overwriting style, leading to self-documenting components that are much easier to reason about.

These are of course opt-in, but are preferred for brevity:

```jsx
const Component = stylex.Styleable(props => (
  <div style={stylex.parse("...")} {...props}>
    {props.children}
  </div>
))

// ...

const Component = stylex.Unstyleable(props => (
  <div style={stylex.parse("...")} {...props}>
    {props.children}
  </div>
))
```

These components now document and describe their styles are resolved if reused. Note that the use of `{...props}` is up to the discretion of the component author and no longer affects how styles are resolved.

We find that generally, lower-level components should use `Styleable`, thus making them more reusable, and higher-level components should use `Unstyleable`, thus making them more predictable. There is one exception to this case, and that is for when a higher-level component is expected to be extended with `margin`, e.g. `<Component style={stylex("m-y:16")}>`.

## MVP examples

### Hello, world!

```jsx
const App = props => (
  <h1 style={stylex.parse("fw:700 fs:32 lh:150%")}>
    Hello, world!
  </h1>
)
```

#### TODO

```jsx
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
```

## Shorthand reference guide

```
Property       | Key               | Token
-------------- | ----------------- | ----------------
margin         | m-(l|r|x|t|b|y)   | -Inf-Inf
padding        | p-(l|r|x|t|b|y)   | 0-Inf
width-height   | wh                | 0-Inf|auto|max
width          | w                 | 0-Inf|auto|max
height         | h                 | 0-Inf|auto|max
stroke-width   | sw                | 100-900
font-weight    | fw                | 100-900
font-size      | fs                | 0-Inf
letter-spacing | ls                | -Inf-Inf%
line-height    | lh                | 0-Inf%
color          | c                 | <css-var>
background     | b                 | <css-var>
border-radius  | br-(l|r|t|b)      | 0-Inf|max
z-index        | z                 | -Inf-Inf|min|max
```

## Reference guide

```
Property       | Key               | Token
-------------- | ----------------- | -----------------
margin         | m-(l|r|x|t|b|y)   | -Inf-Inf
padding        | p-(l|r|x|t|b|y)   | 0-Inf
position       | relative          | -(l|r|x|t|b|y)
""             | absolute          | -(l|r|x|t|b|y)
""             | fixed             | -(l|r|x|t|b|y)
""             | sticky            | -(l|r|x|t|b|y)
display        | block             |
""             | inline-block      |
""             | inline            |
""             | flex              | -(r|c) -(x|y):opt
""             | inline-flex       | -(r|c) -(x|y):opt
""             | grid              |
""             | inline-grid       |
flex-shrink    | no-flex-shrink    |
width-height   | wh                | 0-Inf|auto|max
width          | w                 | 0-Inf|auto|max
height         | h                 | 0-Inf|auto|max
width          | no-min-w          |
stroke-width   | sw                | 100-900
font-weight    | fw                | 100-900
font-size      | fs                | 0-Inf
letter-spacing | ls                | -Inf-Inf%
line-height    | lh                | 0-Inf%
color          | c                 | <css-var>
background     | b                 | <css-var>
border-radius  | br-(l|r|t|b)      | 0-Inf|max
z-index        | z                 | -Inf-Inf|min|max
overflow       | overflow          | -(x|y):opt
text-overflow  | text-overflow     | -(x|y):opt
pointer-events | pointer-events    |
""             | no-pointer-events |
cursor         | pointer           |
""             | no-pointer        |
transform      | translate-z       |
""             | no-translate-z    |
```

Note that `center`, `middle`, `pre`, `per-wrap`, `tnum`, and `square` are not documented as they are likely to be removed from the core library due to being too narrow in scope. See [#6](https://github.com/codex-src/stylex.js/issues/6) for reference. These keys are likely to be moved to a plugin system in the future, thereby enabling users to opt-in to extended library features and or integrate their own.

Token options `opts` are currently not documented either. If you’re curious, you’re welcome to explore the [source code](https://github.com/codex-src/stylex.js/blob/master/src/parse.js) to better understand what options are available for several properties: `flex`, `inline-flex`, `overflow`, `text-overflow`.
