//XIII. BALANCED BINARY SEARCH TREES (Week 5)
//balanced_binary_tree
'use strict';

/* A binary tree 
can be seen as 
a type of linked list 
where the elements are themselves linked lists of the same nature. 
The result is that 
each node may include a reference 
to the first node of one or two other linked lists, 
which, 
together with their contents, 
form the subtrees below that node. */

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
*		1.1 search for k (new/added node key value)
*				1.1.1 if find match/duplicate -- write as left child and rewrite adjusted/affected links/pointers
*		1.2 rewrite final 'null' pointer to point to new node with key 'k' 
*	2. deletion (3 different case) -
*		2.1			
*		2.2
*		2.3	
* 3. min
* 4. max
* 5. predecessor: next biggest or smallest element of the tree ('left turn')
* 6. successor
* 7. outPut in sorted order -- print keys in increasing order (in-order traversal)
*		7.1 let R=root of search tree
*				with subTree T(left) and T(right)
*			7.2.1 recurse on T(left)
*						by recursing/induction prints out keys of T(left) in increasing order
*			7.3.2 print out R-s key		
*			7.2.3 recurse on T(right)
*						by recursing/induction prints out keys of T(right) in increasing order
* 8. rank (size of node self included=left subtree+right subtree + itself) - 
*			updates on insert/delete
* 9. select -- i-th order statistic
* 10. search (and insertion) - for specific key (k) in tree (T)
* 		10.1 start at the root
* 		10.2 traverse/goto left/right pointers as needed (if key >/< at current node)
* 		10.3 return: node with key==k or null if not found
*/

