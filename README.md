stylex is a CSS library built that is:

- [Atomic](#atomic)
- [Teaches CSS in the process](#teaches-css)
- [Extensible](#extensible)

stylex is used almost exclusively at [Codex](https://github.com/codex-src) to build out the frontend.

stylex is under active development and should not yet be considered stable. Despite that, we’ve found stylex to be extremely useful in both thinking about design in general and building highly maintainble code bases.

In practice, stylex uses inline styles as supposed to classes, but this simply has to do with building a functional prototype that works, rather than optimizing for browser performance, etc. In the future, this could very well change, but for now, the priority is building a powerful tool for both rapid development and shipping to production.

## Atomic

An _atom_ conceptually describe the smallest indivisible unit by which something can be measured. The way most atomic CSS libraries works is by following this principle with CSS classes that share a 1:1 to mapping with CSS’s capabilities.

For example:

```css
.p-x:16 { padding-left: 16px; padding-right: 16px; }
.p-x:18 { padding-left: 18px; padding-right: 18px; }
.p-x:20 { padding-left: 20px; padding-right: 20px; }
...
```

Where `p-x` is shorthand for `padding-x-axis`. Technically `padding-x-axis` isn’t a CSS property, but why not? stylex emphasizes atomic patterns that map closely to CSS’s capabilities without being overly restrictive.

Note that stylex doesn’t map a shorthand to every CSS property. Instead, stylex focuses on understanding and solving for the 90% use-case, that is, about 50+ properties. But before your eyes glaze over, there’s only about 15 _kinds of classes_ to remember, and the rest is added syntax to describe an axis, size, etc.

The pattern used for shorthands reliably follows the following pattern: the first letter of a property name (if a property name is `kebab-case`, then the first letter of every word is used). This is known as the `key`, like `p-x` in the previous example. The `token` is the property’s value, like `16` in the previous example. If a token exists, the key and token are delimited with a colon.

Not all keys can be easily discerned from their first letters. In this case, the actual property name is substituted. Some examples of this are `relative`, `absolute`, … `flex`, `grid`, etc. After you understand which properties stylex solves for, it’s very easy to remember going forward. We say this having hesitated with this ourselves.

## Teaches CSS

Initially, stylex was more developed to teach us CSS rather than use it in any kind of production setting. It just so turned out that a simple-to-use and easy-to-understand conceptual framework also lends itself well to be used in a production setting because the last thing you want is to make the developer’s job harder. And we found building and working with stylex (and its predecessor protoypes) to be liberating to say the least.

Me personally speaking, [Zaydek](https://github.com/codex-zaydek), I’d taught myself full stack development and found that if I really wanted to be a full stack developer, I’d better style my websites too. This felt daunting to say the least. What did make sense was thinking about CSS as lower-level primitives meant to be built on top of, very much like how booleans, numbers, and strings are useless in their own right, but powerful when coupled with logic.

## Extensible

One of the defining features of stylex, when coupled with a frontend library like React, is its ability to extend component styling. This is big. When working with the class-based predecessor, we quickly discovered that the greatest limiting factor was the inability to refactor existing components without needing to copy too many class names.

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
