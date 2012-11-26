/**
 *  
 *	FPoint3.js
 *
 *	FrederickkPaper.js
 *	v0.0 / 25. November 2012
 *
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
 *  This library is free software; you can redistribute it and/or
 *  modify it under the terms of the GNU Lesser General Public
 *  License as published by the Free Software Foundation; either
 *  version 2.1 of the License, or (at your option) any later version.
 *  
 *  http://creativecommons.org/licenses/LGPL/2.1/
 *  
 *  This library is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *  Lesser General Public License for more details.
 *  
 *  You should have received a copy of the GNU Lesser General Public
 *  License along with this library; if not, write to the Free Software
 *  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *  
 */




paper.point.prototype.FPoint3 = function(x, y, z) {
	// properties
	this.x = x != undefined ? x : 0;
	this.y = y != undefined ? y : 0;
	this.z = z != undefined ? z : 0;

	this.myScene = null;

};

FPoint3.prototype = {
	// methods
	setup : function(scene) {
		myScene = scene;

		var idx = scene.setupPoint(_x, _y, _z);
		var i3 = idx*3;
		var i2 = idx*2;

		xIdx = i3;
		yIdx = i3+1;
		zIdx = i3+2;

		xIdx2D = i2;
		yIdx2D = i2+1;
	},


	// sets


	// gets
	x2D : function() {
		return myScene.points2D[xIdx2D];
	},

	y2D : function() {
		return myScene.points2D[yIdx2D];
	}


};



/**
 *
 *	3D Path Class
 *
 */
var FPath3D = function() {
	// properties
	this.points = [],
	this.startPoint = new Point3D(),
	this.endPoint = new Point3D(),


	// methods
	draw : function() {
		var path = new Path();
		for(var i=0; i<this.points.length; i++) {
			path.add( new Point( this.points[i].x2D, this.points[i].y2D ) );
		}
		path.closed = true;
		return path;
	},


	// set
	addToScene : function(scene) {
		for(var i=0; i<this.points.length; i++) {
			this.points[i].setupWithScene(scene);
		}
	},

	add : function(point) {
		this.points[this.points.length] = point;
	}
	
}



/**
 *
 *	3D Scene Class
 *
 */
var FScene3D = function() {
	// properties
	this.group = new Group();
	this.matrix = new Matrix3D();
	this.rotationX = 0;
	this.rotationY = 0;
	this.rotationZ = 0;
	this.scale = 1;

	this.focalLength = 1000;
	this.sceneWidth = view.bounds.width;
	this.sceneHeight = view.bounds.height;

	this.points3D = [];
	this.points2D = [];
	this.numPoints = 0;

	this.items = [];


	// methods
	this.setup = function(width, height, focalLength) {
		this.focalLength = focalLength;
		this.sceneWidth = width;
		this.sceneHeight = height;
	}

	this.draw = function() {
		var halfWidth = this.sceneWidth*0.5;
		var halfHeight = this.sceneHeight*0.5;

		this.matrix.identity();
		this.matrix.scale(this.scale, this.scale, this.scale);
		this.matrix.rotateX(this.rotationX);
		this.matrix.rotateY(this.rotationY);
		this.matrix.rotateZ(this.rotationZ);
		this.matrix.translate(0, 0, 1000);

		var transformed = this.matrix.transformArray(this.points3D);
		
		this.group.removeChildren();
		for(var i=0; i<this.numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			// var x = this.points3D[i3];
			// var y = this.points3D[i3+1];
			// var z = this.points3D[i3+2];
			var x = transformed[i3];
			var y = transformed[i3+1];
			var z = transformed[i3+2];
			
			var scale = this.focalLength/(z+this.focalLength);

			this.points2D[i2]   = x*scale+halfWidth;
			this.points2D[i2+1] = y*scale+halfHeight;
		}

		for(var i=0; i<this.items.length; i++) {
			var paths = this.items[i].draw();
			this.group.appendTop( paths );
		}

		return this.group;
	}

	this.setupPoint = function(x, y, z) {
		var returnVal = this.numPoints;

		this.points2D[this.points2D.length] = 0;
		this.points2D[this.points2D.length] = 0;

		this.points3D[this.points3D.length] = x;
		this.points3D[this.points3D.length] = y;
		this.points3D[this.points3D.length] = z;

		this.numPoints++;

		return returnVal;
	}


	// set
	this.addItem = function(item) {
		this.items[this.items.length] = item;
		item.addToScene(this);
	}
	
	this.rotateX = function(val) {
		this.rotationX = val;
	}
	this.rotateY = function(val) {
		this.rotationY = val;
	}
	this.rotateZ = function(val) {
		this.rotationZ = val;
	}


	// get
	this.get = function() {
		return this.group;
	}

}


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
 */
