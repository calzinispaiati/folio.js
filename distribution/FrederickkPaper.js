/**
 *	
 *	Frederickk.js
 *	v0.1
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *	
 *	
 *	A collection of methods/functions that i find useful
 *	specifically for application within PaperJs (http://paperjs.org/) 
 *	most of which are based on my Frederickk library for Processing
 *	(http://github.com/frederickk/frederickk)
 *
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *	
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *	
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *	
 */



// ------------------------------------------------------------------------
/**
 *
 *	REQUIRED LIBRARIES!
 *
 *	PaperJs @ http://paperjs.org/
 *	JQuery @  http://jquery.com/download/
 *
 */



// ------------------------------------------------------------------------
var Frederickk = Frederickk || {};



(function() {
	console.log('\nFrederickkPaper.js');
	console.log('v.0.1a');
	console.log('ken.frederick@gmx.de');
	console.log('------------------------------------\n');
})();


/**
 *  
 *	Core.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	Core Methods
 *
 *	A collection mathematical operations, similar
 *	to those found in Processing
 *
 */
Frederickk = {
 	// Namespaces
 	//FControl: {}, 
 	FIO: {},
 	F3D: {},
 	FShape: {},
 	//FTime: {},



	// Properties



	// Methods
	random : function(minr, maxr) {
		if(maxr === undefined) {
			maxr = minr;
			minr = 0;
		}
		return (minr + Math.random() * (maxr - minr));
	},
	randomInt : function(minr, maxr) {
		return parseInt( random(minr,maxr) );
	},

	/*
	 *
	 *	http://www.siafoo.net/snippet/191
	 *
	 *	Returns a number between v1 and v2, including v1 but not v2.
	 *	The bias represents the preference towards lower or higher numbers,
	 *	as a number between 0.0 and 1.0. For example: 
	 *	random(0, 10, bias=0.9) will return 9 much more often than 1.
	 *
	 */
	randomBias : function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},



	// ------------------------------------------------------------------------
	clamp : function(val,min,max) {
		return val < min ? min:val > max ? min:val;
	},
	norm : function(val,start,stop) {
		return (val - start) / (stop - start);
	},

	map : function(value, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
	},



	// ------------------------------------------------------------------------
	roundDecimal : function(orig, deci) {
		var multi = Math.pow(10,deci);
		return Math.round(orig * multi)/multi;
	},


	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 */
	snap : function(value, gridSize, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return gridSize * roundFunction(value / gridSize);
	},



	/*
	 *
	 * @param amt
	 *			float: between 0.0 and 1.0
	 *
	 */
	lerp : function(start, stop, amt) {
		return start + (stop-start) * amt;
	},



	// ------------------------------------------------------------------------
	degrees : function(val) {
		return val * (180/Math.PI);
	},
	radians : function(val) {
		return val * (Math.PI/180);
	},
	getAngle : function(point) {
		var angle = Math.atan2(point.y - 0, point.x - 0);
		return angle;
	},



	// ------------------------------------------------------------------------
	boolToInt : function(val) {
		return (val) ? 1:0;
	},



	// ------------------------------------------------------------------------
	getType : function(object) {
		if (object instanceof paper.Tracing) return 'Tracing';
		else if (object instanceof paper.TextItem) return 'TextItem';
		else if (object instanceof paper.Raster) return 'Raster';
		else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
		else if (object instanceof paper.PlacedFile) return 'PlacedFile';
		else if (object instanceof paper.Path) return 'Path';
		else if (object instanceof paper.CompoundPath) return 'CompoundPath';
		else if (object instanceof paper.Group) return 'Group';
		else return 'undefined'
	},

	findByName : function(items, name) {
		var path;
		for(var i=0; i<items.length; i++) {
			var item = items[i];		
			if(item.name == name) path = item; // break;
		}
		return path;
	},




	// ------------------------------------------------------------------------
	// Strings
	// ------------------------------------------------------------------------
	trimToFit : function(textObj) {
		var visibleContent = textObj.visibleRange.content;
		textObj.content = trim(visibleContent);
		return textObj;
	},

	rtrim : function(str) {
		for (var i=str.length-1; str.charAt(i) ==' '; i--) {
			str = str.substring(0, i);
		}
		return str;
	},
	trim : function(str) {
		str = str.replace(/(^\s*)|(\s*$)/gi,"");
		str = str.replace(/[ ]{2,}/gi," ");
		str = str.replace(/\n /,"\n");
		return str;
	},

	strToBool : function(str){
		switch(str.toLowerCase()){
			case "true": case "yes": case "1": return true;
			case "false": case "no": case "0": case null: return false;
			default: return Boolean(str);
		}
	},


	// ------------------------------------------------------------------------
	// Arrays
	// ------------------------------------------------------------------------
	merge : function(arr1, arr2) {
		var output = arr1.concat(arr2);
		output.shuffle();
		return output;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://www.brain4.de/programmierecke/js/arraySort.php
	 *
	 */
	alphabetical : function(a, b) {
		/*
		var A = a.toLowerCase();
		var B = b.toLowerCase();

		if (A < B) return -1;
		else if (A > B) return  1;
		else return 0;
		*/

		a = a.toLowerCase();
		a = a.replace(/ä/g,'a');
		a = a.replace(/ö/g,'o');
		a = a.replace(/ü/g,'u');
		a = a.replace(/ß/g,'s');

		b = b.toLowerCase();
		b = b.replace(/ä/g,'a');
		b = b.replace(/ö/g,'o');
		b = b.replace(/ü/g,'u');
		b = b.replace(/ß/g,'s');

		return(a == b) ? 0:(a>b) ? 1:-1;
	}

};



/*
 *
 *	Arrays
 *
 *
 */
Array.prototype.max = function() {
	var max = this[0];
	var len = this.length;
	//for(var i=1; i<len; i++) if(this[i] > max) max = this[i];
	for(var i=1; i<len; i++) if(this[i] > max) max = i;
	return max;
};
Array.prototype.min = function() {
	var min = this[0];
	var len = this.length;
	//for (var i=1; i<len; i++) if(this[i] < min) min = this[i];
	for (var i=1; i<len; i++) if(this[i] < min) min = i;
	return min;
};

/**
 *
 *	http://jsfromhell.com/array/shuffle
 *	http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 */
Array.prototype.shuffle = function() {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};



/*
 *
 *	paper.Item
 *
 */
paper.Item.prototype.snapGrid = function(spacing) {
	this.position.snapGrid(spacing);
};
paper.Item.prototype.snapIso = function(scale) {
	this.position.snapIso(scale);
};




