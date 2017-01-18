# Predictable SVGs: Knowing just enough XML

I do a lot of work with SVGs at IBM Bluemix.

Our SVG icons need to be able to change their size and color with CSS. That's it.

With that said, all I need to use are: `fill`, `viewBox`, `width` and `height`.

### Forget everything you know

Okay, well, not _everything_ but just here me out...

I know you know these attributes work together in a **coordinate system**...but I've had to tell myself, "Hey, forget about that for now. You're not doing anything too fancy with these SVGs."
But for some reason, I always have to use `viewBox`, `width` and `height` together to ensure I get predictable and consistent modification results.

### Here's what _seems_ to happen...

Let's start with the `<svg>` wrapping element.

```html
<svg width="24" height="24" viewBox="0 0 24 24">
  ...
</svg>
```

Get ready for some air quotes. 

We can control "sizing" with `width` and `height`. 

- You can override these attribute values with CSS
- The SVG will keep its aspect ratio intact (this means no stretching or sizing side-effects)

We can control the "crop" of the SVG with `viewBox` (this is the part of the SVG you actually see with your eyeballs)

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



 







