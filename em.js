// Copy off the old measurement function (we'll need it)
CanvasRenderingContext2D.prototype._measureText = CanvasRenderingContext2D.prototype.measureText;

// This was inspired by StackOverflow answer:
// http://stackoverflow.com/questions/11452022/measure-text-height-on-an-html5-canvas-element
CanvasRenderingContext2D.prototype.measureText = function(text) {
	metrics = this._measureText(text);

	var textSpan = document.createElement('span');
	textSpan.innerHTML = text;
	textSpan.style.font = this.font;
	
	var block = document.createElement("div");
	block.style.display = 'inline-block';
	block.style.width = '1px';
	block.style.height = '0px';

	var div = document.createElement('div');
	div.appendChild(textSpan);
	div.appendChild(block);

	var body = document.body;
	body.appendChild(div);

	var ascent = -1;
	var descent = -1;
	var height = -1;

	try {
		block.style['vertical-align'] = 'baseline';
		ascent = block.offsetTop - textSpan.offsetTop;
		block.style['vertical-align'] = 'bottom';
		height = block.offsetTop - textSpan.offsetTop;
		descent = height - ascent;
	} finally {
		document.body.removeChild(div);
	}

	var new_metrics = {};

	// TODO This doesn't account for locale, and is guaranteed broken for those that read right-to-left
	switch(this.textAlign) {
		case "start":
		case "left":
			new_metrics.actualBoundingBoxLeft = 0;
			new_metrics.actualBoundingBoxRight = metrics.width;
			break;

		case "end":
		case "right":
			new_metrics.actualBoundingBoxLeft = -metrics.width;
			new_metrics.actualBoundingBoxRight = 0;
			break;

		case "center":
			// TODO This is probably just an approximation.
			new_metrics.actualBoundingBoxLeft = -metrics.width/2.0;
			new_metrics.actualBoundingBoxRight = metrics.width/2.0;
			break;
	}
	new_metrics.actualBoundingBoxAscent = ascent;
	new_metrics.actualBoundingBoxDescent = descent;
	new_metrics.height = height;

	// Copy the new metrics over, if and only if the CanvasRenderingContext2D API doesn't provide them
	for(var key in new_metrics) {
		if (new_metrics.hasOwnProperty(key) && !(key in metrics)) {
			metrics[key] = new_metrics[key];
		}
	}

	return metrics;
};
