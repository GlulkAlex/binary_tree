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
* 5. predecessor: next smallest element of the tree ('left turn')
* 6. successor: next biggest element of the tree 
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
var balancedBinaryTree = (function () {

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
		treeContent: function() {
			//method ()
      return treeContent;//for debugging purpose 
    },//treeContent /* end */
		treeToHeap: function() {
		/* 
			level 0 (rootNode):	54044[0]rank=10;(0)
			level 1:	14108[1]rank=7;(1)	79294[2]rank=2;(2)
			level 2:	2995[6]rank=2;(3)	29649[3]rank=4;(4)	60660[5]rank=1;(5)	
			level 3:		9083[9]rank=1;(6)	25260[4]rank=1;(7)	53777[7]rank=2;(8)				
			level 4:							49689[8]rank=1;(9)									
		 */
			// method
			var treeHeap=[];
			/* treeContent.nodes[nodeIndex].nodeParent */
			var nodeIndex;
			var iterationCounter=0;
			nodeIndex=0;//root
			//treeHeap.length=treeContent.nodes.length;
			//for () {}
			
			//for recursive use
			function fillHeap(nodeIndex) {
				if (iterationCounter>50) {
					console.log('iterationCounter exceed '+iterationCounter);
					return;
				}
				iterationCounter=iterationCounter+1;
				
				treeHeap.length=treeHeap.length+1;//add one new element of array
				//assign value to last element
				treeHeap[treeHeap.length-1]=treeContent.nodes[nodeIndex].keyValue;
				//left side first
				if (treeContent.nodes[nodeIndex].nodeLeftChild) {
					/* nodeIndex=treeContent.nodes[nodeIndex].nodeRightChild; */
					fillHeap(treeContent.nodes[nodeIndex].nodeLeftChild);
				}
				if (treeContent.nodes[nodeIndex].nodeRightChild) {
					//nodeIndex=treeContent.nodes[nodeIndex].nodeRightChild;
					fillHeap(treeContent.nodes[nodeIndex].nodeRightChild);
				}
			}//function /* end */ fillHeap()
			
			fillHeap(nodeIndex);
      return treeHeap;//for debugging purpose 
    },//treeToHeap /* end */
		treeToHash: function() {
			// method
			var treeHash=[];
			treeHash.length=treeContent.nodes.length;
			//for () {}
			Array.prototype.forEach.call(
				treeContent.nodes, 
				function(
					el, 
					i
				){
					//find/assign index in 'treeHash' or level of tree or tree height (longest path from root to leaf)
					/* el.nodeParent; */
					//treeHash[i]=el.keyValue;
				}
			);
      return treeToHash;//for debugging purpose 
    },//treeToHash /* end */
		nodeParent: function() {
			// property
      return nodeParent;
    },
		nodeLeftChild: function() {
			//property
      return nodeLeftChild;
    },
		nodeRightChild: function() {
			//property
      return nodeRightChild;
    },
		treeHeight: function() {
      return treeHeight;
    },
    insertNode: function (newNode) {
			//method
			var parenNodeIndex,//may accidentally be changed inside some function 
					parentNode,//name conflict ?
					currentNodeIndex = 0,//for root/start
			
					rankIncrementCounter = 0;
			
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
			}//rankIncrement /* end */
			
			//check for first node existence/presence 
      if (typeof(treeContent.nodes[0])==='undefined'){//.length > 0
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
			}//if /* end */ (typeof(treeContent.nodes[0])==='undefined')
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
						
						}//if /* end */ (parentNode.nodeLeftChild==null)
						else {
							//search for next place to add new node
							currentNodeIndex=parentNode.nodeLeftChild;
							//parenNodeIndex=currentNodeIndex;
							
							//continue ;
						}
						
					}//if /* end */ (parentNode.keyValue>=newNode) //where 'newNode' is a key value
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
						
						}//if /* end */ (parentNode.nodeRightChild==null)
						else { //if (parentNode.nodeRightChild!==null) {
							//search for next place to add new node
							currentNodeIndex=parentNode.nodeRightChild;
							//parenNodeIndex=currentNodeIndex;
							
							//continue ;
						}
						
					}//else if /* end */ (parentNode.keyValue<newNode)
					
					whileCounter=whileCounter+1;
					if (whileCounter==100){
						break;
					}
				}//while /* end */ (previousTreeRank==treeContent.nodes[0].rank)				
			}//else /* end */			
			//console.log('treeContent.nodes.length:'+treeContent.nodes.length);
    },//insertNode: /* end */
    outPutAscending: function() {
			//print keys in in/decreasing order (in-order traversal)			
			//for Ascending Order. Arranged from smallest to largest
			
			var keys='';//return value //or [] //must be in scope for underlying functions
			
			var printSubTreeCounter=0;
			var iterationCounter=0;
						
			//for recursive traversal
			//subTree not an array it is an Object element of Array
			//or pass 'currentNodeIndex' as parameter pointer to element in array
			function searchLeft(nodeIndex) {
				iterationCounter=iterationCounter+1;//by fact of invoking 
				//return false;
			}
						
			function checkRight(nodeIndex) {
				//iterationCounter=iterationCounter+1;//by fact of invoking 
				
				//check for right side/subtree
				if (treeContent.nodes[nodeIndex].nodeRightChild==null) {//no right subtree
					//recursion/next iteration
					//go up to ancestor
					printSubTree(
						treeContent.nodes[nodeIndex].nodeParent,
						nodeIndex
					);
				}
				else if (treeContent.nodes[nodeIndex].nodeRightChild!==null) {//go to the right subtree
					//recursion/next iteration
					//go to the right subtree
					printSubTree(
						treeContent.nodes[nodeIndex].nodeRightChild,
						nodeIndex
					);
				}					
			}//function /* end */ checkRight(nodeIndex)
			
			function printNodeKey(nodeIndex) {
				if (
					nodeIndex==undefined ||
					nodeIndex==null
				) {
					console.log(
						'nodeIndex for treeContent.nodes[nodeIndex] is '+
						nodeIndex
					);
				}
				else {
					keys=keys+
					'node index['+nodeIndex+
					']='+treeContent.nodes[nodeIndex].keyValue+
					':parent index['+treeContent.nodes[nodeIndex].nodeParent+
					'];';
					//console.log('keys:'+keys);					
					//return keys;//not necessary 
				}				
			}//function /* end */ printNodeKey(nodeIndex)
						
			function printSubTree(nodeIndex,operationIndex) {
				// 54044 index=self go Left index==Lleaf Print 
					//index=self go Right index==Rleaf go up 
					//Parent=null -- done
				// ...
				// 79294 index==parent index=self go Left index==Lleaf Print index=self go up
				// 60660 index==parent go Left L=null Print go Right R=null index=self go up
							
				iterationCounter=iterationCounter+1;
				printSubTreeCounter=printSubTreeCounter+1;
				//anti/prevent endless loop
				if (
					printSubTreeCounter>50||
					iterationCounter>50
				) {
				
					console.log('itreation count exceed '+iterationCounter+' or '+printSubTreeCounter);
					return;//accidentally malfunction - unexpected/unpredicted
				}
				console.log('itreation #'+iterationCounter);
				
				//figuring out what way to go (traversal to choose)
				if (
					operationIndex==treeContent.nodes[nodeIndex].nodeParent ||
					operationIndex==nodeIndex
				) {//from root to subtree
				
					//check for last step/completion 
					if (
						treeContent.nodes[nodeIndex].nodeParent==null && 
						keys!==''
					) {
						return keys;//done sorting
					}
					else if (treeContent.nodes[nodeIndex].nodeParent!==null) {
					}
						
					//:L -- not search yet
					if (treeContent.nodes[nodeIndex].nodeLeftChild==null) {
						//left side search -- done
						
						//print key
						printNodeKey(nodeIndex);
						
						//check for right side/subtree
						checkRight(nodeIndex);
						/* if (treeContent.nodes[nodeIndex].nodeRightChild==null) {//no right subtree
							//recursion/next iteration
							//go up to ancestor
							printSubTree(
								treeContent.nodes[nodeIndex].nodeParent,
								nodeIndex
							);
						}
						else if (treeContent.nodes[nodeIndex].nodeRightChild!==null) {//go to the right subtree
							//recursion/next iteration
							//go to the right subtree
							printSubTree(
								treeContent.nodes[nodeIndex].nodeRightChild,
								nodeIndex
							);
						}		 */										
					}//if /* end */ (treeContent.nodes[nodeIndex].nodeLeftChild==null)
					else if (treeContent.nodes[nodeIndex].nodeLeftChild!==null){
						//recursion/next iteration 
						//change current root to =treeContent.nodes[nodeIndex].nodeLeftChild 
						//and descent to the left
						printSubTree(
							treeContent.nodes[nodeIndex].nodeLeftChild,
							nodeIndex
						);
					}//if /* end */ (treeContent.nodes[nodeIndex].nodeLeftChild==null)
				}//if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeParent)
				else if (operationIndex==treeContent.nodes[nodeIndex].nodeLeftChild) {//ascending from left subtree
						//print key
						printNodeKey(nodeIndex);

						//check for right side/subtree
						checkRight(nodeIndex);
						/* if (treeContent.nodes[nodeIndex].nodeRightChild==null) {//no right subtree
							//recursion/next iteration
							//go up to ancestor
							printSubTree(
								treeContent.nodes[nodeIndex].nodeParent,
								nodeIndex
							);
						}
						else if (treeContent.nodes[nodeIndex].nodeRightChild!==null) {//go to the right subtree
							//recursion/next iteration
							//go to the right subtree
							printSubTree(
								treeContent.nodes[nodeIndex].nodeRightChild,
								nodeIndex
							);
						} */
						
				}//else if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeLeftChild)
				else if (operationIndex==treeContent.nodes[nodeIndex].nodeRightChild) {//ascending from right subtree
					//check for last step/completion 
					if (
						treeContent.nodes[nodeIndex].nodeParent==null && 
						keys!==''
					) {
						return keys;//done sorting
					}
					else if (treeContent.nodes[nodeIndex].nodeParent!==null) {
						//recursion/next iteration
						//go up to ancestor
						printSubTree(
							treeContent.nodes[nodeIndex].nodeParent,
							nodeIndex
						);
					}
				}//else if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeRightChild)
			}//function /* end */ printSubTree(nodeIndex) 
			
			function checkNodeCase(nodeIndex) {
			
			}//function /* end */ checkNodeCase(nodeIndex)
			
			//function printSubTree(subTree) {
			function printSubTree_Old(nodeIndex) {
				//:first go to left until
				//(when) no left side present, then:
				//print current root node key, then:
					//check right side 
						//if present -- (goto :first for subtree)
						//else return to previous position, where last :first started
				
				/* 
				cases:
					1) node has both: left and right child/leaf
						1.1) if left branch not searched yet -- change root to left subtree (and search left)
						1.2) 	else
								1.2.1) if right branch not searched yet -- print node key and 
								change root to right subtree (and search left)
								
								1.2.2) 	else -- go up (to parent node) with flag/status 
								that all in subtree was searched and printed
							
					2) node has only: left child/leaf
						2.1) if left branch not searched yet -- change root to left subtree (and search left)
						2.2) 	else -- print node key and 
								go up with flag/status that all in subtree was searched and printed
								
					3) node has only: right child/leaf
						3.1) if right branch not searched yet -- print node key and 
						change root to right subtree (and search left)
						3.2)	else -- go up (to parent node) with flag/status 
						that all in subtree was searched and printed
						
					4) node has no any child/leaf -- print node key and 
					go up (to parent node) with flag/status that all in subtree was searched and printed
					(to previous unchecked branch/child/node/leaf) 
				*/
					
			}//function /* end */ printSubTree_Old(nodeIndex)
				
			//**************************************************************************************************************/
			if (1===0) {//code block /* disable */
			
			}//code block /* disable */
			//**************************************************************************************************************/
				
			if (typeof(treeContent.nodes[0])!==undefined) {//.length > 0 
			/* 
			if (typeof(treeContent.nodes.item(0)!= null)) {//.length > 0 //Uncaught TypeError: undefined is not a function 
			*/
			
				printSubTree(0,0);//for/from 'root'
				
					//1) go to leftmost element
						//1.1 while left child pointer !==null, assign current nod as new 'root' (for current subtree)
					//2) when left child pointer ==null print current node key (as root)
						//2.2 if left child pointer !==null, then that nod assigned as current 'root' 
					//3) then go to right leaf/child of current 'root'
						//3.1 if right child pointer ==null print current node key (as root)
						//3.2 return on previous/upper level of recursion 
					//4) if it has a left child, then that nod assigned as current 'root'  
					//5) return on previous/upper level of recursion 
										
					/* keys=keys+'node['+i+'] key='+treeContent.nodes[currentNodeIndex].keyValue; */									
			}//if /* end */ (typeof(treeContent.nodes.item(0)!= null)
			else {
				keys='empty -- no one node with key found';
			}//else /* end */
			
      return keys;
    },//outPutAscending: method /* end */
    outPutDescending: function() {
			//print keys in increasing order (in-order traversal)			
			//for Descending Order. Arranged from largest to smallest 
			
			var keys='';//return value //or [] //must be in scope for underlying functions			
			var printSubTreeCounter=0;
			var iterationCounter=0;
												
			function checkLeft(nodeIndex) {
				//iterationCounter=iterationCounter+1;//by fact of invoking 				
				//check for right side/subtree
				if (treeContent.nodes[nodeIndex].nodeLeftChild==null) {//no left subtree
					//recursion/next iteration
					//go up to ancestor
					printSubTree(
						treeContent.nodes[nodeIndex].nodeParent,
						nodeIndex
					);
				}
				else if (treeContent.nodes[nodeIndex].nodeLeftChild!==null) {//go to the left subtree
					//recursion/next iteration
					//go to the left subtree
					printSubTree(
						treeContent.nodes[nodeIndex].nodeLeftChild,
						nodeIndex
					);
				}					
			}//function /* end */ checkLeft(nodeIndex)
			
			function printNodeKey(nodeIndex) {
				if (
					nodeIndex==undefined ||
					nodeIndex==null
				) {
					console.log(
						'nodeIndex for treeContent.nodes[nodeIndex] is '+
						nodeIndex
					);
				}
				else {
					keys=keys+
					'node index['+nodeIndex+
					']='+treeContent.nodes[nodeIndex].keyValue+
					':parent index['+treeContent.nodes[nodeIndex].nodeParent+
					'];';
					//console.log('keys:'+keys);					
					//return keys;//not necessary 
				}				
			}//function /* end */ printNodeKey(nodeIndex)
						
			function printSubTree(nodeIndex,operationIndex) {							
				iterationCounter=iterationCounter+1;
				printSubTreeCounter=printSubTreeCounter+1;
				//anti/prevent endless loop
				if (
					printSubTreeCounter>50||
					iterationCounter>50
				) {				
					console.log('itreation count exceed '+iterationCounter+' or '+printSubTreeCounter);
					return;//accidentally malfunction - unexpected/unpredicted
				}
				console.log('itreation #'+iterationCounter);				
				//figuring out what way to go (traversal to choose)
				if (
					operationIndex==treeContent.nodes[nodeIndex].nodeParent ||
					operationIndex==nodeIndex
				) {//from root to subtree				
					//check for last step/completion 
					if (
						treeContent.nodes[nodeIndex].nodeParent==null && 
						keys!==''
					) {
						return keys;//done sorting
					}
					else if (treeContent.nodes[nodeIndex].nodeParent!==null) {
					}						
					//:Right subTree -- not search yet
					if (treeContent.nodes[nodeIndex].nodeRightChild==null) {
						//right side search -- done						
						//print key
						printNodeKey(nodeIndex);						
						//check for left side/subtree
						checkLeft(nodeIndex);								
					}//if /* end */ (treeContent.nodes[nodeIndex].nodeRightChild==null)
					else if (treeContent.nodes[nodeIndex].nodeRightChild!==null){
						//recursion/next iteration 
						//change current root to =treeContent.nodes[nodeIndex].nodeRightChild 
						//and descent to the right
						printSubTree(
							treeContent.nodes[nodeIndex].nodeRightChild,
							nodeIndex
						);
					}//if /* end */ (treeContent.nodes[nodeIndex].nodeRightChild==null)
				}//if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeParent)
				else if (operationIndex==treeContent.nodes[nodeIndex].nodeRightChild) {//ascending from right subtree
						//print key
						printNodeKey(nodeIndex);
						//check for left side/subtree
						checkLeft(nodeIndex);						
				}//else if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeLeftChild)
				else if (operationIndex==treeContent.nodes[nodeIndex].nodeLeftChild) {//ascending from left subtree
					//check for last step/completion 
					if (
						treeContent.nodes[nodeIndex].nodeParent==null && 
						keys!==''
					) {
						return keys;//done sorting
					}
					else if (treeContent.nodes[nodeIndex].nodeParent!==null) {
						//recursion/next iteration
						//go up to ancestor
						printSubTree(
							treeContent.nodes[nodeIndex].nodeParent,
							nodeIndex
						);
					}
				}//else if /* end */ (operationIndex==treeContent.nodes[nodeIndex].nodeRightChild)
			}//function /* end */ printSubTree(nodeIndex) 
			
			//if (typeof(treeContent.nodes[0])!==undefined) {//.length > 0 
			
			if (typeof(treeContent.nodes[0]!== null)) {//.length > 0 
			
			
				printSubTree(0,0);//for/from 'root'				
			}//if /* end */ (typeof(treeContent.nodes.item(0)!= null)
			else {
				keys='empty -- no one node with key found';
			}//else /* end */			
      return keys;
    },//outPutDescending: method /* end */		
    deleteNode: function(removedNode) {
      //changeBy(-1);
    },
    min: function() {
			//not a property but method
			/* 
			min=null;
			min='Tree is empty. Nothing return.'; 
			*/
			var nodeIndex=0;//root //scope?
			
			if (typeof(treeContent.nodes[0])!==null) {//.length > 0 
				while (treeContent.nodes[nodeIndex].nodeLeftChild!==null) {
					nodeIndex=treeContent.nodes[nodeIndex].nodeLeftChild;
				}
				return treeContent.nodes[nodeIndex].keyValue;
			}
			else {
				return 'Tree is empty.' + "Nothing return.";
			}
      //return min;
    },
    max: function() {
      var nodeIndex=0;//root //scope?
			
			if (typeof(treeContent.nodes[0])!==null) {//.length > 0 
				while (treeContent.nodes[nodeIndex].nodeRightChild!==null) {
					nodeIndex=treeContent.nodes[nodeIndex].nodeRightChild;
				}
				return treeContent.nodes[nodeIndex].keyValue;
			}
			else {
				return 'Tree is empty. Nothing return.';
			}
    },
    predecessor: function(nodeKey) {
			//predecessor of key 'k'
				//1)easy case:
					// if k's left subTree -- non empty,
					// return=max key in left subtree (when first time turn/descend left)
				//2)otherwise/else case:
					// folow parent pointers until 
					// parent key became less then 'k'
			var nodeIndex;//=0;//root //scope?
			var k=balancedBinaryTree.search(nodeKey);//tree node (object)
			
			/* if (typeof(treeContent.nodes[0])!==null) {//.length > 0 */ 
			if (k!==null) {
				/* if (treeContent.nodes[nodeIndex].nodeLeftChild!==null) {//left subTree -- non empty */
				if (k.nodeLeftChild!==null) {//left subTree -- non empty
					/* nodeIndex=treeContent.nodes[nodeIndex].nodeLeftChild; */
					nodeIndex=k.nodeLeftChild;
					return treeContent.nodes[nodeIndex].keyValue;
				}//if /* end */
				/* else if (treeContent.nodes[nodeIndex].nodeLeftChild==null) { */
				else if (k.nodeLeftChild==null) {
					/* while (treeContent.nodes[treeContent.nodes[nodeIndex].nodeParent].keyValue>=currentNode) { */
					while (treeContent.nodes[k.nodeParent].keyValue>=nodeKey) {
						/* nodeIndex=treeContent.nodes[nodeIndex].nodeParent; */
						k=k.nodeParent;
					}
					/* return treeContent.nodes[nodeIndex].keyValue; */
					return k.keyValue;
				}//else if  /* end */
				
			}//if /* end */
			else {
				return 'Tree is empty. Nothing return.';
			}
      return ;
    },//predecessor: /* end */
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
			//return=node with 'keyValue' or null
		
			var flagKeyFound=false,
					flagEndOfTree=false,//or .rank==1
			
					flagKeyNotFound=true,
					flagNotEndOfTree=true,//or .rank>1
			
					currentNodeIndex;
			
			//has any node
			if (typeof(treeContent.nodes[0])!=='undefined') {//.length > 0			
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
						}//if /* end */ (treeContent.nodes[currentNodeIndex].nodeLeftChild==null)
						else {
							//continue search
							currentNodeIndex=treeContent.nodes[currentNodeIndex].nodeLeftChild;
						}
					}//else if /* end */ (keyValue<treeContent.nodes[currentNodeIndex].keyValue)
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
							
						}//if /* end */ (treeContent.nodes[currentNodeIndex].nodeRightChild==null)
						else {
							//continue search
							currentNodeIndex = treeContent
																	.nodes[currentNodeIndex]
																		.nodeRightChild;
						}
					}//else if /* end */ (keyValue>treeContent.nodes[currentNodeIndex].keyValue)
					
					whileCounter=whileCounter+1;//for/to break never ending loop
					if (whileCounter == 100) {
						break;//for/to break never ending loop
					}
					
				}//while /* end */
				
				if (flagKeyNotFound == false) {
				//if (flagKeyFound) {
					console.log(
						'search result for key ' +
						keyValue+
						' is: found in node (' +
						treeContent.nodes[currentNodeIndex].keyValue +
						') with index [' +
						currentNodeIndex + ']'
					);
					
					return treeContent.nodes[currentNodeIndex];//.keyValue;
				}//if /* end */ (flagKeyNotFound==false)
				else if (flagNotEndOfTree){				
					console.log('search result for key ' + keyValue + ' is: ' + null + ' not found');
					return null;
				}//else if /* end */ (flagNotEndOfTree)				
			}//if /* end */ (typeof(treeContent.nodes[0])!=='undefined')
			else {			
				console.log('search result for key '+keyValue+' is: tree empty. No place for search.');
				return null;
			}//else /* end */
			
    }//search: /* end */
  };   
})(); //var /* end */ balancedBinaryTree 
/*----------------------------------------------------------------------------------------------------------*/

