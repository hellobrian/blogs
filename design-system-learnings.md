# Design System Learnings

2016 was a big year for design systems at IBM.
We had our design system adopted by a really large enterprise product, Bluemix.
Personally for me, I've learned a lot. Here are some things I learned.

## Read the room

Who's going to use your design system? 
I was writing the HTML and CSS for the design system so 

In other words, get to know your user or your audience. What do they like? What do they hate? What do they know? Knowing all of that, what do they actually need from a design system so that they want to use it?

Off the top of my head, we learned that our users are: 
- Engineers (mostly middleware and back-end folks).
-  


## Just enough "naming conventions"

Our design system is made up of components that are written first in HTML and CSS. 
We were all-in on using a BEM-like naming convention pretty much everywhere (and we still do, more on that later). And at the time, it was the goddamn law to use our BEM naming convention on `class` attributes or GTFO.

In retrospect, I found this to be kind of a challenge because a lot of our maintainers and contributing devs weren't interested in learning a whole new naming convention. Writing and curating docs on how to write this convention takes a lot of time too. 

I'm really lucky that I'm on a dedicated design system team that built out almost all of the components in our design system so we didn't have to rely too heavily on contributions from other people.

With all that said, I think the convention wasn't _that_ important to us. 

Two things mattered:

1. Our users copy and paste the HTML for a given component.
2. Our attributes should not conflict with what the user would write in their own projects

That's it.

BEM is great, if you love BEM and you work with a bunch of people who love BEM too then keep using it!
But I don't think it plays a huge factor in the success of our design system and for our users.

## Breaking Changes Suck!

UGH! I'M SO SORRY THAT I'VE CAUSED YOU PAIN!

Here's the thing: 

I learned about semantic versioning in 2016.
The TL;DR of this lesson is breaking changes hurt.

> Semver doesn't give you permission to release more breaking changes. - Some blog I read.

We publish our components on internal `npm` and `bower` registries for people to use our stuff.
Our design system as a whole was trying to keep up with huge UI design changes in the Bluemix product so breaking changes were definitely going to happen, especially early on. 

_But why were your users using an unfinished thing?_

Because that's what happened, more on this later...

But yes, we needed the flexibility to rip things out or move things around because we were still working out all the details for how all of this would be consumed. So unfortunately, every time we made a breaking change, some early adopter somewhere in the world was either like:
 
"WTF STAHP!"

or

"I'm gonna update to the next major version...never (winky face)"

Both responses are bad. Do not want! And it's all because breaking changes suck!

## Graceful Deprecation

AKA Breaking Changes Suck! Part 2.

Big changes are inevitable but we don't want to erode the trust we have with out users by releasing major changes everytime we feel like it. Now, we do a lot of work to gracefully deprecate anything we know should be removed eventually.

So I'd like to tell you how it happens with a short story list called, "The Thingy":

1. We make a thingy, but the thingy is bad. Deprecate that thingy. 
2. Release a good (less bad) thingy tomorrow. (Tell people to use that good thingy, duh).
3. Keep that bad thingy around for a year (such graceful deprecation, keep very much trust with userz)
4. Release new major version way later and finally remove that bad thingy because it was bad!
5. Celebrate!



