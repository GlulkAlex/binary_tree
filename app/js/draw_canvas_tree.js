//draw_canvas_tree
'use strict';

var canvasContainer=document.getElementById("myCanvas");
var ctx=canvasContainer.getContext("2d");

var canvasHeight=canvasContainer.height;
var canvasWidth=canvasContainer.width;

var nodeHeight=20;//px
var nodeWidth=20;//px

var newPathStart={};

ctx.translate(canvasWidth*0.5,0);//Remaps the (0,0) position on the canvas

/*----------------------------------------------------------------------------------------------------------*/

function RectangleNode(canvasContext,nodeHeight,nodeWidth) {
	this._canvasContext=canvasContext;
	this._nodeHeight=nodeHeight;
	this._nodeWidth=nodeWidth;

	this._nodeNameShiftX=-0.6;
	
	this._nodeValueShiftX=0.6;
	this._nodeValueShiftY=1;
	this._nodeValueShift={
		offsetX: 0.6,
		offsetY: 1
	};
	
	this._nodeName='basicNode';//'nodeName';
	this._nodeNameStyle={
		font: 'message-box',
		textAlign: 'right',
		textBaseline: 'bottom',
		fillStyle: '#FF00FF'
	};
	this._nodeValueStyle={
		font: 'message-box',
		textAlign: 'left',
		textBaseline: 'bottom',
		fillStyle: '#FF00FF'
	};
	this._rectangleStyle={
		lineWidth: 5,
		strokeStyle: 'yellow'
	};
}

// Parent class method
//Parent.prototype.method = function method() {};

//get properties (access to) thought methods ? 
/* RectangleNode.prototype.getNodeHeight=function () {
	return this._nodeHeight;
};

RectangleNode.prototype.getNodeWidth=function () {
	return this._nodeWidth;
}; */

/* RectangleNode.prototype.getPathStart=function () {
	//ending path point - start for new path
	return {
		pathStartX: this._pathStartX,
		pathStartY: this._pathStartY
	};
}; */

RectangleNode.prototype.showNodeName=function (initX,initY) {
	var cnvsCntxt=this._canvasContext;
	
	this._pathStartX=initX;
	this._pathStartY=initY;

	//show ._nodeName label
	cnvsCntxt.font=this._nodeNameStyle.font;
	cnvsCntxt.textAlign=this._nodeNameStyle.textAlign;//textBaseline
	cnvsCntxt.textBaseline=this._nodeNameStyle.textBaseline;
	cnvsCntxt.fillStyle=this._nodeNameStyle.fillStyle;
	
	cnvsCntxt.fillText(
		this._nodeName,
		this._pathStartX+this._nodeWidth*this._nodeNameShiftX,
		this._pathStartY+this._nodeHeight
	);
	
	return ;
};

RectangleNode.prototype.showNodeValue=function (initX,initY,keyValue) {
	var cnvsCntxt=this._canvasContext;
	
	this._pathStartX=initX;
	this._pathStartY=initY;
	this._nodeValue=keyValue;
	//show ._nodeValue label
	cnvsCntxt.font=this._nodeValueStyle.font;
	cnvsCntxt.textAlign=this._nodeValueStyle.textAlign;
	cnvsCntxt.textBaseline=this._nodeValueStyle.textBaseline;
	cnvsCntxt.fillStyle=this._nodeValueStyle.fillStyle;
	
	cnvsCntxt.fillText(
		this._nodeValue,
		this._pathStartX+this._nodeWidth*this._nodeValueShiftX,
		this._pathStartY+this._nodeHeight*this._nodeValueShift.offsetY
	);
	
	return ;
};

