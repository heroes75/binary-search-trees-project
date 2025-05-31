import Tree from "./binary-tree.js";
import { array } from "./merge-sort.js";

const arr = array(10);

let BSTtree = new Tree(arr);


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

BSTtree.buildTree(arr)

console.log("is balenced", BSTtree.isBalanced());

console.log("18 is here", BSTtree.deleteItem(18));
console.log(BSTtree.find(12));

let arrIn = [];
const callbackIn = (e) =>  arrIn.push(e.data);

let arrPost = [];
const callbackPost = (e) =>  arrPost.push(e.data);

let arrPre = [];
const callbackPre = (e) =>  arrPre.push(e.data);

let arrLevel = [];
const callbackLevel = (e) =>  arrLevel.push(e.data);


console.log("level order traversal");  
BSTtree.levelOrder(callbackLevel);
console.log(arrLevel);
console.log("pre order traversal");  
BSTtree.preOrder(callbackPre);
console.log(arrPre);
console.log("in order traversal");  
BSTtree.inOrder(callbackIn);
console.log(arrIn);
console.log("post order traversal");
BSTtree.postOrder(callbackPost);
console.log(arrPost);

console.log(BSTtree.find(2));
console.log(BSTtree.height(10));
console.log(BSTtree.depth(7));

prettyPrint(BSTtree.root);
console.log("unbalence the tree here");

BSTtree.insert(101);
BSTtree.insert(103);
BSTtree.insert(108);
BSTtree.insert(128);
BSTtree.insert(308);
prettyPrint(BSTtree.root);
console.log("is balenced", BSTtree.isBalanced());
BSTtree.rebalance()
prettyPrint(BSTtree.root);
console.log("is balenced", BSTtree.isBalanced());

console.log("level order traversal");  
BSTtree.levelOrder(callbackLevel);
console.log(arrLevel);
console.log("pre order traversal");  
BSTtree.preOrder(callbackPre);
console.log(arrPre);
console.log("in order traversal");  
BSTtree.inOrder(callbackIn);
console.log(arrIn);
console.log("post order traversal");
BSTtree.postOrder(callbackPost);
console.log(arrPost);