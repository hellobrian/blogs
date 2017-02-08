# Predictable SVGs: Knowing just enough XML

I've been maintaining an icon library for work. 

Our icons are made of SVGs. 

SVGs are made of XML. 

Being fairly new to XML, I learned a lot about it! Not all of it, just enough. 

Our icon library has pretty simple requirements:

1. Be SVGs.
2. Change color with CSS.
3. Change size with CSS.

That's it.

I would bet that these are minimum requirements for any icon library.

So far, I found that I only needed to know about 3-ish XML attributes:

- `fill`,
- `viewBox`,
- `width` and `height`

## TL;DR

Here's the gist:

Set `viewBox`, `width` and `height` with __matching values__.

- This allows you to resize SVG predictably using `width` and `height`.
- You never have to mess around with `viewBox`...just `width` and `height`

Use SVGO to optimize your SVGs.

- SVGO converts XML exported from vector programs (Illustrator, Sketch) into clean, readable code.
- Optimizing removes a lot of XML code you don't need to learn when you're just getting started.

Know that you can override attributes like `fill`, `width` and `height` using CSS.

- Always target `<svg>` element for applying CSS since styles will cascade down to decendents.

## XML is like HTML

XML is a markup language.

```html
<!-- this is a red circle -->
<svg viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="50" fill="red" />
</svg>
```

It's not a coincidence that it looks a lot like HTML.

This is because HTML is a markup language as well.

- XML is used for data (and defining SVG)
- HTML is for structuring websites and apps.

In fact, you can take XML for an SVG and put it directly in an HTML document and it will render a red circle when viewed in the browser.

```html
<html>
<body>
  <!-- We call this "inline SVG" because it's in the lines (#dadjokes) -->
  <svg viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="50" fill="red" />
  </svg>
</body>
</html>
```

This is called __inline SVG__. 

This technique is one of the best ways to add SVGs to an HTML document under the right circumstances.

> The right circumstances for inline SVG:
> 
> - When the SVG is short and readable (like, when it's optimized with SVGO).
> - Ideally, when the SVG is only used once

In most cases, you can treat XML like HTML with a few exceptions. 

## Fill

The `fill` attribute is like `background-color` but for vector shapes.

- You must use `fill` for SVG to change the color.
- The `background-color` style doesn't work on SVG.

```html
<svg viewBox="0 0 100 100" width="100" height="100" fill="red">
  <circle cx="50" cy="50" r="50" />
</svg>
```

You can use any color values that work with CSS:
- hexcodes
- color names like `red`
- `rgb` and `rgba`
- gradients
- etc.

Although we exclusively use `fill` with SVGs instead of `background-color`, general CSS rules still apply. 

Styles applied to the `<svg>` element cascades down to any shape elements contained inside.

What does this mean in real-world use? Well, you can reset the `fill` value using CSS on the svg.

```html
<style>
  svg {
    fill: green;
  }
</style>

<!-- svg will be green -->
<svg class="many-circles" viewBox="0 0 300 300" width="100" height="100" fill="red">
  <circle cx="50" cy="50" r="50" />
</svg>
```


## ViewBox

The `viewBox` attribute controls the parts of the SVG you _actually see_.

The viewable stuff.

The `viewBox`!

This is a concept that's still tricky for me to understand even today.

None of my awesome metaphors work well enough to explain `viewBox` so my main recommendation is to set it so that it's value matches `width` and `height`. Then, never touch it again.

---------------

I like to think of `viewBox` being similar to "cropping a photo". You can set the position and the size of the "crop" but the actual SVG doesn't change its own position or size.

I found that:
- When the `viewBox` is too small, you only see a small part of the SVG.
- When the `viewBox` is __just right__, you'll see the entire SVG and nothing else.

Since I've been using SVGs as icons, I only care that the `viewBox` is set just right to match the SVGs dimensions. Doing this allows me to never touch the `viewBox` attribute ever again.

```html
<svg viewBox="0 0 24 24" width="24" height="24">
  ...
</svg>
```

Set it and forget it!

### What happens when the viewBox is bigger than the SVG?

This is where my photo metaphor kind of falls apart.

- When the crop is too big, the SVG scales to appear smaller since it scales according to how big the viewBox is relative to its actual size.
- It looks like we're viewing the SVG "from a distance".


------------




> __The `viewBox` numbers__
> There are 4 numbers to specify the `viewBox`:
> ```
> viewbox="min-x min-y width height"
>```
> * The `min` values sets a position for the viewBox. In other words, where the `viewBox` starts.
> * The `width` and `height` determine the size of the box.

Now, I can change the size of the SVG using `width` and `height`.
Since, I always want the viewBox to start where my SVG starts, then
I never have to touch `viewBox` again.

Set it and forget it!










----------------

### SVG Tags and Attributes

In both XML and HTML:
- Tags (aka Elements) are the things with `<>`
- Attributes help customize Tags through description, naming or behavior.

### Fill

This is the easiest one to understand and here's all you need to know for now:

The `fill` attribute sets the color of the SVG.
- Uses any CSS color values (hexcodes, names, etc.)
- Can be applied to the `<svg>` or different shapes inside the `<svg>` like, `<circle>`, etc.




> #### Keeping `viewBox`, `width` and `height` together
>
> Here's the thing:
>
> for really predictable results, I always make sure to include `viewBox`, `width` and `height` on the `<svg>` element.
For my own humble requirements at work, keeping these three attributes together helps a lot. Now here's how we can think about them together.

### Here's what _seems_ to happen...

Let's start with the `<svg>` wrapping element.

```html
<svg width="24" height="24" viewBox="0 0 24 24">
  ...
</svg>
```

Get ready for some air quotes.

We can control "sizing" with `width` and `height`.

- You can override these attribtue values with CSS
- The SVG will keep its aspect ratio intact, so you won't see any weird stretching or shrinking when you do weird size changes.

We can control the "parts of the SVG you actually see" with `viewBox`.

- `viewBox` is like defining the size and position of a "window" to view the SVG icon. For example:
	- A "window" that is too small will show a small part of the SVG.
	- A "window" that is too big will show the entire SVG and some of the background it's on.
	- A "window" that is sized and positioned _just_ right...well, it shows the entire SVG; no more and no less.

**Bottom line**: Make sure these attributes are always present and they should always match.

### But, what's _actually_ happening?

Okay...now for the truthy bits.

Width and height control the **viewport** of the SVG. You can see what I mean when the `viewBox` is removed. Notice how increasing the width and height of the SVG doesn't actually make the SVG bigger?
<!--
<p data-height="500" data-theme-id="0" data-slug-hash="zoxLNj" data-default-tab="result" data-user="brianhan" data-embed-version="2" data-pen-title="Inline SVG width and height" class="codepen">See the Pen <a href="http://codepen.io/brianhan/pen/zoxLNj/">Inline SVG width and height</a> by Brian Han (<a href="http://codepen.io/brianhan">@brianhan</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>-->