/* define some public functions 
that can 
access private functions and variables, 
using/via 
closures 
which is also known as 
the module pattern */
//constructor
var balancedBinaryTree= (function () {

  var treeContent = {
		nodes:[]
	};//or [] of {} ?

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
    insertNode: function (newNode) {
			
			var parenNodeIndex;//may accidentally be changed inside some function 
			var parentNode;//name conflict ?
			var currentNodeIndex=0;//for root/start
			
			var rankIncrementCounter=0;
			
			function rankIncrement(nodeIndex){
				
				var rankedNode;//name conflict ? Scope ?
				
				//must not exceed array length
				if (rankIncrementCounter>100){
				
					console.log('Iteration count for rank increment exceed 100');
				}
			
				rankedNode=treeContent.nodes[nodeIndex];
				/* parentNode.rank=parentNode.rank+1; */
				
				if (nodeIndex==0){
					//last step -- root (climbed to topmost node)
					rankedNode.rank=rankedNode.rank+1;
				}
				else if (nodeIndex>0){
				
					rankedNode.rank=rankedNode.rank+1;
					nodeIndex=rankedNode.nodeParent;
					
					//recursion
					//careful because may never end
					rankIncrement(nodeIndex);
					
				}
			}
			
			//check for first node existence/presence 
      if (typeof(treeContent.nodes[0])==='undefined'){
				//simple case
				//first/root node 
								
				//increment
				treeContent.nodes[treeContent.nodes.length]={
					keyValue: newNode,
					nodeParent: null,
					nodeLeftChild: null,
					nodeRightChild: null,
					rank: 1
				};//where newNode is a key value
			
				//currentNodeIndex=currentNodeIndex+1==0;
				/* console.log(
				'Root node. Key '+newNode+' added as root ('+newNode+')['+currentNodeIndex+'] node. '+
				'Tree rank is: '+
				treeContent.nodes[currentNodeIndex].rank
				); */
				//console.log('treeContent.nodes.length:'+treeContent.nodes.length);
			}
			else
			{
				//must preserve search tree property -- 
					/* *				all left keys less then parent node (x), 
					*				all right keys greater then (x) */
				//search tree for place to new node/key
				var keyFound=false;
				var placePointerFound=false;
				
				var lastNullPointer=-1;//to left/right child/leaf //-1==no such index in array 
				
				//simple case no duplicate key values -- all unique
				var previousTreeRank=treeContent.nodes[0].rank;
				
				var whileCounter=0;
				//while (lastNullPointer===-1) {
				while (previousTreeRank==treeContent.nodes[0].rank) {
				
					parenNodeIndex=currentNodeIndex;
					parentNode=treeContent.nodes[currentNodeIndex];//last index in array					
										
					//treeContent.nodes[treeContent.nodes.length].nodeParent=parentNode;
						
					//must determine to what leaf (left/right) add new node
					if (parentNode.keyValue>=newNode) {
						//newNode less or equal then 'k'
						//left leaf
						
						if (parentNode.nodeLeftChild==null) {
							//found place for/to put/add new node 
							
							keyFound=false;
							placePointerFound=true;
							lastNullPointer=null;
							
							//currentNodeIndex=currentNodeIndex+1;//==treeContent.nodes.length
							
							//increment
							treeContent.nodes[treeContent.nodes.length]={
								keyValue: newNode,
								nodeParent: parenNodeIndex,
								nodeLeftChild: null,
								nodeRightChild: null,
								rank: 1
							};//where newNode is a key value
							//array length changed so/and (in that time) we add a new node
							//to array element with new index=.length (last was =.length-1)
							
							//changed for each upper node in chain
							//parentNode.rank=parentNode.rank+1;//after new nod added in right place
							rankIncrement(parenNodeIndex);							
							
							//currentNodeIndex==treeContent.nodes.length-1
							parentNode.nodeLeftChild=treeContent.nodes.length-1;//last/new available index
							
							/* console.log(
								'Left node '+newNode+
								' added as left child/leaf to ('+parentNode.keyValue+')['+parenNodeIndex+'] parent node. '+
								'Tree rank is: '+
								treeContent.nodes[0].rank
							); */
							
							break;//node added so exit 'while' loop
						
						}
						else {
							//search for next place to add new node
							currentNodeIndex=parentNode.nodeLeftChild;
							//parenNodeIndex=currentNodeIndex;
							
							//continue ;
						}
						
					}//where newNode is a key value
					else if (parentNode.keyValue<newNode){
						//newNode greater then 'k'
					
						//right leaf
						
						if (parentNode.nodeRightChild==null) {
							//found place for/to put/add new node
							
							keyFound=false;
							placePointerFound=true;
							
							lastNullPointer=null;
							
							//currentNodeIndex=currentNodeIndex+1;//==treeContent.nodes.length
							
							//increment
							treeContent.nodes[treeContent.nodes.length]={
								keyValue: newNode,
								nodeParent: parenNodeIndex,
								nodeLeftChild: null,
								nodeRightChild: null,
								rank: 1
							};//where newNode is a key value
							//array length changed so/and (in that time) we add a new node
							//to array element with new index=.length (last was =.length-1)

							//parentNode.rank=parentNode.rank+1;//after new nod added in right place
							rankIncrement(parenNodeIndex);
							
							//currentNodeIndex==treeContent.nodes.length-1
							parentNode.nodeRightChild=treeContent.nodes.length-1;//last/new available index
							
							/* console.log(
								'Right node '+newNode+
								' added as right child/leaf to ('+parentNode.keyValue+')['+parenNodeIndex+'] parent node. '+
								'Tree rank is: '+
								treeContent.nodes[0].rank
							); */
							
							break;//node added so exit 'while' loop
						
						}
						else { //if (parentNode.nodeRightChild!==null) {
							//search for next place to add new node
							currentNodeIndex=parentNode.nodeRightChild;
							//parenNodeIndex=currentNodeIndex;
							
							//continue ;
						}
						
					}
					
					whileCounter=whileCounter+1;
					if (whileCounter==100){
						break;
					}
				}
				
			}
			
			//console.log('treeContent.nodes.length:'+treeContent.nodes.length);
    },
    outPutAscending: function() {
			//print keys in in/decreasing order (in-order traversal)
			
			//for Ascending Order. Arranged from smallest to largest
			
			var keys='';//or []
			var i=0;//for increment counter
			var currentNodeIndex=0;
			
			var rootIdex=-1;
			var leftSubTree=-1;//what about rank ?
			var rightSubTree=-1;//what about rank ?		
			
			var flagAllLeftDone=false;
			var flagAllRootDone=false;
			var flagAllRightDone=false;
			
			var printSubTreeCounter=0;
			var searchStatus={
				leftSideDone: false,
				rootPrinted: false,
				rightSideDone: false
			};//'startAtRoot';
			
			//for recursive traversal
			//subTree not a array its an Object element of Array
			//or pass 'currentNodeIndex' as parameter pointer to element in array
			//function printSubTree(subTree) {
			function printSubTree(nodeIndex) {
				//:first go to left until
				//(when) no left side present, then:
				//print current root node key, then:
				//check right side 
				//if present -- (goto :first)
				//else return to previous position, where last :first started
			
				printSubTreeCounter=printSubTreeCounter+1;
				if (printSubTreeCounter>100) {
				
					console.log('itreation count exceed 100');
					return;//accidentally malfunction - unexpected/unpredicted
				}
				
				if (treeContent.nodes[nodeIndex].nodeLeftChild==null) {
					//last left node found
					//print current (as root)
					//check right child/leaf
					
					//searchStatus='leftSideDone';
					//searchStatus='rootDone';
					searchStatus.leftSideDone=true;
					
					keys=keys+'node['+i+'] key='+treeContent.nodes[nodeIndex].keyValue+';';
					
					searchStatus.rootPrinted=true;
					console.log(
						'No left child for ('+treeContent.nodes[nodeIndex].keyValue+')['+nodeIndex+']'+
						' Iteration #:'+printSubTreeCounter
					);
					console.log('Continue search. SubTree root keys is: '+keys);
					
					if (treeContent.nodes[nodeIndex].nodeRightChild==null) {
						
						console.log(
							'No right child for ('+treeContent.nodes[nodeIndex].keyValue+
							')['+currentNodeIndex+']'+
							' Iteration #:'+printSubTreeCounter
						);
						
						//rightSideDone=true;
						//searchStatus='rightSideDone';
						searchStatus.rightSideDone=true;
						
						//return searchStatus;//on previous recursion/iteration level;	
					}
					else {//if (treeContent.nodes[nodeIndex].nodeRightChild!==null) {
					
						nodeIndex=treeContent.nodes[nodeIndex].nodeRightChild;
						console.log(
							'Going right to the ('+treeContent.nodes[nodeIndex].keyValue+
							')['+nodeIndex+']'
						);

						printSubTree(nodeIndex);
					}
					//return ;	
					
				}
				else {//if (treeContent.nodes[nodeIndex].nodeLeftChild!==null) {
				
					nodeIndex=treeContent.nodes[nodeIndex].nodeLeftChild;
					console.log(
						'Going left to the ('+treeContent.nodes[nodeIndex].keyValue+
						')['+nodeIndex+']'+
						' Iteration #:'+printSubTreeCounter
					);
					
					//recursion.
					//may stuck	on never ending endless loop				
					printSubTree(nodeIndex);
				}
			}
			
			if (typeof(treeContent.nodes[0])!=='undefined') {
			
				printSubTree(currentNodeIndex);
				//console.log('continue search. keys is: '+keys);
				
				//treeContent.nodes.length-1 iteration ?
				i=treeContent.nodes.length;
				for (;i<treeContent.nodes.length;){
					//1) go to leftmost element
						//1.1 while left child pointer !==null, assign current nod as new 'root' (for current subtree)
					//2) when left child pointer ==null print current node key (as root)
						//2.2 if left child pointer !==null, then that nod assigned as current 'root' 
					//3) then go to right leaf/child of current 'root'
						//3.1 if right child pointer ==null print current node key (as root)
						//3.2 return on previous/upper level of recursion 
					//4) if it has a left child, then that nod assigned as current 'root'  
					//5) return on previous/upper level of recursion 
					
					if (treeContent.nodes[currentNodeIndex].nodeLeftChild==null) {
						//last left node print out and -- go to 'root'
					
						
					
					}
					else if (treeContent.nodes[currentNodeIndex].nodeLeftChild!==null) {
						//go down to left
						currentNodeIndex=treeContent.nodes[currentNodeIndex].nodeLeftChild;
						
						/*The continue statement 
						breaks one iteration (in the loop), 
						if a specified condition occurs, 
						and continues with the next iteration in the loop.*/
						continue; //check for never ending loop/endless
					}
					
					if (currentNodeIndex==0) {
						//keys='';
					}
					else {
						/* keys=keys+','; */
					}
					
					/* keys=keys+'node['+i+'] key='+treeContent.nodes[currentNodeIndex].keyValue; */
					
					i=i+1;
				}
				
			}
			else{
				keys='empty -- no one node with key found';
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
			//changed for each upper node in chain
			//when child node added
			
      return rank;
    },
    select: function() {
      return select;
    },
    search: function(keyValue) {
		
			var flagKeyFound=false;
			var flagEndOfTree=false;//or .rank==1
			
			var flagKeyNotFound=true;
			var flagNotEndOfTree=true;//or .rank>1
			
			var currentNodeIndex;
			
			//has any node
			if (typeof(treeContent.nodes[0])!=='undefined') {
			
				currentNodeIndex=0;//root
				
				var whileCounter=0;
				while (
					flagKeyNotFound && 
					flagNotEndOfTree && 
					whileCounter<100
				){
				
					if (keyValue==treeContent.nodes[currentNodeIndex].keyValue){
						//found
						flagKeyNotFound=false;
						flagKeyFound=true;
					}
					else if (keyValue<treeContent.nodes[currentNodeIndex].keyValue){
						//left leaf/child
						if (treeContent.nodes[currentNodeIndex].nodeLeftChild==null){
						
							console.log(
								'left leaf/child of ('+
								treeContent.nodes[currentNodeIndex].keyValue+
								')['+currentNodeIndex+']'+
								' is null -- end of tree. Nowhere else to search for '+
								keyValue+'.'
							);
							flagNotEndOfTree=false;//end of tree
							flagEndOfTree=true;
						}
						else {
							//continue search
							currentNodeIndex=treeContent.nodes[currentNodeIndex].nodeLeftChild;
						}
					}
					else if (keyValue>treeContent.nodes[currentNodeIndex].keyValue){
						//right leaf/child
						if (treeContent.nodes[currentNodeIndex].nodeRightChild==null){
						
							console.log(
								'right leaf/child of ('+
								treeContent.nodes[currentNodeIndex].keyValue+
								')['+currentNodeIndex+']'+
								' is null -- end of tree. Nowhere else to search for '+
								keyValue+'.'
							);
							flagNotEndOfTree=false;//end of tree
							flagEndOfTree=true;
							
						}
						else {
							//continue search
							currentNodeIndex=treeContent.nodes[currentNodeIndex].nodeRightChild;
						}
					}
					
					whileCounter=whileCounter+1;//for/to break never ending loop
					if (whileCounter==100) {
						break;//for/to break never ending loop
					}
					
				}
				
				if (flagKeyNotFound==false) {
				//if (flagKeyFound) {
					console.log(
						'search result for key '+
						keyValue+
						' is: found in node ('+
						treeContent.nodes[currentNodeIndex].keyValue+
						') with index [ '+
						currentNodeIndex+']'
					);
					
					return treeContent.nodes[currentNodeIndex].keyValue;
				}
				else if (flagNotEndOfTree){
				
					console.log('search result for key '+keyValue+' is: '+null+' not found');
					return null;
				}
				
			}
			else {
			
				console.log('search result for key '+keyValue+' is: tree empty. No place for search.');
				return null;
			}
			
    }
  };   
})(); 
/*----------------------------------------------------------------------------------------------------------*/

//balancedBinaryTree
/*----------------------------------------------------------------------------------------------------------*/
/* balancedBinaryTree.insertNode(7);
balancedBinaryTree.insertNode(5);
balancedBinaryTree.insertNode(11);
balancedBinaryTree.insertNode(1);
balancedBinaryTree.insertNode(3); */

var sampleArray=[54044,14108,79294,29649,25260,60660,2995,53777,49689,9083];
var i;//check for double/repeated declaration  

for (i=0;sampleArray.length>i;i=i+1){
	balancedBinaryTree.insertNode(sampleArray[i]);
}

console.log('treeContent in Ascending order:'+balancedBinaryTree.outPutAscending());//out of scope

console.log('treeRank or root node rank is:'+balancedBinaryTree.treeRank());

var findKey;
findKey=3;
console.log('find key '+findKey+' in tree result: '+balancedBinaryTree.search(3));
findKey=4;
console.log('find key '+findKey+' in tree result: '+balancedBinaryTree.search(4));
findKey=0;
console.log('find key '+findKey+' in tree result: '+balancedBinaryTree.search(0));
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

//id='bTreeStrings'
var domNode=document.getElementById('bTreeStrings');
/* console.log('domNode is: '+domNode); */
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

