console.log( 'FTime Example Loaded' );
/**
 *	FTime Example 0.0
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	
 *	Date & Time & Stopwatch
 *
 */


// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// the FTime namespace
var ftime = f.FTime;

// Date & Time
var fdate;
var dateText;

// Stopwatch timer
var fstopwatch;
var stopwatchText;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// initiate FDate
	fdate = new ftime.FDate();
	// this is how we'll display the date
	dateText = new PointText( new Point(view.bounds.width * 0.33, view.bounds.center.y) );
	dateText.justification = 'left';
	dateText.characterStyle = { 
		font: 'Helvetica',
		fontSize: 73,
		fillColor: 'black'
	};


	// initiate FStopwatch
	fstopwatch = new ftime.FStopwatch();

	// this is how we'll display stopwatch time
	stopwatchText = new PointText( new Point(view.bounds.width * 0.66, view.bounds.center.y) );
	stopwatchText.justification = 'right';
	stopwatchText.characterStyle = { 
		font: 'Helvetica',
		fontSize: 72,
		fillColor: 'black'
	};

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
	// reinitiate FDate to keep the time up-to-date
	fdate = new ftime.FDate();

	// a temp holder to convert our stopwatch time
	var temp = new ftime.FDate();
	// show the time of our stopwatch
	stopwatchText.content = temp.get( fstopwatch.get() );

	// redraw to update scene
	Draw();
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	// show the date
	dateText.content = fdate.year() + ' ' + fdate.month() + ' ' + fdate.day() + '\r'; 
	// show the time
	dateText.content += fdate.now();
};




// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------




// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
	// start/stop the stopwatch by pressing enter
	if(event.key == 'enter') {
		fstopwatch.toggle();
	}
};

// ------------------------------------------------------------------------
function onKeyUp(event) {
};