RectangleNode.prototype.drawNode=function (initX,initY,keyValue) {
	var cnvsCntxt=this._canvasContext;
	
	this._pathStartX=initX;
	this._pathStartY=initY;
	/* this._nodeValue=keyValue; */
	
	//show ._nodeName label
	/* cnvsCntxt.font=this._nodeNameStyle.font;
	cnvsCntxt.textAlign=this._nodeNameStyle.textAlign;//textBaseline
	cnvsCntxt.textBaseline=this._nodeNameStyle.textBaseline;
	cnvsCntxt.fillStyle=this._nodeNameStyle.fillStyle;
	
	cnvsCntxt.fillText(
		this._nodeName,
		this._pathStartX+this._nodeWidth*this._nodeNameShiftX,
		this._pathStartY+this._nodeHeight
	); */
	
	//show ._nodeValue label
	/* cnvsCntxt.font=this._nodeValueStyle.font;
	cnvsCntxt.textAlign=this._nodeValueStyle.textAlign;
	cnvsCntxt.textBaseline=this._nodeValueStyle.textBaseline;
	cnvsCntxt.fillStyle=this._nodeValueStyle.fillStyle;
	
	cnvsCntxt.fillText(
		this._nodeValue,
		this._pathStartX+this._nodeWidth*this._nodeValueShiftX,
		this._pathStartY+this._nodeHeight*this._nodeValueShift.offsetY
	); */
	
	cnvsCntxt.beginPath();//clear previous style ?
	//_rectangleStyle
	cnvsCntxt.lineWidth=this._rectangleStyle.lineWidth;
	cnvsCntxt.strokeStyle=this._rectangleStyle.strokeStyle;
	
	cnvsCntxt.rect(
		this._pathStartX+this._nodeWidth*-0.5,
		this._pathStartY,
		this._nodeHeight,
		this._nodeWidth
	);//make but not Draw a rectangle (no fill)
	cnvsCntxt.stroke();//actually Draws what be made before		
	
	cnvsCntxt.beginPath();//effect next Drawings style not inherit from current
				
	//currentPathEndingX=currentPathEndingX;//nodeWidth*0.5;
	this._pathStartY=this._pathStartY+this._nodeHeight;
	
	//return ;
	return {
		pathStartX: this._pathStartX,
		pathStartY: this._pathStartY
	};	
};
/*----------------------------------------------------------------------------------------------------------*/

//Instantiate it
var basicRectangleNode=new RectangleNode(ctx,30,30);//,190,0,'root key');

/*----------------------------------------------------------------------------------------------------------*/

//SubClass - to extend 'parent' prototype
function RootNode () {
  this._nodeName = 'root Node';
	
	this._fillStyle = {
		fillStyle: "#FF9999"
	};
}

RootNode.prototype = new RectangleNode(ctx,30,30);//don't work without parameters

//Polymorphism: redefines/enhance 'get' method //enhansment1
//first - inherit, then -- enhance methods
RootNode.prototype.fillNode=function (initX, initY) {
	var cnvsCntxt=this._canvasContext; 
	this._pathStartX=initX;
	this._pathStartY=initY;
	
	cnvsCntxt.beginPath();//clear previous style ?
	//_fillStyle
	cnvsCntxt.fillStyle=this._fillStyle.fillStyle;
	ctx.fillRect(
		this._pathStartX-this._nodeWidth*0.5+this._nodeWidth*0.1,
		this._pathStartY+this._nodeWidth*0.1,
		this._nodeWidth*0.8,
		this._nodeHeight*0.8
	);//Draws a "filled" rectangle
	ctx.clearRect(
		this._pathStartX-this._nodeWidth*0.5+this._nodeWidth*0.3,
		this._pathStartY+this._nodeWidth*0.3,
		this._nodeWidth*0.4,
		this._nodeHeight*0.4
	);

	ctx.beginPath();//clear previous style ?
	
	return {
		pathStartX: this._pathStartX,
		pathStartY: this._pathStartY
	};	
};	
/*----------------------------------------------------------------------------------------------------------*/

//Instance
var rootNode=new RootNode();
/*----------------------------------------------------------------------------------------------------------*/

//The ''LeftLeaf'' definitions create objects 
//that descend from ''RootNode'' and hence from ''RectangleNode''. 
//An object of these types has properties of all the objects above it in the chain. 
//In addition, these definitions override the inherited value of the ''_nodeName'' property 
//with new values specific to these objects.
function LeftLeaf () {
  this._nodeName = 'left Leaf';
					/* ctx.lineWidth=1; 
					ctx.strokeStyle='blue';//"#FF0000"; */
	this._nodeNameStyle={
		font: 'icon',
		textAlign: 'right',
		textBaseline: 'bottom',
		fillStyle: 'blue'
	};
	//ctx.textBaseline="top";//context.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom";	
	this._nodeValueStyle={
		font: 'icon',//'icon'
		textAlign: 'left',
		textBaseline: 'top',//'top'
		fillStyle: 'blue'//'blue'
	};
	
	this._edgeEndShiftX = -1;//offset/shift from/to X,Y
	//context.lineCap="butt|round|square";
	this._edgeStyle={
		lineCap: 'round',
		lineWidth: 3,
		strokeStyle: '#3399FF'
	};
	this._rectangleStyle={
		lineWidth: 2,
		strokeStyle: 'blue'
	};
}

