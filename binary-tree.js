
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
        let prev;
        //console.log(this.root);
        
        while (tmp !== null) {
            prev = tmp
            if (value < tmp.data) {
                tmp = tmp.left;
            } else if (value > tmp.data) {
                tmp = tmp.right;
            } else {
                return
            }
        }

        if (value < prev.data) {
            prev.left = new Node(value, null, null)
        } else {
            prev.right = new Node(value, null, null)
        }
    }

    deleteItem(value) {
        let tmp = this.root;
        let prev;

        while (tmp !== null && (tmp.right !== null || tmp.left !== null)) {
            
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
                //console.log("+++");
                prev = tmp;
                tmp = tmp.left;
            } else {
                //console.log("---");
                //console.log(tmp.data);
                
                prev = tmp;
                tmp = tmp.right;
            }
                //console.log(tmp);
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
        while (tmp  !== null) {
            if (tmp.data === value) {
                return tmp
            }
            //console.log(tmp);
            if (value < tmp.data) {
                tmp = tmp.left;
            } else {
                tmp = tmp.right;
            }
            //console.log(tmp);
            
        }

        //if (tmp.data === value) {
        //    return tmp
        //}

        return null
    }

    levelOrder(callback) {
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
        //console.log("heer start the recursion");
        let nodeValue = this.find(value);
        //console.log(value);
        if(nodeValue === null) return null
        if (nodeValue.right === null && nodeValue.left === null) return 0;
        //count++;
        let count1 = nodeValue.left === null ? 0 : 1;
        let count2 = nodeValue.right === null ? 0 : 1;
        count1 = count1 + (nodeValue.left === null ? 0 : this.height(nodeValue.left.data))
        count2 = count2 + (nodeValue.right === null ? 0 : this.height(nodeValue.right.data))
        //console.log(nodeValue.data, count1, count2);
        
        return Math.max(count1, count2)
    }

    depth(value) {
        let tmp = this.root;
        let count = 0;

        while (tmp !== null) {
            if (tmp.data === value) {
                return count
            }
            if (value < tmp.data) {
                tmp = tmp.left;
                count++
            } else {
                tmp = tmp.right;
                count++
            }
        }
        return null
    }

    isBalanced(root = this.root) {
        //console.log("herre", root);
        //let heightOfLeft = (root === null || root.left === null) ? 0 : this.height(root.left.data);
        //let datatOfLeft = (root === null || root.left === null) ? "" : root.left.data;
        //let heightOfRight = (root === null || root.right === null) ? 0 : this.height(root.right.data);
        //let datatOfRight = (root === null || root.right === null) ? "" : root.right.data;
        //console.log("this.height.left " + datatOfLeft , heightOfLeft, "this.height.right " + datatOfRight, heightOfRight);
       // cacul if the difference between node left and node right is greater than one
        if(Math.abs(((root === null || root.left === null) ? 0 : this.height(root.left.data)) - ((root === null || root.right === null) ? 0 : this.height(root.right.data))) > 1) {
            return false
        } 
        //if(this.height(root) !== 0) {
        let leftIsBalanced;
        let rightIsBalanced;
        // we have three cases two childs are not null and one of child is null
            if(root.left !== null && root.right !== null)  {
                //we use recursion to explore if one child is balaced or not
                leftIsBalanced = this.isBalanced(root.left) === false ? false : true;
                rightIsBalanced = this.isBalanced(root.right) === false ? false : true;
                //console.log(leftIsBalanced, rightIsBalanced);
            } else if(root.left === null && root.right !== null) {
                //console.log(this.height(root.data) <= 1);
                //if one child is null so determine if the node is balenced or no depends only of the no null child
                leftIsBalanced = rightIsBalanced = this.height(root.data) <= 1
            } else if(root.left !== null && root.right === null)  {
                //console.log(this.height(root.data) <= 1);
                rightIsBalanced = leftIsBalanced = this.height(root.data) <= 1
            }
        //}
        //console.log("this.height.left afer " + datatOfLeft , heightOfLeft, "this.height.right afer " + datatOfRight, heightOfRight);
        return leftIsBalanced &&  rightIsBalanced
    }

    rebalance() {
        //if(this.isBalanced(this.root) === true) return;
        //console.log(this.arr);
        this.arr = [];
        this.inOrder((e) => this.arr.push(e.data));
        //console.log(this.arr);
        let start = 0;
        let end = this.arr.length - 1;
        this.root = this.createBST(this.arr, start, end)
    }
}

export default Tree;



    
