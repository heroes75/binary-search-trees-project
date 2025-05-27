
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
                    if(prev.right.data === tmp.data) {
                        prev.right = tmp.right === null ? tmp.left : tmp.right
                    } else {
                        prev.left = tmp.right === null ? tmp.left : tmp.right
                    }
                    return
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
                console.log(tmp.data);
        }

        console.log(prev);
        
        if(prev.right !== null && prev.right.data === value) {
            prev.right = null;
        } else if(prev.left !== null && prev.left.data === value) {
            prev.left = null;
        }
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

let BSTtreeObject = BSTtree.buildTree([0,1,2,3,4,6,7,8])

//BSTtree.insert(5)
//BSTtree.insert(-2)
//BSTtree.insert(9)
//BSTtree.deleteItem(8);
BSTtree.deleteItem(0);
//BSTtree.deleteItem(2);
BSTtree.deleteItem(4);
BSTtree.deleteItem(1);
BSTtree.deleteItem(7);
BSTtree.deleteItem(6);
BSTtree.deleteItem(8);
BSTtree.deleteItem(2);

prettyPrint(BSTtree.root)