/**
 *  
 *	FColor.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FColor
 *
 *	Expands paper.Color some of these may be redundant to
 *	the paperjs api, that's due to the legacy of the library's
 *	initially creation for use in Scriptographer.
 *
 */

Frederickk.FColor = function() {
	// Properties



	// Methods
	// private
	var componentToHex = function(col) {
		var hex = c.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	};


	// public
	this.lerpCMYKColor = function(c1,c2, amt) {
		var c = Frederickk.lerp(c1.cyan,		c2.cyan,		amt);
		var m = Frederickk.lerp(c1.magenta,		c2.magenta,		amt);
		var y = Frederickk.lerp(c1.yellow,		c2.yellow,		amt);
		var k = Frederickk.lerp(c1.black,		c2.black,		amt);
		
		var col = new paper.CMYKColor(c,m,y,k);
		return col;
	};
	this.lerpRGBColor = function(c1,c2, amt) {
		var r = Frederickk.lerp(c1.red,		c2.red,		amt);
		var g = Frederickk.lerp(c1.green,	c2.green,	amt);
		var b = Frederickk.lerp(c1.blue,	c2.blue,	amt);
		
		var col = new paper.RGBColor(r,g,b);
		return col;
	};
	this.randomRGBColor = function() {
		return new paper.RGBColor( Math.random(),Math.random(),Math.random() );
	};
	this.randomCMYKColor = function() {
		return new paper.CMYKColor( Math.random(),Math.random(),Math.random(),Math.random() );
	};
	this.randomGrayColor = function() {
		return new paper.GrayColor( Math.random() );
	};
	this.random = function() {
		return this.randomRGBColor();
	};

	// ------------------------------------------------------------------------
	this.ColorToInt = function(col) {
		var rgbInt;
		try {
			rgbInt = col.red;
			rgbInt = rgbInt << 8;
			rgbInt |= col.green;
			rgbInt = rgbInt << 8;
			rgbInt |= col.blue;
		}
		catch(err) {
			console.log( err );
			rgbInt = 16777215; // on error return white
		}
		return rgbInt;
	};
	this.IntToColor = function(RGBint) {
		var r = (RGB>> 16) & 255;
		var g = (RGB>> 8) & 255;
		var b = RGB& 255;
		return new paper.RGBColor( (r/255), (g/255), (b/255) );
	};

	// ------------------------------------------------------------------------
	/*
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@param col
	 *			value as paper.RGBColor()
	 *
	 *	@return str
	 *			hex value of input color as string
	 *
	 */
	this.ColorToHex = function(col) {
		var r, g, b;
		var str = '';
		try {
			r = col.red*255;
			g = col.green*255;
			b = col.blue*255;
			str = '#'+ componentToHex(r) + componentToHex(g) + componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	};
	this.HexToColor = function(hex) {
		// var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		// var r = parseInt(result[1], 16);
		// var g = parseInt(result[2], 16);
		// var b = parseInt(result[3], 16);

		var big= parseInt(hex, 16);
		var r = (big>> 16) & 255;
		var g = (big>> 8) & 255;
		var b = big& 255;

		return new paper.RGBColor(r,g,b);
	};


	// ------------------------------------------------------------------------
	/*
	 *
	 *	http://www.easyrgb.com/math.html
	 *
	 *	@param h
	 *			0.0 - 1.0
	 *	@param s
	 *			0.0 - 1.0
	 *	@param v
	 *			0.0 - 1.0
	 *
	 *	@return
	 *		new paper.RGBColor object (values = 0.0 - 1.0)
	 *
	 */
	this.HSVtoColor = function(h, s, v) {
		var r, g, b;
		var RGB = new paper.RGBColor(Math.round(v), Math.round(v), Math.round(v));
		if(s!=0) { 
			// h must be < 1
			var var_h = h * 6;
			if (var_h==6) var_h = 0;
			var var_i = Math.floor( var_h );
			var var_1 = v*(1-s);
			var var_2 = v*(1-s*(var_h-var_i));
			var var_3 = v*(1-s*(1-(var_h-var_i)));
			if(var_i==0) { 
				var_r = v; 
				var_g = var_3; 
				var_b = var_1;
			}
			else if(var_i==1) { 
				var_r = var_2;
				var_g = v;
				var_b = var_1;
			}
			else if(var_i==2) { 
				var_r = var_1;
				var_g = v;
				var_b = var_3
			}
			else if(var_i==3) { 
				var_r = var_1;
				var_g = var_2;
				var_b = v;
			}
			else if (var_i==4) { 
				var_r = var_3;
				var_g = var_1;
				var_b = v;
			}
			else { 
				var_r = v;
				var_g = var_1;
				var_b = var_2
			}
			RGB.red = Math.round(var_r);
			RGB.green = Math.round(var_g);
			RGB.blue = Math.round(var_b);
		}
		return RGB;
	};

};

paper.Color.prototype.darken = function(pct) {
	this.red -= pct;
	this.green -= pct;
	this.blue -= pct;
	return this;
};
paper.Color.prototype.lighten = function(pct) {
	this.red += pct;
	this.green += pct;
	this.blue += pct;
	return this;
};


/**
 *  
 *	FConversions.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FConversions
 *
 *	A collection of helpful conversion ratios
 *
 */
Frederickk.FConversions = function() {
	// conversions
	this.ptToMm = 0.352777778;
	this.mmToPt = 2.83464567;

	this.ptToCm = 0.0352777778;
	this.CmToPt = 28.3464567;

	this.ptToIn = 0.0138888889;
	this.inToPt = 72;

	this.ptToPi = 0.0833333333;
	this.piToPt = 12;

};


/**
 *  
 *	FFade.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FFade
 *
 */
Frederickk.FFade = function() {
	// Properties
	// private
	var fadeMillis = 1000; // set to default of 1s OR 1000ms
	
	var timeStartFade = 0.0;
	var timeEndFade = 0.0;
	
	var bBeginFade = false;
	var bFadeIn = false;
	var bFadeOut = false;

	// public
	this.alpha = 1.0;


	
	// Methods
	this.update = function() {
		_currentTime = new Date().getMilliseconds();
		this.update(_currentTime);
	};
	this.update = function(currentTime) {
		if(bBeginFade) {
			bBeginFade = false;
			timeStartFade = currentTime;
			if(bFadeIn) {
				timeEndFade = currentTime + parseFloat((1.0 - this.alpha) * fadeMillis);
			}
			else {
				timeEndFade = currentTime + parseFloat(this.alpha*fadeMillis);
			}
			if(timeEndFade == currentTime) {
				if(bFadeIn) {
					bFadeIn = false;
					this.alpha = 1.0;
				}
				else {
					bFadeOut = false;
					this.alpha = 0.0;
				}
			}
		}
		if(bFadeIn) {
			this.alpha = 1.0 - parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 1.0;
			}
		}
		else if(bFadeOut) {
			this.alpha = parseFloat((timeEndFade - currentTime) / fadeMillis);
			if(currentTime > timeEndFade) {
				bFadeIn = false;
				this.alpha = 0.0;
			}
		}
	};

	this.fadeIn = function() {
		if(bFadeIn)return;
		if(this.alpha == 1.0) return;
		bBeginFade = true;
		bFadeIn = true;
		bFadeOut = false;
	};
	this.fadeOut = function() {
		if(bFadeOut)return;
		if(this.alpha == 0.0) return;
		bBeginFade = true;
		bFadeOut = true;
		bFadeIn = false;
	};

	this.isFadingIn = function() {
		return bFadeIn;
	};
	this.isFadingOut = function() {
		return bFadeOut;
	};
	this.stopFade = function() {
		bBeginFade = bFadeIn = bFadeOut = false;
	};



	// sets
	/**
	 *	@param _seconds
	 *			length of fade in seconds 
	 */
	this.setFadeSeconds = function(_seconds) {
		setFadeMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds 
	 */
	this.setFadeMillis = function(_millis) {
		fadeMillis = _millis;
	};

};


/**
 *  
 *	FPoint.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	FPoint
 *
 */
Frederickk.FPoint = paper.Point.extend({
	norm : function(startPt, stopPt) {
		this.x = Frederickk.norm(this.x, start.x, stop.x);
		this.y = Frederickk.norm(this.y, start.y, stop.y);
		return this;
	},

	random : function() {
		this.x = Frederickk.random(0, view.bounds.width);
		this.y = Frederickk.random(0, view.bounds.height);
		return this;
	},

	heading : function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *
	 */
	interpolateTo : function(v2, f) {
		this.x += ((v2.x - this.x) * f);
		this.y += ((v2.y - this.y) * f);
		return this;
	},


	// ------------------------------------------------------------------------
	limit : function(lim) {
		if (this.magSq() > lim * lim) {
			this.normalize();
			this.mult * lim;
			return this;
		}
		return this;
	},

	// ------------------------------------------------------------------------
	magSq : function() {
		return this.x * this.x + this.y * this.y;
	},

	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param spacing
	 *				paper.Size()
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid : function(spacing) {
		var ix, iy;
		ix = Math.round(this.y/spacing.height - this.x/spacing.width);
		iy = Math.round(this.y/spacing.height + this.x/spacing.width);

		this.x = (iy - ix)/2*spacing.width;
		this.y = (iy + ix)/2*spacing.height;
		return this;
	},
	snapIso : function(scale) {
		if(scale === null) scale = 1;
		return this.snapGrid( new Size(32*scale,16*scale) );
	}

});


/**
 *  
 *	FIO.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FIO
 *
 *	A collection of I/O methods;
 *
 */
Frederickk.FIO = {
	/**
	 *
	 *	Jürg Lehni
	 *	http://scriptographer.org/forum/help/save-array-data-to-external-file/?pos=0#Post-3279
	 *
	 */
	saveFile : function(str, fname) {
		var file = new File(fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	},
	openFile : function(fname) {
		var file = new File(script.file.parent, fname);
		file.open();
		var data = Json.decode( file.readAll() );
		file.close();
		
		return data;
	},
	deleteFile : function(fname) {
		var file = new File(fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	},
	checkFile : function(fname) {
		var file = new File(fname);
		if (file.exists()) return true;
		else return false
	},

	/**
	 *
	 *	http://www.quirksmode.org/js/cookies.html
	 *
	 */
	saveCookie : function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	},

	openCookie : function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	deleteCookie : function(name) {
		Frederickk.FIO.saveCookie(name, '', -1);
	}

};


/**
 *  
 *	FStopwatch.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FStopwatch
 *
 *	A simple stopwatch
 *
 */
Frederickk.FStopwatch = function() {
	// Properties
	// private
	var now;
	var then;
	var timeInMs = 0;
	var bStart = 0;



	// Methods
	this.toggle = function() {
		if (bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	this.start = function() {
		// start
		bStart = 1;
		then = new Date();
		then.setTime(then.getTime() - timeInMs);
	};

	this.pause = function() {
		// pause
		bStart = 0;
		now = new Date();
		timeInMs = now.getTime() - then.getTime();
	};

	this.reset = function() {
		bStart = 0;
		timeInMs = 0;
	};


	// Sets
	this.set = function(ms, run) {
		timeInMs = ms;
		(run == true) ? bStart = 0 : bStart = 1;

		then = new Date();
		then.setTime(then.getTime() - timeInMs);
		this.toggle();
	};


	// Gets
	this.get = function() {
		if (bStart == 1)  {
			now = new Date();
			timeInMs = now.getTime() - then.getTime();
		}
		return timeInMs;
	};

	this.isRunning = function() {
		return (bStart) ? true : false;
	};

};


/**
 *  
 *	FTime.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FTime
 *
 */
Frederickk.FTime = function() {
	// Properties
	// public
	this.date;



	// Methods
	// private
	var addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};


	// public
	/**
	 *	@return hour
	 *			return the current hour as string 'HH'
	 */
	this.hour = function() {
		if(this.date === undefined) this.date = new Date();
		var hour = String( this.date.getHours() ); 
		hour = addZero(hour);
		return hour;
	};
	/**
	 *	@return minute
	 *			return the current minute as string 'mm'
	 */
	this.minute = function() {
		if(this.date === undefined) this.date = new Date();
		var minute = String( this.date.getMinutes() ); 
		minute = addZero(minute);
		return minute;
	};
	/**
	 *	@return second
	 *			return the current second as string 'ss'
	 */
	this.second = function() {
		if(this.date === undefined) this.date = new  Date();
		var second = String( this.date.getSeconds() ); 
		second = addZero(second);
		return second;
	};

	/**
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return the current time
	 */
	this.now = function(format) {
		var disp = [];
		if( format === undefined ) disp = [true, true, true];
		else disp = format;

		var str = '';
		if(disp[0]) str += this.hour();
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += this.minute();
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += this.second();
		return str;
	};

	this.nowMilliseconds = function() {
		return this.toMillsecond(
			this.hour(),
			this.minute(),
			this.second()
		);
	};

	/**
	 *	add to time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.add = function(_d, _h, _m, _s) {
		return this.date + (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};

	/**
	 *	sub from time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.sub = function(_d, _h, _m, _s) {
		return this.date - (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};


 
	// sets
	/**
	 *	set to a specific time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.set = function(_d, _h, _m, _s) {
		this.time = new Date();
		this.time.setTime( (24 * _d + 60 * _h + 60 * _m + 1000 * s) );
		return this.time;
	};



	// gets
	/**
	 *	@param ms
	 *			input as milliseconds
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return human readable default is hh:mm:ss
	 */
	this.get = function(ms, format) {
		var disp;
		if( format === undefined ) disp = new Array(true, true, true);
		else disp = format;

		var seconds = parseInt( (ms / 1000) % 60 );
		var minutes = parseInt( ((ms / 1000) / 60) % 60 );
		var hours   = parseInt( (((ms / 1000) / 60) / 60) % 24 );

		var hh, mm, ss;
		if(hours < 10) hh = '0' + hours;
		else hh =  '' + hours;
		if(minutes < 10) mm = '0' + minutes;
		else mm =  '' + minutes;
		if(seconds < 10) ss = '0' + seconds;
		else ss =  '' + seconds;

		var str = '';
		if(disp[0]) str += hh;
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += mm;
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += ss;
		return str;
	};

	/**
	 *	@param h
	 *			input as hours OR input string as hh:mm:ss OR mm:ss
	 *	@param m
	 *			input as minutes
	 *	@param s
	 *			input as seconds
	 *
	 *	@return time in milliseconds
	 */
	this.toMillsecond = function(_h, _m, _s) {
		var h,m,s;
		if(_m === undefined && _s === undefined) {
			h = this.toArray(_h)[0];
			m = this.toArray(_h)[1];
			s = this.toArray(_h)[2];
		}
		else {
			h = _h;
			m = _m;
			s = _s;
		}
		return parseInt(3600000 * h + 60000 * m + 1000 * s);
	};

	/**
	 *	@param strHMS
	 *			input string as hh:mm:ss
	 *
	 *	@return array of time [0] hours [1] minutes [2] seconds
	 */
	this.toArray = function(strHMS) {
		var temp = strHMS.split(':');
		return [ temp[0], temp[1], temp[2] ];
	};


};


/**
 *  
 *	FPath3.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *
 *	3D Path Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	TODO: maek FPath3 an extension of paper.Item
Frederickk.F3D.FPath3 = Item.extend({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------


});
*/
Frederickk.F3D.FPath3 = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public

	// temporary until I figure out how
	// to extend paper.Item properly
	this.path;

	this.name = '';
	this.closed = false;

	this.opacity = 1.0;
	this.blendMode = 'normal';
	this.visible = true;
	this.selected = false;

	this.fillColor;

	this.strokeColor;
	this.strokeWidth = 1;
	this.strokeCap;
	this.strokeJoin;

	this.rotation = new Frederickk.F3D.FPoint3();
	this.translation = new Frederickk.F3D.FPoint3();


	// private
	var scene = _scene;

	var points3 = [];

	var matrix = new Matrix3D();

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;

	var translationX = 0;
	var translationY = 0;
	var translationZ = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@return path
	 *			projected 2D path
	 */
	this.draw = function() {
		var path = new paper.Path();
		path.name = this.name;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			path.add( new paper.Point( pt3.x2D(), pt3.y2D() ) );
		}

		// ! temporary see above !
		path.opacity = this.opacity;
		path.blendMode = this.blendMode;
		path.visible = this.visible;
		path.selected = this.selected;

		path.fillColor = this.fillColor;

		path.strokeColor = this.strokeColor;
		path.strokeWidth = this.strokeWidth;
		path.strokeCap = this.strokeCap;
		path.strokeJoin = this.strokeJoin;

		path.closed = this.closed;

		this.path = path;
		return this.path;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _scene
	 *			scene to associate points with
	 */
	this.addToScene = function(_scene) {
		for(var i=0; i<points3.length; i++) {
			points3[i].setup(_scene);
		}
	};

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	this.add = function(_fpoint3) {
		points3[points3.length] = _fpoint3;
	};


	// ------------------------------------------------------------------------
	this.translate = function(_x, _y, _z) {
		translationX = _x != undefined ? _x : 0;
		translationY = _y != undefined ? _y : 0;
		translationZ = _z != undefined ? _z : 0;

		for(var i=0; i<points3.length; i++) {
			var pt3 = points3[i];
			pt3.setX( (pt3.x() + translationX) );
			pt3.setY( (pt3.y() + translationY) );
			pt3.setZ( (pt3.z() + translationZ) );
		}
	};


	// ------------------------------------------------------------------------
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};


	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.path;
	};


};


