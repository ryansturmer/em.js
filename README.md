em.js
=====
Javascript shim that fills in as-yet unimplemented text measurement functionality in HTML5 canvas.

What's this about
-----------------
Stop me if you've heard this one.  There is __actually no way__ to determine the height of rendered text in the HTML5 canvas API.  The proposed behavior of the [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) API looks promising, but at the time of this writing is almost completely unsupported in almost every browser.

How to use
----------
em.js is just a shim that replaces the `measureText` method on the HTML5 canvas 2D drawing context with one that actually implements some of the proposed metrics.  To use it, simply include em.js in your web project before you make any calls to `measureText.`  You can then [use measureText as you would normally](http://www.w3schools.com/tags/canvas_measuretext.asp) but get more of the promised metrics from the standard.  As always, your mileage may vary.

References
----------
This was mainly inspired by [this answer](http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas/9847841#9847841) on stack overflow, which details a method of essentially setting up tht text and rendering it, and using CSS to determine the various text metrics.

 * https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics
 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
 * http://stackoverflow.com/questions/1134586/how-can-you-find-the-height-of-text-on-an-html-canvas/9847841#9847841

Footnote
--------
This is by a wide margin, the most boring thing I've ever written.  It hurts me even to document it, but this is one of those rare instances when I did a quick search for this function, and didn't find _any_ canned solution for it, so I feel some obligation to post it online.  I hope that you find it useful.