//for HASH array, not for binary tree
function inlineTreeFromArray(treeArray, domNode){

	if (typeof(treeArray) == 'undefined'){	
		console.log(treeArray);		
		return ;
	}
	
	if (typeof(domNode) === 'undefined'){	
		console.log('not defoned domNode for output');		
		return ;
	}
	
	/* if (!isArray(treeArray)) {
		console.log(treeArray);
		return ;
	} */
	
	if (treeArray[0] != null){//.length > 0
	
		var i,
				rootKeyIndex,
				leftLeafIndex,
				rightLeafIndex,
		
				treeHeight,//startingY+nodeHeight+edgeHeight 
				nodeHeight=1,//leftLeaf._nodeHeight
				edgeHeight=1,
		
		//Math.pow(2, n)+' maximum # of elements on level n
				currentLevel,
				nodeStartPosOnLevelX,
				nodeCurrentPosOnLevelX,
				nodesQuantityOnLevel, //quantity	

				new_P_Tag,
				newSpanTag,
				newTextNode;
		
		rootKeyIndex = 0;
				
		treeHeight = 0;//newPathStart.pathStartY;//30;//rootNode._nodeHeight
		nodeCurrentPosOnLevelX = nodeStartPosOnLevelX;
		
		//traverse down - from root to leafs 
		currentLevel = - 1;	
		nodesQuantityOnLevel = 0;//Math.pow(2, currentLevel);
		
		for (i = 0; i < treeArray.length; i++){
		
			//<p id='rootNode'>level 0 (rootNode):<span>54044</span></p>
			//nodesQuantityOnLevel was incremented on previous turn/loop iteration
			if (
				(nodesQuantityOnLevel >= Math.pow(2, currentLevel)) ||
				(i == 0)
			){
		
				currentLevel = currentLevel + 1;//* ++
				treeHeight = treeHeight + nodeHeight + edgeHeight;
				nodesQuantityOnLevel = 0;
				
				new_P_Tag = document.createElement("p");//new string/level on tree
				new_P_Tag
					.setAttribute(
						"style",
						"text-align: center;" + 
						"line-height: 100%;" + 
						"-webkit-margin-before: 0em;" +
						"-webkit-margin-after: 0em;"
					);
				newTextNode = document.createTextNode('Level: '+currentLevel+'::');
				newSpanTag = document.createElement("span");//string/p content
				newSpanTag
					.setAttribute(
						"style",
						"position: absolute;"+
						"left: 10px;");
				newSpanTag.appendChild(newTextNode);
				new_P_Tag.appendChild(newSpanTag);
				domNode.appendChild(new_P_Tag);
			}// if /* end */
			
			if (currentLevel % 2 === 0) {//* even
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
			}//if /* end */ (currentLevel%2===0)
			else {//* odd
				//new_P_Tag.style.background-color='#66CCFF';
			
			}
			
			nodesQuantityOnLevel = nodesQuantityOnLevel+1;//* add current/new array element
			
			newSpanTag = document.createElement("span");//* string/p content
			
			if (treeArray[i].keyValue) {
				newTextNode = document.createTextNode(
					'['+treeArray[i].keyValue+']('+i+')'+
					'Parent index:'+treeArray[i].nodeParent+
					' rank:'+treeArray[i].rank
				);
			}
			else {
				newTextNode = document.createTextNode('['+treeArray[i]+']('+i+')');
			}			
			
			if (typeof(newSpanTag)!='undefined') {
				newSpanTag.appendChild(newTextNode);
				new_P_Tag.appendChild(newSpanTag);

				//domNode.appendChild(new_P_Tag);
			}

			if (nodesQuantityOnLevel%2 === 0) {//* even
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

			}//if /* end */ (nodesQuantityOnLevel%2===0)
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
			
			}//else /* end */			
		}//for /* end */ (i = 0; i < treeArray.length; i++)
		
	}//if /* end */ (treeArray[0] != null)
	
	return ;
}
/*----------------------------------------------------------------------------------------------------------*/

