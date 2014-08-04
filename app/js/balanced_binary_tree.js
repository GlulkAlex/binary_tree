//XIII. BALANCED BINARY SEARCH TREES (Week 5)
//balanced_binary_tree
'use strict';

/**
* properties:
* height - longest path
* pointers:
* 	(1)left child 
*		(2)right child
* 	(3)parent
*		note: value may be null -- no elements to point
*/

/**
* key value restrictions (conventions)
*		(1)for duplicated keys values -- suppose they will stored to the left leaf
* 	(2)parent node key (x)
*		(3)left child node key less than [x]
*		(4)right child node key greater than [x]
*/

/**
* supported operations: (augmentation of data structure)
*	1. insert - 
*			preserve search tree property -- 
*				all left keys less then parent node (x), 
*				all right keys greater then (x)
*	2. deletion (3 different case) -
*		2.1			
*		2.2
*		2.3	
* 3. min
* 4. max
* 5. predecessor: next biggest or smallest element of the tree ('left turn')
* 6. successor
* 7. outPut in sorted order -- print keys in increasing order (in-order traversal)
* 8. rank (size of node self included=left subtree+right subtree + itself) - 
*			updates on insert/delete
* 9. select -- i-th order statistic
* 10. search (and insertion) - for specific key (k) in tree (T)
*/

/* define some public functions 
that can 
access private functions and variables, 
using/via 
closures 
which is also known as 
the module pattern */
//constructor
var balancedBinaryTree= (function() 
{
  var treeContent = {nodes:[]};//or [] of {} ?

  /* function changeBy(val) {
    //privateCounter += val;
  } */
	
	/* function getParent() {
		return ;//index
	} */
	
  return {
		nodeParent: function() {
      return nodeParent;
    },
		nodeLeftChild: function() {
      return nodeLeftChild;
    },
		nodeRightChild: function() {
      return nodeRightChild;
    },
		treeHeight: function() {
      return treeHeight;
    },
    insertNode: function(newNode) {
			
			var parentNode;//name conflict ?
			
      if (typeof(treeContent.nodes[0])==='undefined'){
				//first/root node 
								
				//increment
				treeContent.nodes[treeContent.nodes.length]={
					keyValue: newNode,
					nodeParent: null,
					nodeLeftChild: null,
					nodeRightChild: null,
					rank: 1
				};//where newNode is a key value
			
				//console.log('treeContent.nodes.length:'+treeContent.nodes.length);
			}
			else
			{
				//must preserve search tree property -- 
					/* *				all left keys less then parent node (x), 
					*				all right keys greater then (x) */

				parentNode=treeContent.nodes[treeContent.nodes.length-1];//last index in array
				
				parentNode.rank=parentNode.rank+1;
				
				//increment
				treeContent.nodes[treeContent.nodes.length]={
					keyValue: newNode,
					nodeParent: parentNode,
					nodeLeftChild: null,
					nodeRightChild: null,
					rank: 1
				};//where newNode is a key value
				//array length changed so/and (in that time) we add a new node
				//to array element with new index=.length (last was =.length-1)
				
				//treeContent.nodes[treeContent.nodes.length].nodeParent=parentNode;
					
				//must determine to what leaf (left/right) add new node
				if (parentNode.keyValue<=newNode) {
					//left leaf
					parentNode.nodeLeftChild=treeContent.nodes.length-1;//last index
				}//where newNode is a key value
				else {
					//right leaf
					parentNode.nodeRightChild=treeContent.nodes.length-1;//last index
				}

			}
			
			console.log('treeContent.nodes.length:'+treeContent.nodes.length);
    },
    outPut: function() {
			//print keys in in/decreasing order (in-order traversal)
			
			var keys='';//or []
			var i=0;//for increment counter
			
			if (typeof(treeContent.nodes[0])!=='undefined') {
			
				for (i=0;i<treeContent.nodes.length;i=i+1){
					if (i==0) {
						//keys='';
					}
					else{
						keys=keys+',';
					}
					keys=keys+treeContent.nodes[i].keyValue;
				}
				
			}
			else{
				keys='empty -- no one key found';
			}
			
      return keys;
    },
    deleteNode: function(removedNode) {
      //changeBy(-1);
    },
    min: function() {
      return min;
    },
    max: function() {
      return max;
    },
    predecessor: function(currentNode) {
      return predecessor;
    },
    successor: function(currentNode) {
      return successor;
    },
    treeRank: function() {
			if (typeof(treeContent.nodes[0])!=='undefined') {
				return treeContent.nodes[0].rank;
			}
			else {
				return 0;
			}
    },
    rank: function(currentNode) {
      return rank;
    },
    select: function() {
      return select;
    },
    search: function(keyValue) {
      return select;
    }
  };   
})(); 
/*----------------------------------------------------------------------------------------------------------*/
balancedBinaryTree.insertNode(1);
balancedBinaryTree.insertNode(3);
console.log('treeContent:'+balancedBinaryTree.outPut());//out of scope
console.log('treeRank:'+balancedBinaryTree.treeRank());
/*----------------------------------------------------------------------------------------------------------*/

