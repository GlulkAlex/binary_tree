package binaryTree

class BinaryTree {
  import BinaryTree._

  trait Direction
  /*singletons*/
  case object Left extends Direction
  case object Right extends Direction

  case class findResults(
    /*at least [root]*/
    lastVisited: BinaryTreeNode,
    /*where it must be*/
    direction: Direction,
    /*if found*/
    exactMatch: Option[ BinaryTreeNode ] )
  /*helper
   * for tree traversal
     * hard worker & heavy lifting*/
  def findNode(
    elem: Int ): findResults = {

      def innerLoop(
        elem: Int,
        currentlyChecked: BinaryTreeNode = treeRoot,
        lastVisited: BinaryTreeNode = treeRoot,
        direction: Direction = Left,
        exactMatch: Option[ BinaryTreeNode ] = None ): findResults = {

        currentlyChecked match {
          case BinaryTreeNode( parent, nodeElem, removed, leftChild, rightChild ) =>
            {
              /*what about recursion ?
           * how it affect this value ?*/
              val newLastVisited =
                /*must be `true` for [root] only*/
                if ( parent == None ) {
                  lastVisited
                } else {
                  parent.get
                }
              /*exact match*/
              if ( nodeElem == elem ) {
                val newExactMatch = Some( currentlyChecked )
                /*for `insert`*/
                /*if (removed) {
                	val newDirection = Left
                }*/
                /*return value*/
                findResults(
                  lastVisited = newLastVisited,
                  direction =
                    if ( removed ) {
                      Left
                    } else { direction },
                  exactMatch = newExactMatch )
                /*mast be on the left*/
              } else if ( nodeElem > elem ) {
                val newDirection = Left
                /*no else to search*/
                if ( leftChild == None ) {
                  /*return value*/
                  findResults(
                    /*current node as new parent for `insert`*/
                    lastVisited = currentlyChecked,
                    direction = newDirection,
                    exactMatch = None )
                  /*recursion*/
                } else {
                  /*here is exit point ?*/
                  /*findNode(
                    elem = elem,
                    currentlyChecked = leftChild.get )*/
                  innerLoop(
                    elem = elem,
                    currentlyChecked = leftChild.get,
                    lastVisited = newLastVisited,
                    direction = newDirection,
                    exactMatch = None
                  )
                }
                /*mast be on the right*/
              } else /*if ( nodeElem < elem )*/ {
                val newDirection = Right
                /*no else to search*/
                if ( rightChild == None ) {
                  /*return value*/
                  findResults(
                    /*current node as new parent for `insert`*/
                    lastVisited = currentlyChecked,
                    direction = newDirection,
                    exactMatch = None )
                  /*recursion*/
                } else {
                  /*findNode(
                    elem = elem,
                    currentlyChecked = rightChild.get )*/
                  innerLoop(
                    elem = elem,
                    currentlyChecked = rightChild.get,
                    lastVisited = newLastVisited,
                    direction = newDirection,
                    exactMatch = None
                  )
                }
              } /*else {
                //unknown
                println(s"unknown search case")
              }*/
            }
          /*case _ => //something goes totally wrong
            println(s"totally wrong search case")
        }*/

        }
      }

    /*initialization*/
    innerLoop(
      elem = elem,
      currentlyChecked = treeRoot,
      lastVisited = treeRoot,
      direction = Left,
      exactMatch = None
    )
  }