//LeftLeaf.prototype = new RootNode();//work without parameters here
LeftLeaf.prototype = new RectangleNode(ctx,20,20);//don't work without parameters

//first - inherit, then -- enhance methods
LeftLeaf.prototype.drawEdge=function (initX,initY) {
	var cnvsCntxt=this._canvasContext; 
	this._pathStartX=initX;
	this._pathStartY=initY;
	
	cnvsCntxt.beginPath();//clear previous style ?
	//_edgeStyle
	cnvsCntxt.lineCap=this._edgeStyle.lineCap;
	cnvsCntxt.lineWidth=this._edgeStyle.lineWidth;
	cnvsCntxt.strokeStyle=this._edgeStyle.strokeStyle;
	
	//offset/shift from/to X,Y
	cnvsCntxt.moveTo(this._pathStartX,this._pathStartY);
	cnvsCntxt.lineTo(this._pathStartX+this._edgeEndShiftX*this._nodeWidth,this._pathStartY+this._nodeHeight);

	cnvsCntxt.stroke();//actually Draws what be made before			
	cnvsCntxt.beginPath();//effect next Drawings style not inherit from current
				
	//currentPathEndingX=currentPathEndingX-nodeWidth;
	//currentPathEndingY=currentPathEndingY+nodeHeight;
	this._pathStartX=this._pathStartX+this._edgeEndShiftX*this._nodeWidth;
	this._pathStartY=this._pathStartY+this._nodeHeight;
	
	//return ;
	return {
		pathStartX: this._pathStartX,
		pathStartY: this._pathStartY
	};	
};

//this way (to redefine properties) works too -- not only in 'constructor' function
//but not always as expected
//'constructor' function - override this settings or
//more likely 'RightLeaf' descendant (from parent 'LeftLeaf') settings overrode initial parent (prototype) value 
LeftLeaf.prototype._nodeNameStyle.fillStyle='green';

LeftLeaf.prototype._nodeValueStyle.fillStyle='blue';
LeftLeaf.prototype._nodeValueStyle.font='icon';
LeftLeaf.prototype._nodeValueStyle.textAlign='left';
LeftLeaf.prototype._nodeValueStyle.textBaseline='top';

LeftLeaf.prototype._nodeValueShiftY=0.6;
LeftLeaf.prototype._nodeValueShift.offsetY=0.5;
/*----------------------------------------------------------------------------------------------------------*/

//Instance
var leftLeaf=new LeftLeaf();//.prototype parameters prevail/override (ctx,30,30);

/*----------------------------------------------------------------------------------------------------------*/
function RightLeaf () {
  this._nodeName = 'right Leaf';
}

RightLeaf.prototype = new LeftLeaf();//(ctx,20,20);//work without parameters

//this way (to redefine properties) works too -- not only in ''constructor'' function
RightLeaf.prototype._edgeEndShiftX=1;

RightLeaf.prototype._edgeStyle.strokeStyle='red';
RightLeaf.prototype._edgeStyle.lineWidth=4;

