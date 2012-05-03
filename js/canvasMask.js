/*
Canvas Mask Utility v0.2
Use HTML5 Canvas to apply an alpha mask to an image element.

This code is base on the work of Ben Barnett : 
https://github.com/benbarnett/Canvas-Mask
---
https://github.com/xurei/Canvas-Mask
http://www.xurei-design.be
@xurei
---
Copyright (c) 2012 Olivier Bourdoux

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---

*/

/**
	@private
	@name applyCanvasMask
	@function
	@description Use Canvas to apply an Alpha Mask to an <img>. Preload images first.
	@param {object} [image] The <img> to apply the mask
	@param {object} [mask] The <img> containing the PNG-24 mask image
	@param {int} [offsetX] The translation of the mask (X value)
	@param {int} [offsetY] The translation of the mask (Y value)
	@param {int} [width] The width of the image (should be the same as the mask)
	@param {int} [height] The height of the image (should be the same as the mask)
	@param {boolean} [asBase64] Option to return the image as Base64
*/
function applyCanvasMask(image, mask, offsetX, offsetY, width, height, asBase64) {
	// check we have Canvas, and return the unmasked image if not
	if (!document.createElement('canvas').getContext) return image;
	
	var bufferCanvas = document.createElement('canvas'),
		buffer = bufferCanvas.getContext('2d'),
		outputCanvas = document.createElement('canvas'),
		output = outputCanvas.getContext('2d'),
		
		contents = null,
		imageData = null,
		alphaData = null;
		
	// set sizes to ensure all pixels are drawn to Canvas
	bufferCanvas.width = width;
	bufferCanvas.height = height * 2;
	outputCanvas.width = width;
	outputCanvas.height = height;
		
	// draw the base image
	buffer.drawImage(image, 0, 0);
	
	// draw the mask directly below
	buffer.drawImage(mask, 0, height);

	// grab the pixel data for base image
	contents = buffer.getImageData(0, 0, width, height);
	
	// store pixel data array seperately so we can manipulate
	imageData = contents.data;
	
	// store mask data
	alphaData = buffer.getImageData(0, height, width, height).data;
	
	var offset = y*width + x
	
	len = imageData.length;
		
	//loop through alpha mask and make it null (the real values will be set after)
	for (var i = 3; i < len; i += 4) {
		imageData[i] = 0;
	}
	
	var maskW = mask.width;
	var maskH = mask.height;
	// loop through alpha mask and apply alpha values to base image
		for (var y=0; y < maskH; ++y) 
		{
			for (var x=0; x < maskW; ++x)
			{
				if (x+offsetX >= width)
					break;
				if (x+offsetX >= 0)
				{
					var i = ( (y+offsetY)*width + (x+offsetX)  )*4 + 3
					var j = ( (y)        *width + (x)          )*4 + 3
					imageData[i] = alphaData[j];
				}
			}
		}

	// return the pixel data with alpha values applied
	if (asBase64) {
		output.clearRect(0, 0, width, height);
		output.putImageData(contents, 0, 0);
		
		return outputCanvas.toDataURL();
	}
	else {
		return contents;	
	}
}