//id='bTreeStrings'
var domNode = document.getElementById('bTreeStrings');
/* console.log('domNode is: '+domNode); */
//inlineTreeFromArray(sampleArray,domNode);

/*----------------------------------------------------------------------------------------------------------*/
/* 
JavaScript statements are executed line by line. 
However, 
with effects, 
the next line of code can be run even though the effect is not finished. 
This can create errors.
To prevent this, 
you can 
create a callback function.
A callback function 
is executed after the current effect is finished. 
*/

//function clearInlineTree(callBackFunction){
//function clearInlineTree(domNode){
	//if needed to determine exact element to clear -- pass it to function as parameter
function clearInlineTree(){
	
	var tagsP_forRemoval,
			i;
	//document.normalize();//Removes empty Text nodes, and joins adjacent nodes
	//element.normalize();
	//domNode.normalize();
	
	//console.log('domNode.childNodes.length was:'+domNode.childNodes.length);
	if (typeof(domNode) === 'undefined') {
		console.log('no target element for clear, domNode is -- undefined');
		
		return ;
	}
	
	if (domNode === null) {
		console.log('no target element for clear, domNode is -- null');
		
		return ;
	}
	
	//in Opera: Uncaught exception: TypeError: Cannot convert 'domNode' to object
	//reason/because -- DOM not loaded yet -- body tag is empty
	tagsP_forRemoval = domNode.getElementsByTagName("P");//returns a collection of all elements in the document with the specified tagname, as a NodeList object.
	//The NodeList object represents a collection of nodes. 
	//The nodes can be accessed by index numbers. 
	//The index starts at 0.
	
	//console.log('tagsP_forRemoval.length was:'+tagsP_forRemoval.length);
	
	while (typeof(tagsP_forRemoval[0]) !== 'undefined') {
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
	
	//console.log('tagsP_forRemoval.length is/became:'+tagsP_forRemoval.length);
	
	//callBackFunction;
	//return callBackFunction;
	return ;
}

/*----------------------------------------------------------------------------------------------------------*/
//Separating markup from logic
/* 
id='printTree'
onclick="
			inlineTreeFromArray(sampleArray,this.parentNode); 
			*/
			
/* The 'readyState' property returns 
the (loading) status of the current document.

This property returns one of four values:

uninitialized - Has not started loading yet
loading - Is loading
interactive - Has loaded enough and the user can interact with it
complete - Fully loaded

Syntax:
document.readyState */

//The document.addEventListener() method attaches an event handler to the document.
//Note: Do not use the "on" prefix. For example, use "click" instead of "onclick".
//For browsers that don't support the addEventListener() method, you can use the attachEvent() method.
//You can add many events to the same element, without overwriting existing events.
/* document.addEventListener("click", function(){
    document.getElementById("demo").innerHTML = "Hello World";
}); */

document.getElementById("printTree")
.addEventListener(
	"click", 
	function(){
    /* document.getElementById("demo").innerHTML = "Hello World"; */
		inlineTreeFromArray(balancedBinaryTree.treeContent().nodes,this.parentNode);
		//treeToHash
		//inlineTreeFromArray(balancedBinaryTree.treeToHash(),this.parentNode);
	}
);

//btnContentAscending
document
	.getElementById("btnContentAscending")
		.addEventListener(
			"click", 
			function(){
				var outputTbl,
						outputTblRow,
						ContentAscending = balancedBinaryTree.outPutAscending().split(";");
				
				if (document.getElementById("outputHeapArray")) {
					outputTbl = document.getElementById("outputHeapArray");
					if (outputTbl.tBodies[0].rows[1]) {
						outputTblRow = outputTbl.tBodies[0].rows[1];
						
						Array.prototype.forEach.call(
							outputTblRow.cells, 
							function(
								el, 
								i
							){
								el.innerHTML = ContentAscending[i];
							}
						);
					}
				}
											
			}
		);

document
	.getElementById("btnContentDescending")
		.addEventListener(
			"click", 
			function(){
				var outputTbl,
						outputTblRow,
						ContentAscending = balancedBinaryTree.outPutDescending().split(";");
				
				if (document.getElementById("outputHeapArray")) {
					outputTbl = document.getElementById("outputHeapArray");
					if (outputTbl.tBodies[0].rows[1]) {
						outputTblRow = outputTbl.tBodies[0].rows[1];
						
						Array.prototype.forEach.call(
							outputTblRow.cells, 
							function(
								el, 
								i
							){
								el.innerHTML = ContentAscending[i];
							}//function /* end */
						);
					}//if /* end */
				}//if /* end */
											
			}//function /* end */
		);

document
	.getElementById("btnClearRow")
		.addEventListener(
			"click", 
			function(){
				var outputTbl,
						outputTblRow;
				
				if (document.getElementById("outputHeapArray")) {
					outputTbl = document.getElementById("outputHeapArray");
					if (outputTbl.tBodies[0].rows[1]) {
						outputTblRow = outputTbl.tBodies[0].rows[1];
						
						Array.prototype.forEach.call(
							outputTblRow.cells, 
							function(
								el, 
								i
							){
								el.innerHTML = '&nbsp;';//'';
							}//function /* end */
						);
					}//if /* end */
				}//if /* end */
											
			}//function /* end */
		);

//btnMinKey
document.getElementById("btnMinKey")
.addEventListener(
	"click", 
	function(){
		this.innerHTML='extracted min key is:'+balancedBinaryTree.min();									
	}//function /* end */
);

document.getElementById("btnMaxKey")
.addEventListener(
	"click", 
	function(){
		this.innerHTML='extracted Max key is:'+balancedBinaryTree.max();									
	}//function /* end */
);

//btnPredecessor
document.getElementById("btnPredecessor")
.addEventListener(
	"click", 
	function(){
		var key;
		key=9083;
		key=54044;
		//key=79294;
		this.innerHTML='Predecessor of '+key+' key is:'+balancedBinaryTree.predecessor(key);									
	}//function /* end */
);

/* no effect. what's wrong? */
// for IE9+ only ?
document
	.addEventListener(
		'DOMContentLoaded', 
		function(){
			console.log('DOMContentLoaded' + ' readyState:' + document.readyState);
		}
);
/*----------------------------------------------------------------------------------------------------------*/
//balancedBinaryTree
/* 
balancedBinaryTree.insertNode(7);
balancedBinaryTree.insertNode(5);
balancedBinaryTree.insertNode(11);
balancedBinaryTree.insertNode(1);
balancedBinaryTree.insertNode(3); 
*/

var sampleArray = [54044,14108,79294,29649,25260,60660,2995,53777,49689,9083];
//var i;//check for double/repeated declaration  

for (var i = 0 ; sampleArray.length > i ; i = i + 1){
	balancedBinaryTree
		.insertNode(sampleArray[i]);
}

//console.log('treeContent in Ascending order:'+balancedBinaryTree.outPutAscending());//out of scope?

//console.log('treeRank or root node rank is:'+balancedBinaryTree.treeRank());

var findKey;
		findKey=2995;
//console.log('find key '+findKey+' in tree result: '+balancedBinaryTree.search(findKey));
console.log('treeToHeap is:' + balancedBinaryTree.treeToHeap());

var allRanks='';
// Array.prototype.forEach.call(
	// balancedBinaryTree.treeContent().nodes, 
	// function(
		// el, 
		// i
	// ){
		// allRanks=allRanks+el.keyValue+'['+i+']'+'rank='+el.rank+';';
	// }//function /* end */
// );

//alternative syntax:
/* 
arr.map(callback[, thisArg])
Parameters:
	callback
	Function that produces an element of the new Array, taking three arguments:
		currentValue
			The current element being processed in the array.
		index
			The index of the current element being processed in the array.
		array
			The array map was called upon.
	thisArg
		Value to use as this when executing callback.
 */
balancedBinaryTree
	.treeContent()
		.nodes.map(
			function(
				el, 
				i
			){
				allRanks = allRanks + el.keyValue + '[' + i + ']' + 'rank=' + el.rank + ';';
			}//function /* end */
);
console.log('allRanks is:' + allRanks);
/*----------------------------------------------------------------------------------------------------------*/

//Frame/Object Events
//equivalent to <body onload="SomeJavaScriptCode">
/*
onload is Supported by the Following HTML Tags:
<body>, <frame>, <frameset>, <iframe>, <img>, <input type="image">, <link>, <script>, <style>
*/ 
//the code doesn't run until all images are finished downloading, including banner ads. 
window.onload = function() {

	console.log('window.onload event');
    //alert( "welcome" );
 
}

// jQuery alternative:
/*$( document ).ready(function() {
 
    // Your code here.
 
});*/

document.body.onload = function() {

	console.log(
		'document.body event' + ' document.readyState:' + document.readyState
	);// works in Chrome 
	/*
  1.  uninitialized - Has not started loading yet
	2. loading - Is loading
	3. interactive - Has loaded enough and the user can interact with it
	4. complete - Fully loaded
	*/
 
};

//Note: 
//Do not use the "on" prefix. For example, use "click" instead of "onclick".
document.addEventListener(
	'load', 
	function(){
		console.log('document on load EventListener'+' readyState:'+document.readyState);
	}
);

// works in Chrome 
// shadowing previous event 'document.body.onload'
window.addEventListener(
	'load', 
	function(){
		console.log('window on load EventListener'+' document.readyState:'+document.readyState);
	}
);