//.prototype.property=redefined -- not work for non strict parent ?
/*Setting a property to an object creates an own property. 
The only exception 
to the getting and setting behavior rules is 
when there is an inherited property with a getter or a setter.*/
//Getters and setters can also be added to an object at any time after creation 
//using the ''Object.defineProperties'' method.
/* Deleting properties
You can remove a non-inherited property by using the ''delete'' operator. */
//You can also use delete to 'delete' a global variable 
//if the 'var' keyword was not used to declare the variable
//prototype chain
//Inheritance with the prototype chain
//An inherited 'function' acts just as any other property, 
//including 'property shadowing' as shown above (in this case, a form of 'method overriding').
/* When an inherited function is executed, 
the value of 'this' points to the inheriting object, 
not to the prototype object where the function is an own property. */
//Object.prototype has null as its prototype ?
//o ---> Object.prototype ---> null
//a ---> Array.prototype ---> Object.prototype ---> null
//f ---> Function.prototype ---> Object.prototype ---> null
/* With a constructor
A "constructor" in JavaScript is "just" a function 
that happens to be called with the new operator. */
//To check whether an object has a property defined on itself and 
//not somewhere on its 'prototype' chain, 
//it is necessary to use the 'hasOwnProperty' method 
//which all objects inherit from 'Object.prototype'.
/* 'hasOwnProperty' is the only thing in JavaScript 
which deals with properties and 
does not traverse the 'prototype' chain. */
//"hidden" properties 
//(properties in the prototype chain 
//which are not accessible through the object, 
//because another property has the same name earlier in the prototype chain)
/* console.log(
"Object.prototype.hasOwnProperty.call(RightLeaf,'_nodeNameShiftX'): "+
Object.prototype.hasOwnProperty.call(RightLeaf,'_nodeNameShiftX')
);
console.log(
"RightLeaf.prototype.hasOwnProperty('_nodeNameShiftX'): "+RightLeaf.prototype.hasOwnProperty('_nodeNameShiftX')
); */
RightLeaf.prototype._nodeNameShiftX=0.6;
/* console.log(
"after assign RightLeaf.prototype.hasOwnProperty('_nodeNameShiftX'): "+
RightLeaf.prototype.hasOwnProperty('_nodeNameShiftX')
);
console.log(
"after assign ({}).hasOwnProperty.call(RightLeaf,'_nodeNameShiftX'): "+
({}).hasOwnProperty.call(RightLeaf,'_nodeNameShiftX')
); */
RightLeaf.prototype._nodeValueShiftX=-0.6;
RightLeaf.prototype._nodeValueShiftY=-0.5;//_nodeValueShiftY

RightLeaf.prototype._nodeNameStyle.fillStyle='red';
RightLeaf.prototype._nodeNameStyle.textAlign='left';

RightLeaf.prototype._nodeValueStyle.fillStyle='red';
RightLeaf.prototype._nodeValueStyle.textBaseline='bottom';
RightLeaf.prototype._nodeValueStyle.textAlign='right';

RightLeaf.prototype._rectangleStyle.strokeStyle='red';
RightLeaf.prototype._rectangleStyle.lineWidth=3;
/*----------------------------------------------------------------------------------------------------------*/

//Instance
var rightLeaf=new RightLeaf();//.prototype parameters prevail/override (ctx,30,30);

//console.log(newPathStart);
//newPathStart=basicRectangleNode.getPathStart(); //return: {}
//newPathStart=basicRectangleNode.drawNode(0,0,'key1');//no chain(ing) ? .getPathStart();
//console.log(newPathStart);

function isArray(myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
}

function parentNodeIndex(keyIndex) {
	//this.parentNodeIndex=null;
	var parentNodeIndex=null;
	if (keyIndex>0)//not root
	{
		//may be refactoring parentNodeIndex as method ?
		//%	Modulus (division remainder)
		if (keyIndex%2===0)//even
		{
			parentNodeIndex=keyIndex*0.5;
		}
		else//odd
		{
			parentNodeIndex=Math.floor(keyIndex*0.5);
		}
	}
	else if (keyIndex===0)//root
	{
		parentNodeIndex=0;//index for root parent ?
	}
	return parentNodeIndex;
}

newPathStart.pathStartX=0;
newPathStart.pathStartY=0;

