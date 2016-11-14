# Predictable SVGs: Knowing just enough XML

I do a lot of work with SVGs at IBM.

We make them available to be used in very simply because they're used as icons in the product we build.
There's only a small subset of things that these SVG icons need to do but here are the two important ones:

Our SVG icons need to be able to change their size and color with CSS. That's it.

So when it comes down to modifying SVG icons, there are only 4 XML attributes I wanted to understand first: `fill`, `viewBox`, `width` and `height`.

The only way I've been able to get consistent, predictable results is when I ensure that `viewBox`, `width` and `height` attributes are always together on the `<svg>` wrapping element. 

### Forget everything you know

Okay, well, not _everything_ but just here me out...

I know you know these attributes work together in a **coordinate system**...but I've had to tell myself, "Hey, forget about that for now. You're not doing anything too fancy with these SVGs."

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

<p data-height="500" data-theme-id="0" data-slug-hash="zoxLNj" data-default-tab="result" data-user="brianhan" data-embed-version="2" data-pen-title="Inline SVG width and height" class="codepen">See the Pen <a href="http://codepen.io/brianhan/pen/zoxLNj/">Inline SVG width and height</a> by Brian Han (<a href="http://codepen.io/brianhan">@brianhan</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>



 







