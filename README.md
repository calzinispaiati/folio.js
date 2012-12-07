frederickkPaper
============

A collection of methods/functions that I find useful, as of now specifically created for application within PaperJS (http://PaperJS.org/) most of which are based on my Frederickk library for Processing (http://github.com/frederickk/frederickk)


At some point I plan to broaden this library to be used in combination with other JavaScript creative coding environments, such as ProcessingJS, etc.


This library should be seen as very very alpha.


Not all of the code in here was created by me but credit and links are given where credit is due.


Examples
-------------

###F3D Example — 2 halbierte Würfel###
shows how to draw simple 3D primitives (very rudimentary)

https://dl.dropbox.com/u/7038255/frederickkjs/F3DExample.html


###FTime Example — clocks###
shows the features of FTime, which is partly a wrapper for the native JavaScript Date() object

https://dl.dropbox.com/u/7038255/frederickkjs/FTimeExample.html


###FTransition Example###
shows how FTransition can be used for timed transitions (pseudo keyframing)

https://dl.dropbox.com/u/7038255/frederickkjs/FTransitionExample.html


###FColor Example###
shows FColor features such as color lerping

https://dl.dropbox.com/u/7038255/frederickkjs/FColorExample.html


All of these examples can be found in the above 'examples' directory. More Examples of FrederickkJS to be added as time permits.




FrederickPaper Template
-------------

This template was created to mimic the structure of other popular programming tools for artists/designers such as http://processing.org, http://www.openframeworks.cc/, http://libcinder.org/

The idea is to make getting PaperJS up and running quicker with a simple template which is contextually similar to these other tools.

By using the accompanying FPaperTemplate.html you can simply code everything within this file and all of the necessary (most common) callbacks are already implemented within the HTML

This template takes advantage of PaperJS directly connected to the DOM http://PaperJS.org/tutorials/getting-started/using-javascript-directly/, so that JavaScript variables created in the HTML can be accessed here and visa versa. I've already done the "hard work" for you within the HTML so that you can focus on editing and creating the script file /scrips/FPaperTemplate.js

When using the template and/or renaming it be sure to uppdate corresponding names in FPaperTemplate.html

I recommend a file structure as such:


/scripts/

	*** holder for all PaperJS scripts ***

	FPaperTemplate.js (rename as desired)

/js/

	*** additional JavaScript libraries ***


FPaperTemplate.html (rename as desired)



Usage
-------------


```javascript
// create a shortcut to the namespace if you wish
var fpaper = frederickkPaper;

// to access other features quickly
// you can use additional shortcuts for namespaces
var f3d = fpaper.F3D;
var fio = fpaper.FIO;
var fshape = fpaper.FShape;
var ftime = fpaper.FTime;
```


Features
-------------


Here's an incomplete overview of what some of these classes in frederickkPaper are. A more complete API will follow as time and interest allows. At some point, I'll compile this into real documentation until then...


### Frederickk (core) ###
A collection math, String, and Array operations, similar to those found in Processing


Math functions

```javascript
frederickkPaper.random(minr, maxr);
frederickkPaper.randomBias(minr, maxr, bias);
frederickkPaper.clamp(val,min,max);
frederickkPaper.norm(val,start,stop);
frederickkPaper.map(value, istart, istop, ostart, ostop);
frederickkPaper.roundDecimal(orig, deci);
frederickkPaper.snap(value, gridSize, roundFunction);
frederickkPaper.lerp(start, stop, amt);
frederickkPaper.degrees(val);
frederickkPaper.radians(val);
frederickkPaper.getAngle(point);
frederickkPaper.sq(num);
frederickkPaper.boolToInt(val);
frederickkPaper.getType(object);
frederickkPaper.findByName(items, name);
```


String functions

```javascript
frederickkPaper.trimToFit(textObj);
frederickkPaper.rtrim(str);
frederickkPaper.trim(str);
frederickkPaper.strToBoll(str);
```


Array functions

```javascript
frederickkPaper.merge(arr1, arr2);
frederickkPaper.alphabetical(a, b); // sorting
Array.max();
Array.min();
Array.shuffle();
```


paper.Item extensions

```javascript
paper.Item.snapGrid(spacing);
paper.Item.snapIso(scale);
```


paper.Size extensions

```javascript
paper.Size.area();
```



### FConversions ###
A collection of helpful conversion ratios

```javascript
var conversions = new frederickkPaper.FConversions();

frederickkPaper.FConversions.ptToMm;
frederickkPaper.FConversions.mmToPt;

frederickkPaper.FConversions.ptToCm;
frederickkPaper.FConversions.CmToPt;

frederickkPaper.FConversions.ptToIn;
frederickkPaper.FConversions.inToPt;

frederickkPaper.FConversions.ptToPi;
frederickkPaper.FConversions.piToPt;
```


### FColor ###
Expands paper.Color some of these may be redundant to the PaperJS api, that's due to the legacy of the library's initial creation for use in Scriptographer.

```javascript
var fcolor = new frederickkPaper.FColor();

frederickkPaper.FColor().lerpCMYKColor(c1,c2, amt);
frederickkPaper.FColor().lerpRGBColor(c1,c2, amt);
frederickkPaper.FColor().random();
frederickkPaper.FColor().randomRGBColor();
frederickkPaper.FColor().randomCMYKColor();
frederickkPaper.FColor().randomGrayColor();
frederickkPaper.FColor().ColorToInt(col);
frederickkPaper.FColor().IntToColor(RGBint);
frederickkPaper.FColor().ColorToHex(col);
frederickkPaper.FColor().HexToColor(hex);
frederickkPaper.FColor().ByteToColor(r255, g255, b255, a255);
```


paper.Color extensions

```javascript
paper.Color.darken(pct);
paper.Color.lighten(pct);
```



### FPoint ###
Expands paper.Point some of these may be redundant to the PaperJS api, that's due to the legacy of the library's initial creation for use in Scriptographer.

```javascript
var fpoint = new frederickkPaper.FPoint();

frederickkPaper.FPoint().norm(startPt, stopPt);
frederickkPaper.FPoint().random();
frederickkPaper.FPoint().heading();

frederickkPaper.FPoint().interpolateTo(v2, f);
frederickkPaper.FPoint().limit(lim);
frederickkPaper.FPoint().magSq();

frederickkPaper.FPoint().snapGrid(spacing);
frederickkPaper.FPoint().snapIso(scale);
```



### FIO ###
A collection of tools for handling files/cookies

```javascript
var fio = frederickkPaper.FIO;

frederickkPaper.FIO.saveCookie(name, value, days);
frederickkPaper.FIO.openCookie(name);
frederickkPaper.FIO.deleteCookie(name);
```


### FTime ###
A collection of methods for handling time oriented tasks

```javascript
var fdate = new frederickkPaper.FTime.FDate();
var fstopwatch = new frederickkPaper.FTime.FStopwatch();
var ftransition = new frederickkPaper.FTime.FTransition();
```


####FDate####

```javascript
var ftime = new frederickkPaper.FTime.FDate();

frederickkPaper.FTime.FDate().year();
frederickkPaper.FTime.FDate().month();
frederickkPaper.FTime.FDate().day();
frederickkPaper.FTime.FDate().hour();
frederickkPaper.FTime.FDate().minute();
frederickkPaper.FTime.FDate().second();
frederickkPaper.FTime.FDate().now(format);
frederickkPaper.FTime.FDate().nowMilliseconds();
frederickkPaper.FTime.FDate().add(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().sub(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().set(_d, _h, _m, _s);
frederickkPaper.FTime.FDate().get(ms, format);
frederickkPaper.FTime.FDate().toMillsecond(_h, _m, _s);
frederickkPaper.FTime.FDate().toArray(strHMS);
```


####FStopwatch####

```javascript
var fstopwatch = new frederickkPaper.FTime.FStopwatch();

frederickkPaper.FTime.FStopwatch().toggle();
frederickkPaper.FTime.FStopwatch().start();
frederickkPaper.FTime.FStopwatch().pause();
frederickkPaper.FTime.FStopwatch().reset();
frederickkPaper.FTime.FStopwatch().set(ms, run);
frederickkPaper.FTime.FStopwatch().get();
```


####FTransition####

```javascript
var ftransition = new frederickkPaper.FTime.FTransition();

frederickkPaper.FTime.FTransition().toggle();
frederickkPaper.FTime.FTransition().update(currentTime); // required 
frederickkPaper.FTime.FTransition().transIn();
frederickkPaper.FTime.FTransition().transOut();
frederickkPaper.FTime.FTransition().isIn();
frederickkPaper.FTime.FTransition().isOut();
frederickkPaper.FTime.FTransition().isDone();
frederickkPaper.FTime.FTransition().stop();
frederickkPaper.FTime.FTransition().setSeconds(_seconds);
frederickkPaper.FTime.FTransition().setMillis(_millis);
```


### F3D ###
A barebones collection of classes for primitive 3D rendering, very much a work in progress


####FPoint3####

```javascript
var fpoint3 = new frederickkPaper.F3D.FPoint3(_x, _y, _z);
```


####FPath3####

```javascript
var fpath3 = new frederickkPaper.F3D.FPath3();
```


####FScene3####

```javascript
var fscene3d = new frederickkPaper.F3D.FScene3D();
```



Building
-------------

```
$cd build/
$ant -buildfile build.xml
```


Compiled files appear in the distribution folder in two flavors


- frederickkPaper.js
- frederickkPaper-min.js



