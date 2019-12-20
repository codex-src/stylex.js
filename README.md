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

stylex is a CSS-in-JS library that is:

- [Atomic](#atomic)
- [Teaches CSS in the process](#teaches-css)
- [Extensible](#extensible)

This readme also documents several [MVP examples](#mvp-examples) and [talks that inspired stylex](#talks-that-inspired-stylex).

#### stylex is used almost exclusively at [Codex](https://github.com/codex-src) for styling our [frontend](https://github.com/codex-src/codex-app.js). Contributions are welcome!

stylex is under active development and is not yet considered stable. Even so, we’ve found stylex to be _extremely useful_ for prototyping and shipping highly maintainble code bases.

⚠️ stylex uses inline styles behind the scenes, as supposed to classes. This simply has to do with building a functional library and getting the API and abstractions right, rather than prematurely optimizing for browser paint times. This may very well change in the future.

For what it’s worth, the popular note-taking web app [notion.so](https://notion.so) also uses inline styles to power their frontend. Of course, that doesn’t mean _this is the way thing should be done_, but simply that it works.

#### You can improve stylex; don’t hesitate to [file an issue](https://github.com/codex-src/stylex.js/issues) or [submit a pull request](https://github.com/codex-src/stylex.js/pulls). We are community friendly. ☺️

## Atomic

An _atom_ conceptually describe the smallest indivisible unit by which something can be measured. The way most atomic CSS libraries work is by following this principle with CSS classes that share a 1:1 to mapping with CSS’s capabilities.

For example:

```css
.p-x:16 { padding-left: 16px; padding-right: 16px; }
.p-x:18 { padding-left: 18px; padding-right: 18px; }
.p-x:20 { padding-left: 20px; padding-right: 20px; }
...
```

_([Technically](https://mothereff.in/css-escapes), if you wanted to write the above in CSS you would need to use `.p-x\:16 ...`)_

Where `p-x` is shorthand for `padding-x-axis`. Technically `padding-x-axis` isn’t a CSS property, but why not? stylex emphasizes atomic patterns that map closely to CSS’s capabilities without being overly restrictive. All shorthands are documented in the [reference guide](#reference-guide)).

Note that stylex doesn’t map a shorthand to every CSS property. Instead, stylex focuses on solving for the 90% use case, that is, about 50+ properties. But before your eyes glaze over, there’s only about 15 _kinds of classes_ to remember, and the rest is added syntax to describe the axis, size, etc.

The pattern used for shorthands reliably follows the following pattern: the first letter of a property name (if a property name is `kebab-case`, then the first letter of every word is used). This is known as the `key`, like `p-x` in the previous example. The `token` is the property’s value, like `16` in the previous example. If a token exists, the key and token are delimited with a colon.

Not all keys can be easily discerned from their first letters. In this case, the actual property name is substituted. Some examples of this are `relative`, `absolute`, … `flex`, `grid`, etc. After you understand which properties stylex solves for, it’s very easy to remember going forward. We say this having hesitated with this ourselves.

## Teaches CSS

Initially, stylex was more developed to teach us CSS rather than use it in any kind of production setting. It just so turned out that a simple-to-use and easy-to-understand conceptual framework also lends itself well to be used in a production setting because the last thing you want is to make the developer’s job harder. And we found building and working with stylex (and its predecessor protoypes) to be liberating to say the least.

Me personally speaking, [Zaydek](https://github.com/codex-zaydek), I’d taught myself full stack development and found that if I really wanted to be a full stack developer, I’d better style my websites too. This felt daunting to say the least. What did make sense was thinking about CSS as lower-level primitives meant to be built on top of, very much like how booleans, numbers, and strings are useless in their own right, but powerful when coupled with logic.

## Extensible

One of the defining features of stylex, when coupled with a frontend library like React, is its ability to extend component styling. This is big. When working with the class-based predecessor, we quickly discovered that the greatest limiting factor was the inability to refactor existing components without needing to copy many class names.

It turns out the solution is quite subtle. In React, a component can extend another component with `{...props}`, meaning _inherit the parent component’s `props`_. This works great except for when the parent component _also_ defines style props, thereby overwriting the original component’s `props`.

To solve for this without the need for higher-order components, you can write:

```jsx
const Component = ({ style, ...props }) => (
  <p style={{ stylex.parse("..."), ...style }} {...props}>
    {props.children}
  </p>
)
```

This in effect destructures `styles` from `props`, disallowing `{...props}` from overwrting the underlying component’s `style`, which is an unintended consequence of using `{...props}`. This is important for extending the existing styles defined on a component.

And we did, until it became untenable. So we wrote two simple HOCs to self-document the following question: _should a component allow or prevent its styles from being extended?_

In answering this, we created `stylex.Styleable` and `stylex.Unstyleable` (that’s styleable _with_ an e — don’t worry, you’ll be gently warned if you misspelled them). These two higher-order components allow or prevent a component from being restyled, leading to easier to reason about code and self-documenting components.

These are of course opt-in, but are preferred for brevity:

```jsx
const C1 = Unstyleable(props => (
  <div style={stylex("...")} {...props}>
    {props.children}
  </div>
))

...

const C2 = Styleable(props => (
  <div style={stylex("...")} {...props}>
    {props.children}
  </div>
))
```

These components now describe their underlying styling behavior with less moving parts. Note that the use of `{...props}` is up to the discretion of the component author and no longer affects how styles are interpolated. Generally, lower-level components should use `Stylable`, thus making them more reusable. And higher-level components should use `Unstyleable`, thus making them more predictable. One good argument for when to make a higher-level component styleable is when it’s expected to interpolate `margin`.

## MVP examples

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

If you just need a high-level overview, you can use the following:

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

If you need the complete reference guide, you can use the following:

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