  def addNode(
    parent: Option[ BinaryTreeNode ],
    elem: Int,
    removed: Boolean,
    leftChild: Option[ BinaryTreeNode ],
    rightChild: Option[ BinaryTreeNode ] ): BinaryTreeNode = {
    BinaryTreeNode( parent, elem, removed, leftChild, rightChild )
  }
  def addRoot( elem: Int ): Unit = {

  }
  def insert( elem: Int ): Unit = {
    val targetNode = findNode( elem: Int )

    targetNode match {
      case findResults( parentNode, direction, exactNode ) =>
        if ( exactNode == None ) {
          val newNode = addNode(
            parent = Option( parentNode ),
            elem = elem,
            removed = false,
            leftChild = None,
            rightChild = None )

          if ( direction == Left ) {
            parentNode.leftChild = Option( newNode )
          } else {
            parentNode.rightChild = Option( newNode )
          }
          /*match found*/
        } else {
          /*flip state*/
          if ( exactNode.get.removed ) {
            exactNode.get.removed = false
          } else {
            //Nothing to do
          }
        }
      case _ => //Nothing to do
    }
  }
  def remove( elem: Int ): Unit = {
    val targetNode = findNode( elem: Int )

    targetNode match {
      case findResults( _, _, exactNode ) =>
        if ( exactNode == None ) {

        } else {
          exactNode.get.removed = true
        }
      case _ => //Nothing to do
    }
  }
  def isExist( elem: Int ): Boolean = {
    val targetNode = findNode( elem: Int )

    targetNode match {
      case findResults( _, _, exactNode ) =>
        if ( exactNode == None ) {
          false
        } else {
          if ( exactNode.get.removed ) {
            false
          } else {
            true
          }
        }
      case _ => false
    }
  }
  //garbage collection (GC)
  /*not return but make new tree and replace old*/
  def garbageCollection(): Unit = {

  }
  /*Top-down implementation of 
   * `divide and conquer algorithm` like `merge sort` algorithm*/
  def elemsInTree(): Unit = {
      /*merge*/
      def merge(
        left: Seq[ Int ],
        right: Seq[ Int ] ): Seq[ Int ] = {
        /*return*/
        left.union( right ) //++
      }
      /*recursive*/
      def split(
        currentNode: BinaryTreeNode ): Seq[ Int ] = {
        currentNode match {
          case BinaryTreeNode(
            parent, nodeElem, removed, leftChild, rightChild ) => {
            // Base case. 
            if ( leftChild == None && rightChild == None ) {
              /*done and return*/
              Seq( nodeElem )
              // Recursive case.
            } else {
              /*go deeply*/
              val left =
                if ( leftChild == None ) {
                  Seq( nodeElem )
                } else {
                  split(
                    currentNode = leftChild.get )
                }
              val right =
                if ( rightChild == None ) {
                  Seq( nodeElem )
                } else {
                  split(
                    currentNode = rightChild.get )
                }
              /*return*/
              /*merge(*/
              left /*,*/ ++
                right //)
            }
          }
          case _ => Seq.empty[ Int ]
        }
      }
      def splitNode(
        currentNode: BinaryTreeNode ): Seq[ BinaryTreeNode ] = {
        currentNode match {
          case BinaryTreeNode(
            parent, nodeElem, removed, leftChild, rightChild ) => {
            // Base case. 
            if ( leftChild == None && rightChild == None ) {
              /*done and return*/
              Seq( currentNode )
              // Recursive case.
            } else {
              /*go deeply*/
              val left =
                if ( leftChild == None ) {
                  Seq( currentNode )
                } else {
                  splitNode(
                    currentNode = leftChild.get )
                }
              val right =
                if ( rightChild == None ) {
                  Seq( currentNode )
                } else {
                  splitNode(
                    currentNode = rightChild.get )
                }
              /*return*/
              /*merge(*/
              left /*,*/ ++
                right //)
            }
          }
          case _ => Seq.empty[ BinaryTreeNode ]
        }
      }
      /*obviously must work when 
     * `accum` collected from leafs up to the [root]
     * return all but duplicated*/
      /*helper
       * `split`?*/
      def traverse(
        accum: Seq[ Int /*BinaryTreeNode*/ ],
        currentNode: BinaryTreeNode = treeRoot ): Seq[ Int /*BinaryTreeNode*/ ] = {
        currentNode match {
          case BinaryTreeNode(
            parent, nodeElem, removed, leftChild, rightChild ) => {
            if ( leftChild == None && rightChild == None ) {
              nodeElem +: accum
            } else if ( leftChild != None && rightChild == None ) {
              nodeElem +: traverse(
                nodeElem +: accum,
                currentNode = leftChild.get )
            } else if ( leftChild == None && rightChild != None ) {
              nodeElem +: traverse(
                nodeElem +: accum,
                currentNode = rightChild.get )
            } else if ( leftChild != None && rightChild != None ) {
              nodeElem +: traverse(
                nodeElem +: accum,
                currentNode = leftChild.get ) ++:
                traverse(
                  nodeElem +: accum,
                  currentNode = rightChild.get )
            } else {
              accum
            }
          }
          /*as it not `PartialFunction`*/
          case _ => //something else
            accum
        }
        //accum
      }
    /*return*/
    println(
      s"nodes:${
        /*traverse( accum = Seq.empty[ Int /*BinaryTreeNode*/ ] )*/
        splitNode( treeRoot )
          .mkString( start = "", sep = ",", end = "" )
      }" )
  }
  def printContent(): Unit = {

  }
}

/*
 * An object that 
 * has the same name as class is 
 * called a
 * `companion object`, 
 * it is used to 
 * contain factories for 
 * the class that it complements.*/
/*A `companion object` stores 
 * shared variables and 
 * values for 
 * every instantiated class to share.*/
object BinaryTree {
  //import BinaryTree._

  case class BinaryTreeNode(
    parent: Option[ BinaryTreeNode ],
    nodeElem: Int,
    var removed: Boolean,
    var leftChild: Option[ BinaryTreeNode ],
    var rightChild: Option[ BinaryTreeNode ] ) {
    /*to recursive*/
    override def toString(): String = {
      val showElem: String =
        if ( removed ) {
          s"/*${nodeElem}*/"
        } else {
          s"(${nodeElem})"
        }
      val showParent: String = 
    		  parent match {
    		  case None         => "[Root]"
    		  case Some( node ) => s"${node.nodeElem}>>"
        }
      val showLeft: String =
        leftChild match {
          case None         => "x"
          case Some( node ) => s"${node.nodeElem}"
        }
      val showRight: String =
    		  rightChild match {
    		  case None         => "x"
    		  case Some( node ) => s"${node.nodeElem}"
        }

      s"{${showParent}[${showLeft}<${showElem }>${showRight}]}"
    }
  }
  //This is encapsulated!
  var treeRoot: BinaryTreeNode =
    /*has no parent and marked as removed*/
    BinaryTreeNode( None, 0, true, None, None )

  def apply() = new BinaryTree
}

object Main extends App {
  println( "Hello BinaryTree !" )
  val binTreeTest1 = BinaryTree.apply()

  binTreeTest1.insert( 3 )
  binTreeTest1.insert( 1 )
  binTreeTest1.insert( 2 )
  binTreeTest1.insert( 4 )
  binTreeTest1.insert( 5 )
  binTreeTest1.remove( 4 )
  binTreeTest1.insert( 4 )

  println( s"BinaryTree exist 1: ${binTreeTest1.isExist( 1 )}" )
  println( s"BinaryTree exist 2: ${binTreeTest1.isExist( 2 )}" )
  println( s"BinaryTree exist 3: ${binTreeTest1.isExist( 3 )}" )
  println( s"BinaryTree exist 4: ${binTreeTest1.isExist( 4 )}" )
  println( s"BinaryTree exist 5: ${binTreeTest1.isExist( 5 )}" )

  binTreeTest1.elemsInTree()
  //binTreeTest1.
}