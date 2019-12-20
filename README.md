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

#### stylex is used almost exclusively at [Codex](https://github.com/codex-src) for styling our [frontend](https://github.com/codex-src/codex-app.js). Contributions welcome!

stylex is under active development and is not yet considered stable. Even so, we’ve found stylex to be _extremely useful_ for prototyping and shipping highly maintainble code bases.

⚠️ stylex uses inline styles behind the scenes, as supposed to classes. This simply has to do with building a functional library and getting the API and abstractions right, rather than prematurely optimizing for browser paint times. This may very well change.

For what it’s worth, the popular note-taking web app [notion.so](https://notion.so) also uses inline styles to power their frontend. Of course, that doesn’t mean _this is the way thing should be done_, but simply that it works.

<br>

## Atomic

An _atom_ conceptually describe the smallest indivisible unit by which something can be measured. The way most atomic CSS libraries work is by following this principle with CSS classes that share a 1:1 to mapping with CSS’s capabilities.

For example:

```css
.p-x:16 { padding-left: 16px; padding-right: 16px; }
.p-x:18 { padding-left: 18px; padding-right: 18px; }
.p-x:20 { padding-left: 20px; padding-right: 20px; }
...
```

_(Technically, if you wanted to write the above in CSS, you would need to use `.p-x\:16 ...`)_

Where `p-x` is shorthand for `padding-x-axis`. Technically `padding-x-axis` isn’t a CSS property, but why not? stylex emphasizes atomic patterns that map closely to CSS’s capabilities without being overly restrictive. All shorthands are documented in the [reference guide](#reference-guide)).

Note that stylex doesn’t map a shorthand to every CSS property. Instead, stylex focuses on solving for the 90% use case, that is, about 50+ properties. But before your eyes glaze over, there’s only about 15 _kinds of classes_ to remember, and the rest is added syntax to describe the axis, size, etc.

The pattern used for shorthands reliably follows the following pattern: the first letter of a property name (if a property name is `kebab-case`, then the first letter of every word is used). This is known as the `key`, like `p-x` in the previous example. The `token` is the property’s value, like `16` in the previous example. If a token exists, the key and token are delimited with a colon.

Not all keys can be easily discerned from their first letters. In this case, the actual property name is substituted. Some examples of this are `relative`, `absolute`, … `flex`, `grid`, etc. After you understand which properties stylex solves for, it’s very easy to remember going forward. We say this having hesitated with this ourselves.

<br>

## Teaches CSS

Initially, stylex was more developed to teach us CSS rather than use it in any kind of production setting. It just so turned out that a simple-to-use and easy-to-understand conceptual framework also lends itself well to be used in a production setting because the last thing you want is to make the developer’s job harder. And we found building and working with stylex (and its predecessor protoypes) to be liberating to say the least.

Me personally speaking, [Zaydek](https://github.com/codex-zaydek), I’d taught myself full stack development and found that if I really wanted to be a full stack developer, I’d better style my websites too. This felt daunting to say the least. What did make sense was thinking about CSS as lower-level primitives meant to be built on top of, very much like how booleans, numbers, and strings are useless in their own right, but powerful when coupled with logic.

<br>

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

In answering this, we created `stylex.Styleable` and `stylex.Unstyleable` (that’s styleable _with an e_ — don’t worry, you’ll be gently warned if you misspelled them). These two higher-order components allow or prevent a component from being restyled, leading to easier to reason about code and self-documenting components.

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

<br>

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

<br />

## Reference guide

```
m(-(l|r|x|t|b|y))?:(-∞–∞)     margin
p(-(l|r|x|t|b|y))?:(0–∞)      padding
relative -opts                (self-descriptive)
absolute -opts                (self-descriptive)
fixed -opts                   (self-descriptive)
sticky -opts                  (self-descriptive)
block                         (self-descriptive)
inline-block                  (self-descriptive)
inline                        (self-descriptive)
flex (-(r|c)) -opts           (self-descriptive)
inline-flex (-(r|c)) -opts    (self-descriptive)
grid                          (self-descriptive)
inline-grid                   (self-descriptive)
no-flex-shrink                flex-shrink: 0
wh:(0–∞|auto|max)             width-height                      *max: 100%
w:(0–∞|auto|max)              width                             *max: 100%
h:(0–∞|auto|max)              height                            *max: 100%
no-min-w                      width: 0
center                        text-align: center
middle                        vertical-algin: middle
pre                           white-space: pre
pre-wrap                      white-space: pre-wrap
tnum                          font-feature-settings: 'tnum'
square                        stroke-linecap: square            *meant to be used with feathericons/react-feather
sw:(0–∞)                      stroke-width                      *meant to be used with feathericons/react-feather
fw:(100–900)                  font-weight
fs:(0–∞)                      font-size
ls:(0–∞%)                     letter-spacing
lh:(0–∞%)                     line-height
c:<css-var>                   color: hsl(var(--<css-var>))      *meant to be used with codex-src/material.css
b:<css-var>                   background: hsl(var(--<css-var>)) *meant to be used with codex-src/material.css
br(-(l|r|t|b|max))?:(0–∞)     border-radius                     *max: 50%
overflow -opts                (self-descriptive)
text-overflow (-(x|y)?) -opts (meta property)
z:(-∞–∞|min|max)              z-index                           *min: -9999, max: 9999
pointer-events                pointer-events: auto
no-pointer-events             pointer-events: none
pointer                       cursor: pointer
no-pointer                    cursor: auto
translate-z                   transform: translateZ(0px)
no-translate-z                transform: none
```

<br>

## Talks that inspired stylex

- [Adam Wathan’s Utility-First CSS with Tailwind CSS](https://www.youtube.com/watch?v=BeZbMx9y1FE)
- [Frank Yan’s Building the New Facebook with React and Relay](https://www.youtube.com/watch?v=9JZHodNR184)
