
import mergeSort, {array} from "./merge-sort.js";
class Node {
    constructor(value, left, right) {
      this.data = value;
      this.left = left;
      this.right = right;
    }
}

class Tree {
    constructor(arr) { 
      this.arr = arr;
      this.root;
    }

    buildTree(array) {
      let newArray = Array.from(new Set(mergeSort(array)));
        //console.log(newArray);
      let start = 0;
      let end = newArray.length - 1;
      //let root = new Tree(arr);
    
      this.root = this.createBST(newArray, start, end)
      return this.root
    }

    createBST(arr, start, end) {
      if(start > end) return null;
      let mid = Math.floor((start + end) / 2);
        
      let root = new Node(arr[mid], this.createBST(arr, start, mid - 1), this.createBST(arr, mid + 1, end))
      return root
    }

    // we can add a duplicate value but i don't know if it's good
    insert(value) {
        let tmp = this.root;
        console.log(this.root);
        
        while (tmp.right !== null && tmp.left !== null) {
            if (value < tmp.data) {
                tmp = tmp.left;
            } else {
                tmp = tmp.right;
            }
        }

        if (value < tmp.data) {
            tmp.left = new Node(value, null, null)
        } else {
            tmp.right = new Node(value, null, null)
        }
    }

    deleteItem(value) {
        let tmp = this.root;
        let prev;

        while (tmp.right !== null || tmp.left !== null) {
            
            if (tmp.data === value) {
                if(((tmp.right === null) !== (tmp.left === null))) {
                    if (prev === undefined) {
                        tmp.data = tmp.right === null ? tmp.left.data : tmp.right.data;
                        tmp.right = null;
                        tmp.left = null;
                        return value
                    }
                    if(prev.right.data === tmp.data) {
                        prev.right = tmp.right === null ? tmp.left : tmp.right
                    } else {
                        prev.left = tmp.right === null ? tmp.left : tmp.right
                    }
                    return value
                }

                if (tmp.right !== null && tmp.left !== null) {
                    let biggestSucessor = tmp.right;
                    while (biggestSucessor.left !== null) {
                        biggestSucessor = biggestSucessor.left
                    }
                    
                    let data = biggestSucessor.data
                    this.deleteItem(data);
                    
                    if (prev !== undefined && prev.right.data === value) {
                        prev.right.data = data;
                        return data
                    } else if (prev !== undefined && prev.left.data === value) {
                        prev.left.data = data;
                        return data
                    }
                    tmp.data = data
                    return data
                    
                }
            }
            if (value < tmp.data) {
                console.log("+++");
                prev = tmp;
                tmp = tmp.left;
            } else {
                console.log("---");
                //console.log(tmp.data);
                
                prev = tmp;
                tmp = tmp.right;
            }
                //console.log(tmp.data);
        }

        //console.log(prev);
        
        if(prev.right !== null && prev.right.data === value) {
            prev.right = null;
            return value;
        } else if(prev.left !== null && prev.left.data === value) {
            prev.left = null;
            return value;

        }
        return null
    }

    find(value) {
        let tmp = this.root;
        //let prev;
        while (tmp.right !== null && tmp.left !== null) {
            if (tmp.data === value) {
                return tmp
            }
            if (value < tmp.data) {
                tmp = tmp.left;
            } else {
                tmp = tmp.right;
            }
        }

        if (tmp.data === value) {
            return tmp
        }

        return null
    }

    levelOrder(callback) {
        let tmp = this.root;
        let arr = [];
        let queue = [this.root];

        if(callback === undefined) throw new Error("fonction nedeed");
        

        // make condition on if arr is empty or no
        while (queue.length !== 0) {
            if (queue[0].left !== null) {
                queue.push(queue[0].left);
            }
            
            if (queue[0].right !== null) queue.push(queue[0].right);
            callback(queue[0]);
            queue.shift();
        }
    }

    levelOrderRecursion(callback, queue = [this.root]) {
        
        if(callback === undefined) throw new Error("fonction nedeed");
        if(queue.length === 0) return;
        if (queue[0].left !== null) queue.push(queue[0].left);
        if (queue[0].right !== null) queue.push(queue[0].right);
        callback(queue[0]);
        queue.shift();
        this.levelOrderRecursion(callback, queue)

    }

    preOrder(callback, root = this.root) {
        if(callback === undefined) throw new Error("fonction nedeed");
        if(root === null) return
        callback(root);
        this.preOrder(callback, root.left)
        this.preOrder(callback, root.right)
    }

    inOrder(callback, root = this.root) {
        if(callback === undefined) throw new Error("fonction nedeed");
        if(root === null) return
        this.inOrder(callback, root.left)
        callback(root);
        this.inOrder(callback, root.right)
    }

    postOrder(callback, root = this.root) {
        if(callback === undefined) throw new Error("fonction nedeed");
        if(root === null) return
        this.postOrder(callback, root.left)
        this.postOrder(callback, root.right)
        callback(root);
    }

    height(value) {
        let nodeValue = this.find(value);
        
    }
}


const arr = array(7);

let BSTtree = new Tree(arr);

//console.log(BSTtree.buildTree(arr));
//console.log(arr);

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

let BSTtreeObject = BSTtree.buildTree([0,1,2,3,5, 9, 10, 11,12,13,4,6,7,8,-1])

//BSTtree.insert(5)
//BSTtree.insert(-2)
//BSTtree.insert(9)

//BSTtree.deleteItem(6);

console.log(BSTtree.deleteItem(18));
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

prettyPrint(BSTtree.root)

