/**
 *	F3D Example
 *	3 Halibierte Würfel
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	An example of creating very simple 3D objects
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
var f = frederickkPaper;
var f3d = f.F3D;
var fshape = f.FShape;

var scene = new f3d.FScene3D();


// values
var bRotate = false;
var values = {
	rotx:	45,
	roty:	35.3,
	rotz:	-30
};



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {

	// required setup scene
	scene.setup(view.bounds.width, view.bounds.height, 1000, 'ORTHO');


	// FBillBox
	// http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
	var size;
	if(view.bounds.width < 768) size = 300;
	else size = 600;

	var billRed = new frederickkPaper.FShape.FBillBox(scene);
	billRed.setWHD(size, size, size);
	billRed.red();
	billRed.init(size,-size,0);

	var billYellow = new frederickkPaper.FShape.FBillBox(scene);
	billYellow.setWHD(size, size, size);
	billYellow.yellow();
	billYellow.init(-size,size,0);

	var billBlue = new frederickkPaper.FShape.FBillBox(scene);
	billBlue.setWHD(size, size, size);
	billBlue.blue();
	billBlue.init(-size,-size,0);


	// var billGreen = new frederickkPaper.FShape.FBillBox(scene);
	// billGreen.setWHD(size, size, size);
	// billGreen.fillColor = new paper.RGBColor(0.62, 0.77, 0.14);
	// billGreen.setVertices( [9,17,7] );
	// billGreen.init(-(size*3),size,0);


};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	if(bRotate) {
		values.rotx = 720.0 * ( (Math.sin(event.time * 2) + 1) / 30 );
		values.roty = 720.0 * ( (Math.cos(event.time * 2) + 1) / 30 );
		values.rotz++;

		Draw();
	}
};



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Draw() {
	// rotate
	scene.rotateX( f.radians(values.rotx) );
	scene.rotateY( f.radians(values.roty) );
	scene.rotateZ( f.radians(values.rotz) );

	// draw to screen
	scene.draw().scale(1);

};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function reset() {
	values.rotx = 45;
	values.roty = 35.3;
	values.rotz = -30;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;

	reset();
	Draw();
};

// ------------------------------------------------------------------------
function onMouseUp(event) {
};

function onMouseDown(event) {
};

function onMouseMove(event) {
};

function onMouseDrag(event) {
	values.rotx = event.point.y;
	values.roty = event.point.x;
	values.rotz = event.point.x - event.point.y;

	// redraw to update scene
	Draw();
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
	if(event.key == 'space') {
		bRotate = !bRotate;
		values.rotx += 1;
		values.roty += 1;
		values.rotz += 1;
	}
	if(event.key == 'r') {
		reset();
	}

	// redraw to update scene
	Draw();
};

function onKeyUp(event) {
};