function Matrix3D( n11, n12, n13, n14, 
					n21, n22, n23, n24, 
					n31, n32, n33, n34, 
					n41, n42, n43, n44 ) {
	this.n11 = n11 || 1;
	this.n12 = n12 || 0;
	this.n13 = n13 || 0;
	this.n14 = n14 || 0;
	this.n21 = n21 || 0;
	this.n22 = n22 || 1;
	this.n23 = n23 || 0;
	this.n24 = n24 || 0;
	this.n31 = n31 || 0;
	this.n32 = n32 || 0;
	this.n33 = n33 || 1;
	this.n34 = n34 || 0;
	this.n41 = n41 || 0;
	this.n42 = n42 || 0;
	this.n43 = n43 || 0;
	this.n44 = n44 || 1;



	// methods
	this.clone = function() {
		return new Matrix3D(this.n11, this.n12, this.n13, this.n14, this.n21, this.n22, this.n23, this.n24, this.n31, this.n32, this.n33, this.n34, this.n41, this.n42, this.n43, this.n44);
	}

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
	}

	this.initialize = function(values) {
		for(var i in values) this[i] = values[i];
	}

	this.createBox = function(scalex, scaley, scalez, rotationx, rotationy, rotationz, tx, ty, tz) {
		this.identity();
		if (rotationx != 0) this.rotateX(rotationx);
		if (rotationy != 0) this.rotateY(rotationy);
		if (rotationz != 0) this.rotateZ(rotationz);
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale(scalex, scaley, scalez);
		if (tx != 0 || ty != 0 || tz != 0) this.translate(tx, ty, tz);
	}

	this.identity = function() {
		this.initialize({n11:1, n12:0, n13:0, n14:0, n21:0, n22:1, n23:0, n24:0, n31:0, n32:0, n33:1, n34:0, n41:0, n42:0, n43:0, n44:1});
	}

	this.rotateX = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			1, 0, 0, 0, 
			0, cos, -sin, 0,	
			0, sin, cos, 0,	
			0, 0, 0, 1)
		);
	}

	this.rotateY = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos, 0, -sin, 0, 
			0, 1, 0, 0, 
			sin, 0, cos, 0, 
			0, 0, 0, 1)
		);
	}

	this.rotateZ = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
	
		this.concat(new Matrix3D(
			cos, sin, 0, 0, 
			-sin, cos, 0, 0, 
			0, 0, 1, 0, 
			0, 0, 0, 1)
		);
	}

	this.scale = function(sx, sy, sz) {
		this.concat(new Matrix3D(
			sx, 0, 0, 0, 
			0, sy, 0, 0, 
			0, 0, sz, 0, 
			0, 0, 0, 1)
		);
	}

	this.translate = function(dx, dy, dz) {
		this.n41 += dx;
		this.n42 += dy;
		this.n43 += dz;
	}

	this.transformPoint = function(point) {
		return new Vertex3D(
			this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41, 
			this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42, 
			this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
		);
	}

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
	}

	this.toString = function() {
		return this.n11+","+this.n12+","+this.n13+","+this.n14+","+
			this.n21+","+this.n22+","+this.n23+","+this.n24+","+
			this.n31+","+this.n32+","+this.n33+","+this.n34+","+
			this.n41+","+this.n42+","+this.n43+","+this.n44;
	}
	
}