/**
 *  
 *	FPoint3.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *
 *	FPoint3
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */

/**
 *	@param x
 *			x coordinate
 *	@param y
 *			y coordinate
 *	@param z
 *			z coordinate
 */
Frederickk.F3D.FPoint3 = function(_x, _y, _z) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	var x = _x != undefined ? _x : 0;
	var y = _y != undefined ? _y : 0;
	var z = _z != undefined ? _z : 0;


	// private
	var scene = null;

	var xIndex = 0;
	var yIndex = 0;
	var zIndex = 0;
	var xIndex2D = 0;
	var yIndex2D = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(_scene) {
		scene = _scene;

		var index = scene.setupPoint(x, y, z);

		var i3 = index*3;
		var i2 = index*2;

		xIndex = i3;
		yIndex = i3+1;
		zIndex = i3+2;

		xIndex2D = i2;
		yIndex2D = i2+1;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setX = function(value) {
		if( scene != null ) scene.points3D[xIndex] = value;
		x = value;
	};
	this.setY = function(value) {
		if( scene != null ) scene.points3D[yIndex] = value;
		y = value;
	};
	this.setZ = function(value) {
		if( scene != null ) scene.points3D[zIndex] = value;
		z = value;
	};

	this.set = function(_x, _y, _z) {
		this.setX(_x);
		this.setY(_y);
		this.setZ(_z);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	Get a copy of this point.
	 */
	this.get = function() {
		return new Frederickk.F3D.FPoint3(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return 3D x
	 */
	this.x = function() {
		return x;
	};
	/**
	 *	@return 3D y
	 */
	this.y = function() {
		return y;
	};
	/**
	 *	@return 3D z
	 */
	this.z = function() {
		return z;
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return scene.points2D[xIndex2D];
	};

	/**
	 *	@return projected 2D y
	 */
	this.y2D = function() {
		return scene.points2D[yIndex2D];
	};


	this.getSceneIndex = function() {
		return sceneIndex;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the magnitude (length) of the point
	 *
	 *	@return the magnitude of the point
	 */
	this.mag = function() {
		return Math.sqrt(x*x + y*y + z*z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Add a point to this point
	 *
	 *	@param _fpoint3
	 *			the point to be added
	 */
	this.add = function(_fpoint3) {
		x += _fpoint3.x();
		y += _fpoint3.y();
		z += _fpoint3.z();
		this.set(x,y,z);
	};
	this.add = function(_x, _y, _z) {
		x += _x;
		y += _y;
		z += _z;
		this.set(x,y,z);

	};


	// ------------------------------------------------------------------------
	/**
	 *	Subtract a point from this point
	 *
	 *	@param _fpoint3
	 *			the point to be subtracted
	 */
	this.sub = function(_fpoint3) {
		x -= _fpoint3.x();
		y -= _fpoint3.y();
		z -= _fpoint3.z();
		this.set(x,y,z);
	};
	this.sub = function(_x, _y, _z) {
		x -= _x;
		y -= _y;
		z -= _z;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scale this point by a scalar
	 *
	 *	@param n
	 *			the value to scale by
	 */
	this.scale = function(n) {
		x *= n;
		y *= n;
		z *= n;
		this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.mult = function(_fpoint3) {
		x *= _fpoint3.x();
		y *= _fpoint3.y();
		z *= _fpoint3.z();
		this.set(x,y,z);
	};
	this.mult = function(_x, _y, _z) {
		x *= _x;
		y *= _y;
		z *= _z;
		// this.set(x,y,z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param _fpoint3
	 *			the point to multiply by
	 */
	this.div = function(_fpoint3) {
		x /= _fpoint3.x();
		y /= _fpoint3.y();
		z /= _fpoint3.z();
		this.set(x,y,z);
	};
	this.div = function(_x, _y, _z) {
		x /= _x;
		y /= _y;
		z /= _z;
		this.set(x,y,z);

	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the Euclidean distance between two points (considering a point as a vector object)
	 *
	 *	@param _fpoint3
	 *			another point
	 *
	 *	@return the Euclidean distance between
	 */
	this.getDistance = function(_fpoint3) {
		var dx = x - _fpoint3.x();
		var dy = y - _fpoint3.y();
		var dz = z - _fpoint3.z();
		return Math.sqrt(dx*dx + dy*dy + dz*dz);
	};


	// ------------------------------------------------------------------------
	/**
	 * Calculate the angle between two points, using the dot product
	 *
	 * @param _fpoint3a
	 *				a point
	 * @param _fpoint3b
	 *				another point
	 *
	 * @return the angle between the points
	 */
	this.angleBetween = function(_fpoint3a, _fpoint3b) {
		var dot = _fpoint3a.x() * _fpoint3b.x() + _fpoint3a.y() * _fpoint3b.y() + _fpoint3a.z() * _fpoint3b.z();
		var _f1mag = Math.sqrt(_fpoint3a.x() * _fpoint3a.x() + _fpoint3a.y() * _fpoint3a.y() + _fpoint3a.z() * _fpoint3a.z());
		var _f2mag = Math.sqrt(_fpoint3b.x() * _fpoint3b.x() + _fpoint3b.y() * _fpoint3b.y() + _fpoint3b.z() * _fpoint3b.z());
		return Math.acos(dot / (_f1mag * _f2mag));
	};


	// ------------------------------------------------------------------------
	/**
   	 *	Normalize the point to length 1 (make it a unit point)
	 */
	this.normalize = function() {
	    var m = this.mag();
	    if (m != 0 && m != 1) {
    	  this.div(m);
	    }
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return '[ ' + x + ', ' + y + ', ' + z + ' ]';
	};


	// ------------------------------------------------------------------------
	/**
	 *	Return a representation of this point as an array.
	 */
	 
	this.array = function() {
		return [x, y, z];
	};

};


/**
 *  
 *	FScene3D.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *  
 *  
 *	3D Scene Class
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code mostly taken from
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 *	modified/expanded for use in PaperJS by Ken Frederick
 *
 */



Frederickk.F3D.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// private
	var group;

	var mode;
	var matrix = new Matrix3D();

	var halfWidth;
	var halfHeight;

	var rotationX = 0;
	var rotationY = 0;
	var rotationZ = 0;
	var sceneScale = 1;

	var focalLength = 0;
	var sceneWidth = 0;
	var sceneHeight = 0;

	var numPoints = 0;

	var items = [];


	// public
	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param _width
	 *				width of scene
 	 *				default: view.bounds.width
	 *	@param _height
	 *				height of scene
 	 *				default: view.bounds.height
	 *	@param _focalLength
	 *				focal length of scene
 	 *				default: 1000
	 *	@param _mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 *
	 */
	this.setup = function(_width, _height, _focalLength, _mode) {
		focalLength = _focalLength || 1000;
		sceneWidth  = _width || paper.view.bounds.width;
		sceneHeight = _height || paper.view.bounds.height;

		halfWidth = sceneWidth*0.5;
		halfHeight = sceneHeight*0.5;

		mode = _mode != undefined ? _mode : 'PERSPECTIVE';
		this.setMode(mode);


		group = new paper.Group();
	};

	// ------------------------------------------------------------------------
	this.draw = function() {
		matrix.identity();

		if(mode == 'ORTHO') ortho();
		else perspective();

		matrix.scale(sceneScale, sceneScale, sceneScale);
		matrix.rotateX(rotationX);
		matrix.rotateY(rotationY);
		matrix.rotateZ(rotationZ);
		matrix.translate(0, 0, focalLength);

		var transformed = matrix.transformArray(this.points3D);
		
		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = this.points3D[i3];
			// var y = this.points3D[i3+1];
			// var z = this.points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = focalLength/(z+focalLength);

			this.points2D[ i2 ]   = x*scale+halfWidth;
			this.points2D[ i2+1 ] = y*scale+halfHeight;
		}

		
		group.removeChildren(); // clear out in between draws
		for(var i=0; i<items.length; i++) {
			var paths = items[i].draw();
			group.appendTop( paths );
		}

		// TODO: fix this scaling issue
		if(mode == 'ORTHO') group.scale(200);

		return group;
	};

	// ------------------------------------------------------------------------
	this.setupPoint = function(x, y, z) {
		var returnVal = numPoints;

		this.points2D[ this.points2D.length ] = 0;
		this.points2D[ this.points2D.length ] = 0;

		this.points3D[ this.points3D.length ] = x;
		this.points3D[ this.points3D.length ] = y;
		this.points3D[ this.points3D.length ] = z;

		numPoints++;

		return returnVal;
	};


	// ------------------------------------------------------------------------
	/**
	 * matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	var ortho = function() {
		matrix.makeOrtho( 
			-halfHeight, halfHeight,
			halfHeight, -halfHeight,
			-halfHeight, halfHeight
		);
	};

	/**
	 * matrix for perspective projection
	 */
	var perspective = function() {
		matrix.makePerspective( 
			50,
			1,
			focalLength,
			focalLength*2
		);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setMode = function(_mode) {
		mode = _mode;
	};

	this.addItem = function(item) {
		items[items.length] = item;
		item.addToScene(this);
	};
	
	this.rotateX = function(val) {
		rotationX = val;
	};
	this.rotateY = function(val) {
		rotationY = val;
	};
	this.rotateZ = function(val) {
		rotationZ = val;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@return scene path items as group 
	 */
	this.get = function() {
		return group;
	};

	/**
	 *	@return scene size as array [width, height, depth]
	 */
	this.getSize = function() {
		return [ sceneWidth, sceneHeight, focalLength ];
	};

	/**
	 *	@return scene transformation matrix
	 */
	this.getMatrix = function() {
		return matrix;
	};

};


/**
 *	
 *	Matrix3D
 *
 *	forked from daijimachine's "Matrix3D(lib)"
 *	http://jsdo.it/daijimachine/matrix3d
 * 
 *	@author Masayuki Daijima (ARCHETYP Inc.)
 *	http://www.daijima.jp/blog/
 *	http://twitter.com/daijimachine
 *
 *	modification 
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *	
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *	
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *	Lesser General Public License for more details.
 *	
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *	
 */



/**
 *
 *	Matrix3D
 *
 */
var Matrix3D = function( n11, n12, n13, n14, 
						 n21, n22, n23, n24, 
						 n31, n32, n33, n34, 
						 n41, n42, n43, n44 ) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	this.n11 = n11 || 1.0;	this.n12 = n12 || 0.0;	this.n13 = n13 || 0.0;	this.n14 = n14 || 0.0;
	this.n21 = n21 || 0.0;	this.n22 = n22 || 1.0;	this.n23 = n23 || 0.0;	this.n24 = n24 || 0.0;
	this.n31 = n31 || 0.0;	this.n32 = n32 || 0.0;	this.n33 = n33 || 1.0;	this.n34 = n34 || 0.0;
	this.n41 = n41 || 0.0;	this.n42 = n42 || 0.0;	this.n43 = n43 || 0.0;	this.n44 = n44 || 1.0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.clone = function() {
		return new Matrix3D( this.n11, this.n12, this.n13, this.n14,
							 this.n21, this.n22, this.n23, this.n24,
							 this.n31, this.n32, this.n33, this.n34,
							 this.n41, this.n42, this.n43, this.n44 );
	};

	// ------------------------------------------------------------------------
	this.concat = function(m) {
		var values = {};
	
		values.n11 = this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41;
		values.n12 = this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42;
		values.n13 = this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43;
		values.n14 = this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44;
							 
		values.n21 = this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41;
		values.n22 = this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42;
		values.n23 = this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43;
		values.n24 = this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44;
							 
		values.n31 = this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41;
		values.n32 = this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42;
		values.n33 = this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43;
		values.n34 = this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44;
							 
		values.n41 = this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41;
		values.n42 = this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42;
		values.n43 = this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43;
		values.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44;
	
		this.initialize(values);
	};

	// ------------------------------------------------------------------------
	this.initialize = function(values) {
		for(var i in values) this[i] = values[i];
	};

	// ------------------------------------------------------------------------
	this.createBox = function(scalex, scaley, scalez, rotationx, rotationy, rotationz, tx, ty, tz) {
		this.identity();
		if (rotationx != 0) this.rotateX(rotationx);
		if (rotationy != 0) this.rotateY(rotationy);
		if (rotationz != 0) this.rotateZ(rotationz);
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale(scalex, scaley, scalez);
		if (tx != 0 || ty != 0 || tz != 0) this.translate(tx, ty, tz);
	};


	// ------------------------------------------------------------------------
	this.identity = function() {
		this.initialize({ n11:1, n12:0, n13:0, n14:0, 
						  n21:0, n22:1, n23:0, n24:0, 
						  n31:0, n32:0, n33:1, n34:0, 
						  n41:0, n42:0, n43:0, n44:1 });
	};


	// ------------------------------------------------------------------------
	/**
	 *	Rotation
	 */
	this.rotateX = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			1, 0, 0, 0, 
			0, cos, -sin, 0,	
			0, sin, cos, 0,	
			0, 0, 0, 1)
		);
	};

	this.rotateY = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos, 0, sin, 0, 
			0, 1, 0, 0, 
			-sin, 0, cos, 0, 
			0, 0, 0, 1)
		);
	};

	this.rotateZ = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos,  -sin, 0, 0, 
			sin, cos, 0, 0, 
			0, 0, 1, 0, 
			0, 0, 0, 1)
		);
	};

	/**
	 *
	 *	@param axis
	 *				FPoint3 xyz
	 *	@param angle 
	 *				rotation angle in degrees
	 *
	 */
	this.setRotateAxis = function(axis, angle) {
		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var cos = Math.cos( angle );
		var sin = Math.sin( angle );

		var t = 1 - cos;

		var x = axis.x();
		var y = axis.y(); 
		var z = axis.z();

		var tx = t * x;
		var ty = t * y;

		this.concat(
			tx * x + cos, 		tx * y - sin * z, 	tx * z + sin * y, 	0,
			tx * y + sin * z, 	ty * y + cos, 		ty * z - sin * x, 	0,
			tx * z - sin * y, 	ty * z + sin * x, 	t * z * z + cos, 	0,
			0, 0, 0, 1
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scaling
	 */
	this.scale = function(sx, sy, sz) {
		this.concat(new Matrix3D(
			sx, 0, 0, 0, 
			0, sy, 0, 0, 
			0, 0, sz, 0, 
			0, 0, 0,  1)
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Translating
	 */
	this.translate = function(dx, dy, dz) {
		this.n41 += dx;
		this.n42 += dy;
		this.n43 += dz;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Transforming
	 */
	this.transformPoint = function(point) {
		return new Vertex3D(
			this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41, 
			this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42, 
			this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
		);
	};

	this.transformArray = function(arr) {
		var rVal=[];

		var numPoints=arr.length/3;
	
		for(var i=0;i<numPoints;i++) {
			var i3=i*3;
			var x=arr[i3];
			var y=arr[i3+1];
			var z=arr[i3+2];
		
			rVal[i3]=this.n11*x+this.n21*y+this.n31*z+this.n41;
			rVal[i3+1]=this.n12*x+this.n22*y+this.n32*z+this.n42;
			rVal[i3+2]=this.n13*x+this.n23*y+this.n33*z+this.n43;
		}
	
		return rVal;
	};


	/**
	 *
	 *	Frustrum
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	this.makeFrustum = function(left, right, bottom, top, near, far) {

		var values = {};

		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		values.n11 = x;	values.n12 = 0;	values.n13 = a;	 	values.n14 = 0;
		values.n21 = 0;	values.n22 = y;	values.n23 = b;	 	values.n24 = 0;
		values.n31 = 0;	values.n32 = 0;	values.n33 = c;	 	values.n34 = d;
		values.n41 = 0;	values.n42 = 0;	values.n43 = - 1;	values.n44 = 0;

		this.concat(values);
		// this.initialize(values);
	};

	/**
	 *
	 *	Presets modified from Three.js
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	// ------------------------------------------------------------------------
	this.makePerspective = function(fov, aspect, near, far) {
		var ymax = near * Math.tan( fov * Math.PI / 360 );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
	};

	// ------------------------------------------------------------------------
	this.makeOrtho = function(left, right, top, bottom, near, far) {

		var values = {};

		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		values.n11 = 2/w;	values.n12 = 0;		values.n13 = 0;	 	values.n14 = -x;
		values.n21 = 0;		values.n22 = 2/h;	values.n23 = 0;	 	values.n24 = -y;
		values.n31 = 0;		values.n32 = 0;		values.n33 = -2/p; 	values.n34 = -z;
		values.n41 = 0;		values.n42 = 0;		values.n43 = 0;	 	values.n44 = 1;

		this.concat(values);
		// this.initialize(values);
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return  this.n11 + ',' + this.n12 + ',' + this.n13 + ',' + this.n14 + ',' + 
				this.n21 + ',' + this.n22 + ',' + this.n23 + ',' + this.n24 + ',' + 
				this.n31 + ',' + this.n32 + ',' + this.n33 + ',' + this.n34 + ',' + 
				this.n41 + ',' + this.n42 + ',' + this.n43 + ',' + this.n44;
	};
};









/**
 *	
 *	FBox.js
 *	v0.1
 *	
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBox
 *
 *	Create simple box
 *
 */
Frederickk.FShape.FBox = function(_scene) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	// public
	this.sides = new Array(6);

	// temporary until I figure out how
	// to extend paper.Item properly
	this.name = '';

	this.visible = true;
	this.selected = false;

	this.strokeCap;
	this.strokeJoin;


	// private
	var scene = _scene;


	this.faceFRONT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceTOP = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5) //corner
	];

	this.faceBOTTOM = [
		new Frederickk.F3D.FPoint3(-0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, 0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, 0.5, -0.5) //corner
	];
	
	this.faceLEFT = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5, -0.5) //corner
	];
	
	this.faceRIGHT = [
		new Frederickk.F3D.FPoint3( 0.5, -0.5, -0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5, -0.5) //corner
	];
	
	this.faceBACK = [
		new Frederickk.F3D.FPoint3(-0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5, -0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3( 0.5,	0.5,	0.5), //corner
		new Frederickk.F3D.FPoint3(-0.5,	0.5,	0.5) //corner
	];


	var faces = [
		['front',	this.faceFRONT],
		['top',		this.faceTOP],
		['bottom',	this.faceBOTTOM],
		['left',	this.faceLEFT],
		['right',	this.faceRIGHT],
		['back',	this.faceBACK]
	];


	var facesOpacity = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];
	var facesBlendModes = [
		'normal',	// FRONT
		'normal',	// TOP
		'normal',	// BOTTOM
		'normal',	// LEFT
		'normal',	// RIGHT
		'normal'	// BACK
	];

	var facesFillColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeColor = [
		new paper.RGBColor(1.0, 1.0, 0,	 0.8), // FRONT
		new paper.RGBColor(1.0, 0,	 1.0, 0.8), // TOP
		new paper.RGBColor(0,	 0,	 1.0, 0.8), // BOTTOM
		new paper.RGBColor(1.0, 0,	 0,	 0.8), // LEFT
		new paper.RGBColor(0,	 1.0, 1.0, 0.8), // RIGHT
		new paper.RGBColor(0,	 1.0, 0,	 0.8)	// BACK
	];
	var facesStrokeWidth = [1.0, 1.0, 1.0, 1.0, 1.0, 1.0];



	var whd = new Frederickk.F3D.FPoint3(10,10,10);



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.init = function(_x, _y, _z) {
		for(var i=0; i<faces.length; i++) {

			this.sides[i] = new f3d.FPath3();
			this.sides[i].name = faces[i][0];

			var vertices = faces[i][1];
			for(var j=0; j<vertices.length; j++) {
				this.sides[i].add( new f3d.FPoint3(
					vertices[j].x()*whd.x(),
					vertices[j].y()*whd.y(),
					vertices[j].z()*whd.z()
				));
			}

			// ! temporary see above !
			this.sides[i].opacity = facesOpacity[i];
			this.sides[i].blendMode = facesBlendModes[i];
			this.sides[i].visible = this.visible;
			this.sides[i].selected = this.selected;

			this.sides[i].fillColor = facesFillColor[i];

			this.sides[i].strokeColor = facesStrokeColor[i];
			this.sides[i].strokeWidth = facesStrokeWidth[i];
			this.sides[i].strokeCap = this.strokeCap;
			this.sides[i].strokeJoin = this.strokeJoin;

			this.sides[i].closed = true;
			this.sides[i].translate(_x,_y,_z);

			scene.addItem( this.sides[i] );
		}
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	this.setWHD = function(_width, _height, _depth) {
		whd.set(_width, _height, _depth);
	};


	// ------------------------------------------------------------------------
	this.setVisible = function(val) {
		this.visible = val;
	};

	// ------------------------------------------------------------------------
	this.setSelected = function(val) {
		this.selected = val;
	};

	// ------------------------------------------------------------------------
	this.setOpacity = function(face, o) {
		facesOpacity[face] = o;
	};
	this.setOpacity = function(oArr) {
		facesOpacity = oArr;
	};

	// ------------------------------------------------------------------------
	this.setFillColor = function(face, col) {
		facesFillColor[face] = col;
	};
	this.setFillColor = function(colArr) {
		facesFillColor = colArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeColor = function(face, col) {
		facesStrokeColor[face] = col;
	};
	this.setStrokeColor = function(colArr) {
		facesStrokeColor = colArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeWidth = function(face, w) {
		facesStrokeWidth[face] = w;
	};
	this.setStrokeWidth = function(wArr) {
		facesStrokeWidth = wArr;
	};

	// ------------------------------------------------------------------------
	this.setStrokeCap = function(cap) {
		this.strokeCap = cap;
	};

	// ------------------------------------------------------------------------
	this.setStrokeJoin = function(join) {
		this.strokeJoin = join;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	this.get = function() {
		return this.sides;
	};
	this.get = function(index) {
		return this.sides[index];
	};

	// ------------------------------------------------------------------------
	this.getWHD = function() {
		return whd;
	};

};





/**
 *  
 *	FBoxBill.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBoxBill
 *
 *	Create a Max Bill shapes box
 *	http://www.kettererkunst.de/kunst/kd/details.php?obnr=100039513&anummer=1
 *
 */
// Frederickk.FShape.FBoxBill = Frederickk.FShape.FBox.extend({
// 	// Properties
// 	// private
// 	whdTemp: new Frederickk.F3D.FPoint3(),
// 	rotation: new Frederickk.F3D.FPoint3(),

// 	bContainer: true,
// 	bRotation: false,

// 	// face number
// 	face:	0,

// 	// face numbers
// 	FRONT	: 0,
// 	TOP 	: 1,
// 	BOTTOM	: 2,
// 	LEFT	: 3,
// 	RIGHT	: 4,
// 	BACK	: 5,
	

// 	pointsMatrix: [],
// 	verticesArr: [],



// 	// Methods
// 	init : function() {
// 		// consecutive points for shapes
// 		pointsMatrix = [
// 			pointsTOP[0],
// 			pointsTOP[1],
// 			pointsTOP[2],
// 			pointsTOP[3],
// 			pointsTOP[4],
// 			pointsTOP[5],
// 			pointsTOP[6],
// 			pointsTOP[7],
			
// 			pointsLEFT[3],

// 			pointsRIGHT[3],

// 			pointsFRONT[3],
// 			pointsFRONT[7],

// 			pointsBOTTOM[0],
// 			pointsBOTTOM[1],
// 			pointsBOTTOM[2],
// 			pointsBOTTOM[3],
// 			pointsBOTTOM[4],
// 			pointsBOTTOM[5],
// 			pointsBOTTOM[6],
// 			pointsBOTTOM[7]
// 		];		
// 	},

// // 	this.draw = function() {
// // 		// if( verticesArr == null) {
// // 		// 	drawMatrix();
// // 		// }
// // 		// else {
// // 			draw(verticesArr);
// // 		// }
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	/**
// // 	 *
// // 	 *	TODO: add a way to translate shapes in 3D
// // 	 *
// // 	 */
// // 	var drawMatrix = function() {
// // 		if( whd != null) {
// // 			for(i=0; i<pointsMatrix.length; i++) {
// // 				var color = Frederickk.HSVtoColor( 
// // 					Frederickk.norm(i,0,pointsMatrix.length), 1.0, 1.0
// // 				);
// // 				color.alpha = 0.5;
// // // 
// // 				// translate( pointsMatrix[i].x*whd.x, pointsMatrix[i].y*whd.y, pointsMatrix[i].z*whd.z );
// // 				// sphere(15);
// // 			}
// // 		}
// // 	};


// // 	// ------------------------------------------------------------------------
// // 	var draw = function(_verticesArr) {
// // 		verticesArr = _verticesArr;
// // // 		
// // // 		pushMatrix();
// // // 		translate(sz*2, sz*2, sz*2);
// // // 		if(bRotation) {
// // // 			rotateX(rotation.x);
// // // 			rotateY(rotation.y);
// // // 			rotateZ(rotation.z);
// // // 		}
// // // 		
// // // 		translate(-sz*2, -sz*2, -sz*2);
// // 		var path = new Frederickk.F3D.FPath3();
// // 		path.name = this.name;
// // 		for(i=0; i<verticesArr.length; i++) {
// // 			path.addPoints3( 
// // 				new Frederickk.F3D.FPoint3(
// // 					pointsMatrix[ verticesArr[i] ].x()*whd.x(),
// // 					pointsMatrix[ verticesArr[i] ].y()*whd.y(),
// // 					pointsMatrix[ verticesArr[i] ].z()*whd.z()
// // 				)
// // 			);
// // 		}
// // 		path.fillColor = this.fillColor;
// // 		path.strokeColor = this.strokeColor;
// // 		path.closed = this.closed;

// // 		scene.addItem( path );

// // // 		path.translate( )
// // 		return path.draw();
// // 	};



// // 	// Sets
// // 	this.setWHD = function(w, h, d) {
// // 		if(whdTemp.x == 0) {
// // 			whdTemp.set( 
// // 				w*2,
// // 				parseInt(h*2),
// // 				parseInt(d*2)
// // 			);
// // 		}
// // 		whd.set( 
// // 			parseInt(w*2),
// // 			parseInt(h*2),
// // 			parseInt(d*2)
// // 		);
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.reset = function() {
// // 		this.setFace(0);
// // 		whd.x = whdTemp.x;
// // 		whd.y = whdTemp.y;
// // 		whd.z = whdTemp.z;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	/**
// // 	 *	@param num
// // 	 *				0 = front
// // 	 *				1 = top
// // 	 *				2 = bottom
// // 	 *				3 = left
// // 	 *				4 = right
// // 	 *				5 = back (same as front really...)
// // 	 */
// // 	this.setFace = function(num) {
// // 		face = num;
// // 	};
	
// // 	// ------------------------------------------------------------------------
// // 	this.setVertices = function(_verticesArr) {
// // 		verticesArr = _verticesArr;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.showContainer = function(val) {
// // 		bContainer = val;
// // 	};

// // 	// ------------------------------------------------------------------------
// // 	this.Rotation = function(val, rads) {
// // 		bRotation = val;
// // 		rotation = rads;
// // 	};



// // 	// Gets
// // 	this.getWHD = function() {
// // 		return whdTemp;
// // 	};

// });


/**
 *  
 *	FBubble.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FBubble
 *
 *	Create simple speech bubble forms
 *
 */
Frederickk.FShape.FBubble = paper.Path.extend({

});


/**
 *  
 *	FSphere.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FSphere
 *
 *	Create a sphere
 *
 */
Frederickk.FShape.FSphere = paper.Path.extend({

});


/**
 *  
 *	FControl.js
 *	v0.1
 *  
 *	25. November 2012
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *
 *	FControl
 *
 *	A collection of methods for adding HTML form elements
 *	for use as a GUI
 *
 */


Frederickk.FControl = function(_divId) { // #divId
	// Properties
	// public
	this.divId = _divId;



	// Methods
	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			true or false
	 */
	this.addCheck = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'chackbox');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};

	/**
	 *	@param name
	 *			name of element
	 *	@param value
	 *			?
	 */
	this.addInput = function(name, value) {
		var input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('className', 'txt');
		input.setAttribute('value', value);
		input.setAttribute('name', name);

		// here is where x and y coords could be added
		var newdiv = document.createElement('div');
		newdiv.appendChild(input);

		var div = document.getElementById( this.divId );
		div.appendChild(newdiv);
	};


};






