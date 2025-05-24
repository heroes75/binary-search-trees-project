
import mergeSort, {array} from "./merge-sort.js";
class Node {
    constructor() {
        this.value;
        this.left;
        this.right
    }
}

class Tree {
    constructor(arr) {
        this.arr = arr
        this.root;
    }

    
}

function buildTree(array) {
    let newArray = Array.from(new Set(mergeSort(array)));
    console.log(newArray);
    
}
const arr = array(100000);
console.log(buildTree(arr));
console.log(arr);
