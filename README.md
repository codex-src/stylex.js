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

<br>

stylex is a CSS-in-JS library that is:

- [Atomic](#atomic)
- [Teaches CSS in the process](#teaches-css)
- [Extensible](#extensible)

This readme also documents several [MVP examples](#mvp-examples) and [talks that inspired stylex](#talks-that-inspired-stylex).

#### stylex is used almost exclusively at [Codex](https://github.com/codex-src) for styling our [frontend](https://github.com/codex-src/codex-app.js). Contributions are welcome!

stylex is under active development and is not yet considered stable. Even so, we’ve found stylex to be _extremely useful_ for prototyping and shipping highly maintainble code bases.

⚠️ stylex generates style objects (think inline styles) as supposed to classes. This simply has to do with building a functional library and getting the API and abstractions right, rather than prematurely optimizing for browser paint times. This may very well change in the future.

For what it’s worth, the popular note-taking web app [notion.so](https://notion.so) also uses inline styles to power their frontend. Of course, that doesn’t mean this is the way thing should be done, but simply that it works.

#### You can improve stylex; don’t hesitate to [file an issue](https://github.com/codex-src/stylex.js/issues) or [submit a pull request](https://github.com/codex-src/stylex.js/pulls). We are community friendly. ☺️

## Atomic

An atom conceptually describes the smallest indivisible unit by which something can be measured. The way most atomic CSS libraries work is by following this principle with CSS classes that share a 1:1 to mapping with CSS’s capabilities.

For example:

```css
.p-x:16 { padding-left: 16px; padding-right: 16px; }
.p-x:18 { padding-left: 18px; padding-right: 18px; }
.p-x:20 { padding-left: 20px; padding-right: 20px; }
...
```

_([Technically](https://mothereff.in/css-escapes), if you wanted to write the above in CSS you would need to use `.p-x\:16 ...`)_

Where `p-x` is shorthand for `padding-x-axis`. Technically `padding-x-axis` isn’t a CSS property, but why not? stylex emphasizes atomic patterns that map closely to CSS’s capabilities without being overly restrictive. All shorthands are documented in the [shorthand reference guide](#shorthand-reference-guide).

Note that stylex doesn’t map a shorthand to every CSS property. Instead, stylex focuses on solving for the 90% use case, that is, about 35 properties. But before your eyes glaze over, there’s only about 15 classes of properties to remember.

The pattern used for shorthands reliably follows this pattern: use the first letter of a property name, and if a property name is `kebab-case`, then use each first letter of every word. From this, we derive `p-x` from `padding-x-axis`, `b` from `background`, and `br` for `border-radius`.

We colloquially refer to `p-x` as the key, and `16` as the token, from `p-x:16` in the previous example. And if a token exists, the key and token are delimited with a colon.

Because not all keys are easily discernible from their first letters, sometimes the actual CSS property name is substituted. For example, `relative`, `absolute`, etc. It may seem like a lot to remember — we say this having hesitated with these concepts ourselves — but we find working with stylex to be much more comfortable and easier to work with than CSS alone.

Because stylex uses JavaScript under the hood, we also warn, using `invariant`, when a key or token doesn’t map to stylex’s resolver. All strings passed to stylex are linted for typos before emitting a style object.

## Teaches CSS

Initially, stylex was more developed to teach us CSS rather than use it in any kind of production environment. It just so turns out that a simple to use and easy to understand conceptual framework also lends itself well to be a framework.

Me personally speaking, [Zaydek](https://github.com/codex-zaydek), I’d taught myself full stack development and found that if I really wanted to be a full stack developer, I’d better style my websites, too. And at the time, this felt daunting to say the least. However, what did make sense to me was thinking about CSS properties as primitives, very much like how booleans, numbers, and strings are useless in their own right but powerful when coupled with logic.

## Extensible

To be clear, stylex is designed to be used in conjunction with a frontend framework or library like Angular, React, or Vue. stylex is generally framework agnostic and only has two dependencies for the time being: `react` for opt-in higher order components and `invariant` for emitting warnings. Note that stylex does not rely on `autoprefixer` as we’re relying on the host environment.

One of the differentiating features of stylex is that when coupled with a library like React, is its ability to extend a component’s style object. This feature is what convinced us we better share stylex with the world. When working with the class-based predecessor of stylex, we quickly discovered that the greatest limiting factor was the inability to reuse existing components without needing to copy dozens of class names.

So how do we do this?

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

...

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
+-------------------------------------------------------------------+
| KEY | KEY ALTERNATE  | TOKEN            | PROPERTY       | VALUE  |
|-----+----------------+------------------+----------------+--------|
| m   | -(l|r|x|t|b|y) | -Inf-Inf         | margin         | Npx    |
| p   | -(l|r|x|t|b|y) | 0-Inf            | padding        | Npx    |
|-----+----------------+------------------+----------------+--------|
| wh  |                | 0-Inf|auto|max   | width-height   | Npx    |
| w   |                | 0-Inf|auto|max   | width          | Npx    |
| h   |                | 0-Inf|auto|max   | height         | Npx    |
+-----+----------------+------------------+----------------+--------+
| sw  |                | 100-900          | stroke-width   | -      |
| fw  |                | 100-900          | font-weight    | -      |
| fs  |                | 0-Inf            | font-size      | Npx    |
| ls  |                | -Inf-Inf%        | letter-spacing | 0.0Nem |
| lh  |                | 0-Inf%           | line-height    | 0.0N   |
|-----+----------------+------------------+----------------+--------|
| c   |                | <css-var>        | color          | hsl    |
| b   |                | <css-var>        | background     | hsl    |
|-----+----------------+------------------+----------------+--------|
| br  | -(l|r|t|b)     | 0-Inf|max        | border-radius  | Npx    |
|-----+----------------+------------------+----------------+--------|
| z   |                | -Inf-Inf|min|max | z-index        | -      |
+-------------------------------------------------------------------+
```

## Reference guide

```
+--------------------------------------------------------------------------------------------------+
| KEY               | KEY ALTERNATE  | TOKEN             | PROPERTY              | VALUE           |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| m                 | -(l|r|x|t|b|y) | -Inf-Inf          | margin                | Npx             |
| p                 | -(l|r|x|t|b|y) | 0-Inf             | padding               | Npx             |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| relative          |                | -(...l|r|x|t|b|y) | position              | -               |
| absolute          |                | -(...l|r|x|t|b|y) | position              | -               |
| fixed             |                | -(...l|r|x|t|b|y) | position              | -               |
| sticky            |                | -(...l|r|x|t|b|y) | position              | -               |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| block             |                |                   | display               | -               |
| inline-block      |                |                   | display               | -               |
| inline            |                |                   | display               | -               |
| flex              |                | -(r|c) -(x|y):opt | display               | -               |
| inline-flex       |                | -(r|c) -(x|y):opt | display               | -               |
| grid              |                |                   | display               | -               |
| inline-grid       |                |                   | display               | -               |
| no-flex-shrink    |                |                   | flex-shrink           | 0px             |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| wh                |                | 0-Inf|auto|max    | width-height          | Npx             |
| w                 |                | 0-Inf|auto|max    | width                 | Npx             |
| h                 |                | 0-Inf|auto|max    | height                | Npx             |
| no-min-w          |                |                   | width                 | 0px             |
+-------------------+----------------+-------------------+-----------------------+-----------------+
| sw                |                | 100-900           | stroke-width          | -               |
| fw                |                | 100-900           | font-weight           | -               |
| fs                |                | 0-Inf             | font-size             | Npx             |
| ls                |                | -Inf-Inf%         | letter-spacing        | 0.0Nem          |
| lh                |                | 0-Inf%            | line-height           | 0.0N            |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| c                 |                | <css-var>         | color                 | hsl             |
| b                 |                | <css-var>         | background            | hsl             |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| br                | -(l|r|t|b)     | 0-Inf|max         | border-radius         | Npx             |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| z                 |                | -Inf-Inf|min|max  | z-index               | -               |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| overflow          |                | -(x|y):opt        | overflow              | -               |
| text-overflow     |                | -(x|y):opt        | text-overflow         | -               |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| pointer-events    |                |                   | pointer-events        | auto            |
| no-pointer-events |                |                   | pointer-events        | none            |
| pointer           |                |                   | cursor                | pointer         |
| no-pointer        |                |                   | cursor                | auto            |
|-------------------+----------------+-------------------+-----------------------+-----------------|
| translate-z       |                |                   | transform             | translateZ(0px) |
| no-translate-z    |                |                   | transform             | none            |
+--------------------------------------------------------------------------------------------------+
```

Note that `center middle pre per-wrap tnum square` are not documented as they are likely to be removed from the core library due to being too narrow in scope. See [#6](https://github.com/codex-src/stylex.js/issues/6) for reference. These keys are likely to be moved to a plugin system in the future, thereby enabling users to opt-in to extended library features and or integrate their own.

## Talks that inspired stylex

- [Adam Wathan - Utility-First CSS with Tailwind CSS](https://www.youtube.com/watch?v=BeZbMx9y1FE)
- [Frank Yan - Building the New Facebook with React and Relay](https://www.youtube.com/watch?v=9JZHodNR184)
