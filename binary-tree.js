
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
        let root = new Tree(arr);
    
        root.root = this.createBST(newArray, start, end)
        return root
    }

    createBST(arr, start, end) {
        if(start > end) return null;
        let mid = Math.floor((start + end) / 2);
        
        let root = new Node(arr[mid], this.createBST(arr, start, mid - 1), this.createBST(arr, mid + 1, end))
        return root
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

let BSTtreeObject = BSTtree.buildTree([0,1,2,3,4,5,6,7,8])

prettyPrint(BSTtreeObject.root)