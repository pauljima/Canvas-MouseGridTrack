var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
	cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.msCancelAnimationFrame,

	canvasGrid = document.getElementById("canvasGrid"),
	canvasLines = document.getElementById("canvasLines"),
	ctxGrid = canvasGrid.getContext("2d"),
	ctxLines = canvasLines.getContext("2d"),

	canvasWidth = canvasGrid.width,
	canvasHeight = canvasGrid.height,

	gridDot = 1,
	gridSquare = 100,
	maxDist = 500,
	gridArr = [],

	mouseX = 0,
	mouseY = 0;


window.addEventListener("load", init, false);

function init(evt) {
	initGrid();

	canvasLines.addEventListener("mousemove", mouseTracker, false);
}

function initGrid() {
	for (var i = 0; i < canvasWidth; i += gridSquare) {		// Columns
		for (var j = 0; j < canvasHeight; j += gridSquare) {	// Rows
			// Draw dot grid
			ctxGrid.fillStyle = "#ccc";
			ctxGrid.fillRect(i, j, gridDot, gridDot);

			// Create array of points
			gridArr.push({x:i+(gridDot/2), y:j+(gridDot/2)});
		}
	}
}

function mouseTracker(evt) {
	mouseX = evt.pageX - canvasGrid.offsetLeft;
	mouseY = evt.pageY - canvasGrid.offsetTop;

	drawLines(mouseX, mouseY);

	// console.log(mouseX + "x" + mouseY);
}

function drawLines(x, y) {

	// Draw lines to mouse
	ctxLines.save();
	ctxLines.clearRect(0, 0, canvasWidth, canvasHeight);

	for (var i = 0; i < gridArr.length; i++) {

		ctxLines.beginPath();
		ctxLines.strokeStyle = "rgba(0,0,0,0.25)";

		/*
		 * Calculate distance (pythagorean theorem):
		 * x1 - x2 = distX
		 * y1 - y2 = distY
		 * distX^2 + distY^2 = distance^2
		 */
		distX = Math.sqrt((gridArr[i].x - x) * (gridArr[i].x - x));
		distY = Math.sqrt((gridArr[i].y - y) * (gridArr[i].y - y));
		dist = distX + distY;
		lineOpacity = 1 - (dist/maxDist);

		// Determine line alpha
		if (lineOpacity <= 0) {
			ctxLines.globalAlpha = 0;
		} else {
			ctxLines.globalAlpha = lineOpacity;
		}

		// Draw line
		ctxLines.moveTo(gridArr[i].x, gridArr[i].y);
		ctxLines.lineTo(x, y);
		ctxLines.stroke();
	}

	ctxLines.restore();
}