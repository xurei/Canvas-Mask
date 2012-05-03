Canvas Mask Utility
===============

Use HTML5 Canvas to apply an alpha mask to an image element.
Compatible with any browser supporting Canvas.
This version is a fork of its original version from benbarnett. It can be found here :
https://github.com/benbarnett/Canvas-Mask

This extended version adds positioning of the mask on the image.

Tested with Chrome 11 and Firefox 3.6+

Demo
-----------------
Simple animation demo can be found here: http://playground.benbarnett.net/canvas-mask/

Note that this demo is based on the original version and not this one.


What it does
-----------------

The function will use HTML5 Canvas to read alpha data from a PNG-24, and apply this to any image element. I have often used this technique to take advantage of the smaller file sizes with JPEG, and then a 2 colour PNG-24 to apply the transparency. 

Example images:

JPEG Image:
http://playground.benbarnett.net/canvas-mask/img/octagon.jpg

PNG-24 Mask:
http://playground.benbarnett.net/canvas-mask/img/alpha.png

Usage
-----------------

Simply pass in two image elements (pre-loaded, as shown on demo), the width and the height and you're done.

By default the function will return Canvas pixel data which you can then use to draw on to a Canvas. For example:

output.putImageData(
	applyCanvasMask(BASE IMAGE, MASK IMAGE, x,y, width, height), 0, 0, 0, 0, width, height
);

The x and y arguments are the translation of the mask on the image.

Alternatively, you can specify a 7th parameter to have the function return the masked image as a Base64 encoded data URL. This is useful for applying to background images. For example:

$('body').css({
	'background-image': 'url(' + applyCanvasMask(BASE IMAGE, MASK IMAGE, x,y, width, height, true) + ')'
});


Changelog
-----------------

0.1 (02/06/2011):

* Initial release.


Credits
-----------------

* Author : Olivier Bourdoux - http://www.xurei-design.be - @xurei
* Author of the original version: Ben Barnett - http://www.benbarnett.net - @benpbarnett
* Jake Archibald for originally demonstrating this type of pixel manipulation - http://jakearchibald.com/scratch/alphavid/ - @jaffathecake