# Predictable SVGs: Knowing just enough XML

## We ❤️ SVGs but maybe you only __tolerate__ XML 👀

This past year, I had the chance to start maintaining our own SVG icon library so I had to start learning how to do things with XML.
You can do a lot with SVGs but for our users at work, we only have a few requirements for our icons:

1. Be SVGs.
2. Change color with HTML/CSS.
3. Change size with HTML/CSS. 

That's it.

I discovered that I only needed to care about 3 XML things to meet all of our requirements: 

- `fill`, 
- `viewBox`, 
- `width` and `height`.

Before we talk about those 3 XML things, let's talk about XML just so we're on the same page.

## XML

This is XML for an SVG. This code tells the browser to draw a red circle:

```html
<svg viewBox="0 0 100 100" width="100" height="100">
	<circle cx="50" cy="50" r="50" fill="red" />
</svg>
```

It looks a lot like HTML, right?
They resemble each other because HTML and XML are both Markup Languages.
- XML is used for data.
- HTML is used to create structure for websites and apps.

In fact, you can take this XML and put it directly in your HTML file and it will display.

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

This is one of the best ways to include SVGs especially when the SVG XML is small and simple.
In most cases, you can treat XML like HTML with a few exceptions. One common exception is adding color to your SVG.

## Fill

```html
<svg viewBox="0 0 100 100" width="100" height="100" fill="red">
	<circle cx="50" cy="50" r="50" />
</svg>
```

For SVG XML, you can add color to shapes using the `fill` attribute; this works like the CSS `background-color` rule.
This will fill the contents of the shape with the color value given.

You can use any color values that work with CSS:
- hexcodes
- color names
- `rgb` and `rgba`
- gradients
- etc.

If you understand how CSS cascades styles from a parent to a child element, those same rules apply between `<svg>` (parent) and any shape elements inside (child).

This means you can use CSS to override the `fill` attribute for `<svg>`.

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

## Stroke

Stroke is like the CSS `outline` or `border` of the SVG XML world.
Same CSS rules apply.

## ViewBox

Here's where it gets tricky (for me even today).

The `viewBox` attribute controls the parts of the SVG you actually see. 

The viewable stuff. 

The `viewBox`!

You can think of it like a crop or a clip for photos and pictures. 
- You can position the crop. 
- You can resize the crop.
- If the crop is too small, you'll only see a small part of the SVG.
- If the crop is too big, you're going to see the entire SVG and then some (this also scales the SVG size to appear smaller and "at a distance" #airquotes);
- If the crop is __just right__, you'll see the entire SVG - no more no less.

So here was the __big insight__ for me about `viewBox`.
If you don't care about cropping your SVG, set your `viewBox` value to match the given `width` and `height` attributes on the SVG.

```html
<svg viewBox="0 0 24 24" width="24" height="24">
  ...
</svg>
```










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



 