function inlineTreeFromArray(treeArray,domNode){

	if (typeof(treeArray)=='undefined'){
	
		console.log(treeArray);
		
		return ;
	}
	
	if (typeof(domNode)==='undefined'){
	
		console.log('not defoned domNode for output');
		
		return ;
	}
	
	/* if (!isArray(treeArray)) {
		console.log(treeArray);
		return ;
	} */
	
	if (treeArray[0] != null){
	
		var i;
		var rootKeyIndex;
		var leftLeafIndex;
		var rightLeafIndex;
		
		var treeHeight;//startingY+nodeHeight+edgeHeight 
		var nodeHeight=1;//leftLeaf._nodeHeight
		var edgeHeight=1;
		
		//Math.pow(2, n)+' maximum # of elements on level n
		var currentLevel;
		var nodeStartPosOnLevelX;
		var nodeCurrentPosOnLevelX;
		var nodesQuantityOnLevel; //quantity	

		var new_P_Tag;
		var newSpanTag;
		var newTextNode;
		
		rootKeyIndex=0;
				
		treeHeight=0;//newPathStart.pathStartY;//30;//rootNode._nodeHeight
		nodeCurrentPosOnLevelX=nodeStartPosOnLevelX;
		
		//traverse down - from root to leafs 
		currentLevel=-1;	
		nodesQuantityOnLevel=0;//Math.pow(2, currentLevel);
		
		for (i = 0; i < treeArray.length; i++){
		
			//<p id='rootNode'>level 0 (rootNode):<span>54044</span></p>
			//nodesQuantityOnLevel was incremented on previous turn/loop iteration
			if (
				(nodesQuantityOnLevel>=Math.pow(2, currentLevel)) ||
				(i==0)
			){
		
				currentLevel=currentLevel+1;
				treeHeight=treeHeight+nodeHeight+edgeHeight;
				nodesQuantityOnLevel=0;
				
				new_P_Tag = document.createElement("p");//new string/level on tree
				new_P_Tag.setAttribute("style","text-align: center;line-height: 100%;-webkit-margin-before: 0em;-webkit-margin-after: 0em;");
				newTextNode = document.createTextNode('Level: '+currentLevel+'::');
				newSpanTag= document.createElement("span");//string/p content
				newSpanTag.setAttribute(
					"style",
					"position: absolute;"+
					"left: 10px;"
				);
				newSpanTag.appendChild(newTextNode);
				new_P_Tag.appendChild(newSpanTag);
				domNode.appendChild(new_P_Tag);
			}
			
			if (currentLevel%2===0)//even
			{
				/* To change the style of an HTML element, use this syntax:
				document.getElementById(id).style.property=new style */
				//new_P_Tag.style.background-color='#66FF33';
				//document.getElementsByTagName("INPUT")[0].setAttribute("type","button");
				new_P_Tag.setAttribute(
					"style",
					"background-color:#66FF33;"+
					"text-align: center;"+
					"line-height: 100%;"+
					"-webkit-margin-before: 0em;"+
					"-webkit-margin-after: 0em;"
				);
			}
			else//odd
			{
				//new_P_Tag.style.background-color='#66CCFF';
			
			}
			
			nodesQuantityOnLevel=nodesQuantityOnLevel+1;//add current/new array element
			
			newSpanTag= document.createElement("span");//string/p content
			newTextNode = document.createTextNode('['+treeArray[i]+']('+i+')');
			
			if (typeof(newSpanTag)!='undefined') {
				newSpanTag.appendChild(newTextNode);
				new_P_Tag.appendChild(newSpanTag);

				//domNode.appendChild(new_P_Tag);
			}

			if (nodesQuantityOnLevel%2===0)//even
			{
				//document.getElementById("myList").insertBefore(newItem,existingItem);
				/*The insertBefore() method 
				inserts a node as a child, right before an existing child, which you specify.
				Tip: 
				If you want to create a new list item, 
				with text, 
				remember to create the text as a Text node 
				witch you append to the LI element, 
				then insert the LI to the list.
				You can also 
				use the insertBefore method 
				to insert/move an existing element.*/
				
				//document.getElementById("myList1").appendChild(node);
				newSpanTag.setAttribute("style","color: red;");//draggable="true"				
				newSpanTag.setAttribute("draggable","true");//draggable="true"	
				newSpanTag.setAttribute("ondragstart","drag(event);");//draggable="true"	
				newSpanTag.setAttribute("ondrop","drop(event);");//draggable="true"	
				newSpanTag.setAttribute("ondragover","allowDrop(event);");//draggable="true"	

			}
			else//odd
			{
				newSpanTag.setAttribute("style","color: blue;");
				newSpanTag.setAttribute("draggable","true");//draggable="true"				
				newSpanTag.setAttribute("ondragstart","drag(event);");//draggable="true"	
				newSpanTag.setAttribute("ondrop","drop(event);");//draggable="true"	
				newSpanTag.setAttribute("ondragover","allowDrop(event);");//draggable="true"	
				
				newSpanTag= document.createElement("span");//string/p content
				newSpanTag.innerHTML = '{'+'<span class="yellow">'+Math.floor(i*0.5)+'</span>'+'}';//&lt;
				newSpanTag.setAttribute("style","font-weight: bold;font-size: 150%;");
				//newTextNode = document.createTextNode('{'+Math.floor(i*0.5)+'}');//&lt;
				//newSpanTag.appendChild(newTextNode);
				new_P_Tag.appendChild(newSpanTag);
			
			}
			
		}
		
	}
	
	return ;
}
/*----------------------------------------------------------------------------------------------------------*/

