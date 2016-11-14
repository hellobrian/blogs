# SVGs for Me: Knowing Your XML

> "SVGs for Me" is a short series of personal, non-technical letters to myself about understanding and using SVGs. These are all related to my own experiences working with my teams at IBM as a front-end developer. 

Hey Brian! 

It's me, Brian.

At this point in your life, you've learned some useful things about SVGs. Not all the things...but the things you have deemed to be useful for your work.

Big props for making time to write about this. You _hate_ writing blogs. You're a real champ.

Okay...moving on...

**You only need to know a few things about XML to do your job.** 

The situation hasn't changed: Your co-workers need icons. They want them in SVG. Inlining SVG works everywhere but there are things like `<use>` and React that will make using SVG icons nicer for you and your team (we'll get to those nice things later).

Alright...XML!

## XML is like HTML

They both use `<elements>` and `attributes` and they express structure and semantics for themselves.
You can **inline** SVGs in an HTML document using `<svg>` and it's going to render that SVG. Neat!

```html
<html>
<body>
  <svg><!-- put svg stuff in here --></svg>
</body>
</html>
```

## Focus on less XML with SVGO

Use SVGO right now!

Yes it optimizes the things but you should also notice that it removes of excess XML. Now you only need to focus on understanding a small subset of XML stuff, like, stuff that directly affects the **look** and **usage** of your SVG.

For example, here's an "add" icon from IBM Design Language after we run it through SVGO:

**Exported from Illustrator + Optimized with SVGO:**

```html
<svg class="add--filled" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 1C5.926 1 1 5.925 1 12s4.926 11 11 11 11-4.925 11-11S18.074 1 12 1zm5 12h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
  <path d="M12 1C5.926 1 1 5.925 1 12s4.926 11 11 11 11-4.925 11-11S18.074 1 12 1zm5 12h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
</svg>
```

Look at that! That's not much at all!

Now we're left with only a small subset of elements and attributes to understand:

* `viewBox`
* `width` and `height`
* `<path>` and `d` - all you really need to know is that these are shapes.

> **Quick note on Sketch:** Exporting XML code from **Sketch** will give you some added `<g>` elements and `fill-rule` attributes.

> Go ahead and **remove the `<g>` elements** - you don't need them. 
> 

> As for `fill-rule`, I keep this as an attribute on `<svg>` wrapping element **just in case**.
The `fill-rule` attribute determines how colors fill an SVG shape. For simple icons, this works with or without the attribute...so whatever.



## Understanding viewBox, width and height 

Okay...here are some more specifics on how you're using the SVGs:

* they're used as icons
* the entire icon should be seen - no more and no less.
* sometimes, our teammates need to resize these icons (but they should still render at default sizes when used as-is)

### What _seems_ to happen...

So...Brian...

I know you know these attributes work together in a **coordinate system**...but forget about that for now.

You're not doing anything too fancy with these SVGs.

I know you want **really predictable results**, so make sure all three of these attributes are on the `<svg>` element.

```html
<svg width="24" height="24" viewBox="0 0 24 24">
  ...
</svg>
```

**Here's the thing**: 

**What _seems_ to happen** when you change these values makes a lot of sense. 
But this **isn't _actually_ what's happening** (and you'll see why when we start removing attributes in the next section).

- **Sizing**: 
	- You can control the **sizing** of the SVG by changing the `width` and `height` attributes. 
	- You can override these attributes with CSS `width` and `height` styles by selecting the `<svg>` element (but ya know, use a `class` selector, please). 
	- Also remember that the SVG will keep it's **aspect ratio** intact, so you won't see any weird stretching or shrinking when you do weird size changes to the SVG.

- **Viewing**: you can also control what parts of the SVG you actually see with the `viewBox` attribute, it's like defining the size and poisition of a "window":
	- If the "window" is really small, you'll see just a small part of the SVG.
	- If the "window" is really big, you'll see the entire SVG and some of the canvas it's on.
	- If the "window" is poisitioned near the bottom-left of the SVG...well that's the part you're going to see.

**Bottom line**: Make sure these attributes are always present and they should always match.

## What _actually_ happens: width and height

Okay...now for the truthy bits.

Width and height control the **viewport** of the SVG. You can see what I mean when the `viewBox` is removed. Notice how increasing the width and height of the SVG doesn't actually make the SVG bigger?

<p data-height="500" data-theme-id="0" data-slug-hash="zoxLNj" data-default-tab="result" data-user="brianhan" data-embed-version="2" data-pen-title="Inline SVG width and height" class="codepen">See the Pen <a href="http://codepen.io/brianhan/pen/zoxLNj/">Inline SVG width and height</a> by Brian Han (<a href="http://codepen.io/brianhan">@brianhan</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>



 