function treeFromArray(treeArray){
	if (typeof(treeArray)=='undefined'){
		console.log(treeArray);
		return ;
	}
	if (!isArray(treeArray)) {
		console.log(treeArray);
		return ;
	}
	if (treeArray[0] != null){
		var parentNodeEnd=newPathStart;
		var i;
		var rootKeyIndex;
		var leftLeafIndex;
		var rightLeafIndex;
		
		var treeHeight;//startingY+nodeHeight+edgeHeight 
		var nodeHeight=20;//leftLeaf._nodeHeight
		var edgeHeight=20;
		var edgeWidth=20;//various: on upper levels -- wide/loose, on lower levels -- thin/dense/tight/narrow  
		var nodeWidth=20;//width 
		//Math.pow(2, n)+' maximum # of elements on level n
		var currentLevel;
		var nodeStartPosOnLevelX;
		var nodeCurrentPosOnLevelX;
		var nodesQuantityOnLevel; //quantity		
		
		rootKeyIndex=0;
		
		rootNode.showNodeName(newPathStart.pathStartX,newPathStart.pathStartY);
		rootNode.showNodeValue(newPathStart.pathStartX,newPathStart.pathStartY,treeArray[rootKeyIndex]);
		newPathStart=rootNode.fillNode(newPathStart.pathStartX,newPathStart.pathStartY);
		//console.log(newPathStart);
		newPathStart=rootNode.drawNode(newPathStart.pathStartX,newPathStart.pathStartY);
		
		treeHeight=-10;//newPathStart.pathStartY;//30;//rootNode._nodeHeight
		nodeStartPosOnLevelX=newPathStart.pathStartX+(1.0)*nodeWidth;
		nodeCurrentPosOnLevelX=nodeStartPosOnLevelX;
		
		//traverse down - from root to leafs 
		currentLevel=0;	
		nodesQuantityOnLevel=Math.pow(2, currentLevel);
		//i started from 1 because root nod has index=0 (already drawn)
		for (i = 1; i < treeArray.length; i++){
		
			if (nodesQuantityOnLevel>=Math.pow(2, currentLevel)){
				currentLevel=currentLevel+1;
				
				treeHeight=treeHeight+nodeHeight+edgeHeight;
				
				nodeStartPosOnLevelX=nodeStartPosOnLevelX+(-1)*nodeWidth;
				nodeCurrentPosOnLevelX=nodeStartPosOnLevelX;
				
				nodesQuantityOnLevel=0;
			}
			
			nodesQuantityOnLevel=nodesQuantityOnLevel+1;
			if (nodesQuantityOnLevel%2===0)//even
			{
				rightLeaf.drawEdge(nodeCurrentPosOnLevelX,treeHeight); 
				nodeCurrentPosOnLevelX=nodeCurrentPosOnLevelX+(1)*nodeWidth;
				//console.log(newPathStart);
				rightLeaf.showNodeValue(nodeCurrentPosOnLevelX,treeHeight+nodeHeight,treeArray[i]);
				rightLeaf.drawNode(nodeCurrentPosOnLevelX,treeHeight+nodeHeight); 
				nodeCurrentPosOnLevelX=nodeCurrentPosOnLevelX+(1)*nodeWidth;
			}
			else//odd
			{
				leftLeaf.drawEdge(nodeCurrentPosOnLevelX,treeHeight);
				//nodeCurrentPosOnLevelX=nodeCurrentPosOnLevelX+(-1)*nodeWidth;
				//console.log(newPathStart);
				leftLeaf.showNodeValue(nodeCurrentPosOnLevelX+(-1)*nodeWidth,treeHeight+nodeHeight,treeArray[i]);
				leftLeaf.drawNode(nodeCurrentPosOnLevelX+(-1)*nodeWidth,treeHeight+nodeHeight); 
			}
			

		}
		
		/* var whileIterationCouinter=1;
		while (
			leftLeafIndex!==0 || 
			rightLeafIndex!==0
		){
			whileIterationCouinter=whileIterationCouinter+1;//check for break if never end
			if (whileIterationCouinter>=100)//Math.log(this.length))//not that simple
			{
				console.log('loop going to never end');
				break;//to prevent never end
			}

			leftLeafIndex=rootKeyIndex;
			if (treeArray[rootKeyIndex*2+1]!=null)//==myHeapArray.length>1
			{
				leftLeafIndex=rootKeyIndex*2+1;

				newPathStart=leftLeaf.drawEdge(parentNodeEnd.pathStartX,parentNodeEnd.pathStartY);
				//console.log(newPathStart);
				//showNodeValue
				leftLeaf.showNodeValue(newPathStart.pathStartX,newPathStart.pathStartY,treeArray[leftLeafIndex]);
				newPathStart=leftLeaf.drawNode(newPathStart.pathStartX,newPathStart.pathStartY); 
				//console.log(newPathStart);
				
			}
			else//no left child
			{
				console.log('no left child');
				leftLeafIndex=0;//to unexpected comparison case
			}
			
			rightLeafIndex=rootKeyIndex;
			if (treeArray[rootKeyIndex*2+2]!=null)//==myHeapArray.length>2
			{
				rightLeafIndex=rootKeyIndex*2+2;

				//console.log(newPathStart);
				newPathStart=rightLeaf.drawEdge(newPathStart.pathStartX,newPathStart.pathStartY); 
				//console.log(newPathStart);
				rightLeaf.showNodeValue(newPathStart.pathStartX,newPathStart.pathStartY,treeArray[rightLeafIndex]);
				newPathStart=rightLeaf.drawNode(newPathStart.pathStartX,newPathStart.pathStartY); 
				//console.log(newPathStart);

			}
			/* else if (treeArray[1]!=null)//==myHeapArray.length==2
			{
				rightLeafIndex=leftLeafIndex;//compare key with only one left child
			} */
			/*else//no right child
			{
				console.log('no right child');
				rightLeafIndex=0;//unexpected comparison case
			}
	
		} */

	}
	
	//console.log('whileIterationCouinter: '+whileIterationCouinter);
	return ;
}
/*----------------------------------------------------------------------------------------------------------*/