var sampleArray=[54044,14108,79294,29649,25260,60660,2995,53777,49689,9083];
//id='bTreeStrings'
var domNode=document.getElementById('bTreeStrings');
console.log('domNode is: '+domNode);
//inlineTreeFromArray(sampleArray,domNode);

/*----------------------------------------------------------------------------------------------------------*/
/* JavaScript statements are executed line by line. 
However, 
with effects, 
the next line of code can be run even though the effect is not finished. 
This can create errors.
To prevent this, 
you can 
create a callback function.
A callback function 
is executed after the current effect is finished. */

//function clearInlineTree(callBackFunction){
//function clearInlineTree(domNode){
	//if needed to determine exact element to clear -- pass it to function as parameter
function clearInlineTree(){
	
	var tagsP_forRemoval;
	var i;
	//document.normalize();//Removes empty Text nodes, and joins adjacent nodes
	//element.normalize();
	//domNode.normalize();
	
	//console.log('domNode.childNodes.length was:'+domNode.childNodes.length);
	if (typeof(domNode)==='undefined') {
		console.log('no target element for clear, domNode is -- undefined');
		
		return ;
	}
	
	if (domNode===null) {
		console.log('no target element for clear, domNode is -- null');
		
		return ;
	}
	
	//in Opera: Uncaught exception: TypeError: Cannot convert 'domNode' to object
	//reason/because -- DOM not loaded yet -- body tag is empty
	tagsP_forRemoval=domNode.getElementsByTagName("P");//returns a collection of all elements in the document with the specified tagname, as a NodeList object.
	//The NodeList object represents a collection of nodes. 
	//The nodes can be accessed by index numbers. 
	//The index starts at 0.
	console.log('tagsP_forRemoval.length was:'+tagsP_forRemoval.length);
	
	while (typeof(tagsP_forRemoval[0])!=='undefined') {
    //x[i].style.backgroundColor = "red";
		domNode.removeChild(tagsP_forRemoval[0]);
		
		//tagsP_forRemoval=domNode.getElementsByTagName("P");
	}
	
	//index iteration not work because .length change dynamically/constantly
	/* for (i = 0; i < tagsP_forRemoval.length; i++) {
    //x[i].style.backgroundColor = "red";
		domNode.removeChild(tagsP_forRemoval[i]);
	} */
	
	/* for (i=0;i<domNode.childNodes.length;i++){
		//#text
		//tagName: "H3"
		if (domNode.childNodes[i].tagName==='P'){
			domNode.removeChild(domNode.childNodes[i]);
		} */
		/* if (domNode.childNodes[i].nodeName=='H3'){
		}
		else if (domNode.childNodes[i].nodeName=='BUTTON'){
		}
		else if (domNode.childNodes[i].nodeName=='#text'){
		}
		else {
			domNode.removeChild(domNode.childNodes[i]);
		} */
	//}
	
	//console.log('domNode.childNodes.length is/became:'+domNode.childNodes.length);
	console.log('tagsP_forRemoval.length is/became:'+tagsP_forRemoval.length);
	
	//callBackFunction;
	//return callBackFunction;
	return ;
}