var sampleArray=[54044,14108,79294,29649,25260,60660,2995,53777,49689,9083];
//treeFromArray(sampleArray);
/*----------------------------------------------------------------------------------------------------------*/

//Make ''Class'' from it			
			function drawRectangleNode(initX,initY,nodeStyle,keyValue){
				var startNewPathX=initX;
				var startNewPathY=initY;
				
				var currentPathEndingX=initX;//auxiliary 
				var currentPathEndingY=initY;//auxiliary

				if (initX>0 && initY>0)
				{
					//ctx.translate(startNewPathX,startNewPathY);//Remaps the (0,0) position on the canvas
				}	
				
				if (nodeStyle=='root')
				{
					nodeHeight=30;//px
					nodeWidth=30;//px

					/* ctx.beginPath();//The beginPath() method begins a path, or resets the current path.

					ctx.moveTo(startNewPathX,startNewPathY); */
					
					//context.font="italic small-caps bold 12px arial";
					//The font property uses the same syntax as the CSS font property
					//ctx.font="20px";
					ctx.font='status-bar';
					ctx.font='small-caption';
					ctx.font='caption';
					ctx.font='icon';
					ctx.font='menu';
					ctx.font='message-box';//status-bar|small-caption|caption|icon|menu|'italic small-caps bold 12px arial'
					ctx.lineWidth=1; 
					ctx.strokeStyle='#FF00FF';//'blue';"#FF0000";
					//context.textAlign="center|end|left|right|start";
					ctx.textAlign="right";
					//context.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom";
					ctx.textBaseline="bottom";
					//The strokeText() method draws text (with no fill) on the canvas. The default color of the text is black.
					//context.strokeText(text,x,y,maxWidth);
					//ctx.strokeText("tree root",0,20);
					
					//context.fillStyle=color|gradient|pattern;
					ctx.fillStyle='#FF00FF';
					//The fillText() method draws filled text on the canvas. The default color of the text is black.
					/*Tip: 
					Use the font property 
					to specify font and font size, 
					and use the fillStyle property 
					to render the text in another color/gradient.*/
					//context.fillText(text,x,y,maxWidth);
					ctx.fillText("tree Root",startNewPathX-nodeWidth*0.5-nodeWidth*0.1,startNewPathY+nodeHeight);
					
					/* ctx.beginPath();//The beginPath() method begins a path, or resets the current path.
					
					ctx.moveTo(startNewPathX,startNewPathY); */
					
					ctx.textAlign="left";
					ctx.fillText(keyValue,startNewPathX+nodeWidth*0.5+nodeWidth*0.1,startNewPathY+nodeHeight);
					
					/* ctx.beginPath();//The beginPath() method begins a path, or resets the current path.
					
					ctx.moveTo(startNewPathX,startNewPathY); */
										
					//ctx.beginPath();
					
					ctx.fillStyle="#FF9999";
					ctx.fillRect(currentPathEndingX-nodeWidth*0.5+nodeWidth*0.1,currentPathEndingY+nodeWidth*0.1,nodeWidth*0.8,nodeHeight*0.8);//Draws a "filled" rectangle
					ctx.clearRect(currentPathEndingX-nodeWidth*0.5+nodeWidth*0.3,currentPathEndingY+nodeWidth*0.3,nodeWidth*0.4,nodeHeight*0.4);

					ctx.beginPath();//clear previous style ?
					
					ctx.lineWidth=5; 
					//context.strokeStyle=color|gradient|pattern;
					//A pattern object used to create a pattern stroke
					ctx.strokeStyle='yellow';//"#FF0000";
					ctx.rect(startNewPathX+nodeWidth*-0.5,startNewPathY,nodeHeight,nodeWidth);//make but not Draw a rectangle (no fill)
					
					currentPathEndingX=currentPathEndingX;//nodeWidth*0.5;
					currentPathEndingY=currentPathEndingY+nodeHeight;
					
					//ctx.translate(startNewPathX,startNewPathY);//Remaps the (0,0) position on the canvas

				}
				else if (nodeStyle=='leftLeaf')
				{
					//ctx.translate(startNewPathX-30,startNewPathY);//Remaps the (0,0) position on the canvas
					//ctx.translate(0,10);//Remaps the (0,0) position on the canvas
					
					//ctx.beginPath();//The beginPath() method begins a path, or resets the current path.
					/*Tip: Use moveTo(), lineTo(), quadricCurveTo(), bezierCurveTo(), arcTo(), and arc(), to create paths.
					Tip: Use the stroke() method to actually draw the path on the canvas.*/
					
					nodeHeight=20;//px
					nodeWidth=20;//px

					ctx.strokeStyle="#3399FF";//#3399FF
					ctx.lineWidth=3; 
					ctx.moveTo(startNewPathX,startNewPathY);
					ctx.lineTo(startNewPathX-nodeWidth,startNewPathY+nodeHeight);
					ctx.stroke();

					//startNewPathY=startNewPathY+20;
					currentPathEndingX=currentPathEndingX-nodeWidth;
					currentPathEndingY=currentPathEndingY+nodeHeight;
					
					//ctx.translate(-30,20);//Remaps the (0,0) position on the canvas
					
					ctx.lineWidth=1; 
					ctx.strokeStyle='blue';//"#FF0000";

					ctx.textAlign="right";
					ctx.textBaseline="bottom";
					ctx.font='icon';
					ctx.fillStyle='blue';
					//ctx.fillText("left Leaf",startNewPathX-2,startNewPathY+nodeHeight);
					ctx.fillText("left Leaf",currentPathEndingX-nodeWidth*0.5-2,currentPathEndingY+nodeHeight);
					
					//ctx.beginPath();			
					
					ctx.textAlign="left";
					ctx.textBaseline="top";//context.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom";
					//ctx.fillText(keyValue,startNewPathX+nodeWidth+2,startNewPathY+nodeHeight);
					ctx.fillText(
						keyValue,
						currentPathEndingX+nodeWidth*(0.5+0.1),
						currentPathEndingY+nodeHeight*(0.5)
					);
					
					ctx.beginPath();			
					
					ctx.lineWidth=2; 
					//context.strokeStyle=color|gradient|pattern;
					//A pattern object used to create a pattern stroke
					ctx.strokeStyle='blue';//'yellow';//"#FF0000";
					//ctx.rect(startNewPathX-nodeWidth*0.5,startNewPathY,nodeWidth,nodeHeight);//make but not Draw a rectangle (no fill)
					ctx.rect(currentPathEndingX-nodeWidth*0.5,currentPathEndingY,nodeWidth,nodeHeight);//make but not Draw a rectangle (no fill)
					
					currentPathEndingX=currentPathEndingX;//+nodeWidth*0.5;
					currentPathEndingY=currentPathEndingY+nodeHeight;
				}
				else if (nodeStyle=='rightLeaf')
				{
					nodeHeight=20;//px
					nodeWidth=20;//px

					//ctx.translate(-10,0);//Remaps the (0,0) position on the canvas
					
					ctx.beginPath();			
					ctx.strokeStyle='red';//"#66FF33";//#3399FF
					ctx.lineWidth=4; 
					ctx.lineJoin='round';
					ctx.lineCap='round';			
					//ctx.moveTo(0,0);//Moves the path to the specified point in the canvas, without creating a line
					//ctx.lineTo(20,20);//Adds a new point and creates a line from that point to the last specified point in the canvas
					//ctx.stroke();//Actually draws the path you have defined
					
					ctx.moveTo(startNewPathX,startNewPathY);
					ctx.lineTo(startNewPathX+nodeWidth,startNewPathY+nodeHeight);
					ctx.stroke();

					currentPathEndingX=currentPathEndingX+nodeWidth;
					currentPathEndingY=currentPathEndingY+nodeHeight;
					
					//ctx.translate(startNewPathX+10,startNewPathY+20);//Remaps the (0,0) position on the canvas
					//ctx.translate(10,20);//Remaps the (0,0) position on the canvas

					ctx.lineWidth=1; 
					ctx.strokeStyle='blue';//"#FF0000";
					
					ctx.textAlign="left";
					ctx.textBaseline="bottom";
					ctx.font='icon';
					ctx.fillStyle='red';
					//ctx.fillText("right Leaf",22,20);
					ctx.fillText(
						"right Leaf",
						currentPathEndingX+nodeWidth*0.5+nodeWidth*0.1,
						currentPathEndingY+nodeHeight
					);
					
					ctx.beginPath();			
					
					ctx.textAlign="right";
					ctx.textBaseline="bottom";//context.textBaseline="alphabetic|top|hanging|middle|ideographic|bottom";
					//ctx.fillText(keyValue,-2,20);
					ctx.fillText(
						keyValue,
						currentPathEndingX+nodeWidth*(-0.5)+nodeWidth*(-0.1),
						currentPathEndingY+nodeHeight*(0.5)
					);
					
					ctx.lineWidth=3; 
					//context.strokeStyle=color|gradient|pattern;
					//A pattern object used to create a pattern stroke
					ctx.strokeStyle='red';//'yellow';//"#FF0000";
					//ctx.rect(10,0,20,20);//make but not Draw a rectangle (no fill)
					ctx.rect(currentPathEndingX-nodeWidth*0.5,currentPathEndingY,nodeWidth,nodeHeight);//make but not Draw a rectangle (no fill)
					
					currentPathEndingX=currentPathEndingX;//+nodeWidth*0.5;
					currentPathEndingY=currentPathEndingY+nodeHeight;
				}

				//The rect() method creates a rectangle.
				/*Tip: 
				Use the stroke() or 
				the fill() method 
				to actually draw the rectangle on the canvas.*/
				//context.rect(x,y,width,height);
				//The x-coordinate of the upper-left corner of the rectangle
				//The y-coordinate of the upper-left corner of the rectangle
				
				ctx.stroke();//actually Draws what be made before			
				ctx.beginPath();//effect next Drawings style not inherit from current
				
				//context.strokeRect(x,y,width,height);
				//x-coordinate of the upper-left corner of the rectangle
				//y-coordinate of the upper-left corner of the rectangle
				//ctx.strokeRect(0,0,20,20);//Draws a rectangle (no fill)
								
				return {
					startNewPathX: currentPathEndingX,
					startNewPathY: currentPathEndingY
				};
			}
			
			/* newPathStart=drawRectangleNode(0,0,'root','10');
			newPathStart=drawRectangleNode(0,30,'leftLeaf','11');
			newPathStart=drawRectangleNode(0,30,'rightLeaf','14');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'root','10');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'root','10');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'rightLeaf','10');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'rightLeaf','10');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'leftLeaf','11');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'rightLeaf','14');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'leftLeaf','12');
			newPathStart=drawRectangleNode(newPathStart.startNewPathX,newPathStart.startNewPathY,'leftLeaf','13'); */
						
			//context.fillStyle=color|gradient|pattern;
			//The fill() method fills the current drawing (path). The default color is black.
			/* Note: 
			If the path is not closed, 
			the fill() method will add a line from the last point 
			to the startpoint of the path to close the path (like closePath()), 
			and then fill the path. */
			// ctx.fill();//Fills the current drawing (path)
								
			/* ctx.beginPath();
			ctx.arc(120,150,10,0,2*Math.PI);
			ctx.stroke(); */
			
			/* ctx.lineWidth=1; 
			ctx.textAlign="center";
			ctx.textBaseline="middle"; */
			//context.font="italic small-caps bold 12px arial";
			/* ctx.strokeText("right leaf",120,150); */
						
			//context.arc(x,y,r,sAngle,eAngle,counterclockwise);
			//The arc() method creates an arc/curve (used to create circles, or parts of circles).
			/*Tip: To create a circle with arc(): Set start angle to 0 and end angle to 2*Math.PI. 
			Tip: Use the stroke() or the fill() method to actually draw the arc on the canvas.*/
			/* ctx.beginPath();
			ctx.arc(20,150,10,0,2*Math.PI);
			ctx.stroke(); */
			
			/* ctx.lineWidth=1; 
			ctx.textAlign="center";
			ctx.textBaseline="middle";
			ctx.strokeText("left leaf",20,150); */
			
			//context.isPointInPath(x,y);//The isPointInPath() method returns true if the specified point is in the current path, otherwise false.
			
			//ctx.translate(70,70);//Remaps the (0,0) position on the canvas
			//The translate() method remaps the (0,0) position on the canvas.
			/*Note: 
			When you call a method such as fillRect() after translate(), 
			the value is added to the x- and y-coordinate values.*/
			
