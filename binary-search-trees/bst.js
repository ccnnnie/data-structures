class BST {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }

  // for both searching and insertion:
  // best and average case:
  // O(log n) time complexity where n is number of nodes in tree
  // as number of nodes in a tree doubles, the number of steps needed to find the right position is only increased by 1
  // worst case:
  // O(n) time complexity where n is number of nodes in tree
  // this is for trees that are one-sided. you would have to traverse through every node of the tree in order to find the position to insert

  // for recursive solutions - space complexity is affected because of call stack

  insert(val) {
    let node = this;
    let newNode = new BST(val);
    while (node) {
      if (val < node.val) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = newNode;
          return this;
        }
      } else {
        if (node.right) {
          node = node.right;
        } else {
          node.right = newNode;
          return this;
        }
      }
    }
  }

  // recursive insert method
  // O(n) space because of call stack
  // insert(val) {
  //   let newNode = new BST(val);
  //   const traverse = (node) => {
  //     if (val < node.val) {
  //       if (node.left) {
  //         traverse(node.left);
  //       } else {
  //         node.left = newNode;
  //       }
  //     } else {
  //       if (node.right) {
  //         traverse(node.right);
  //       } else {
  //         node.right = newNode;
  //       }
  //     }
  //   };
  //   traverse(this);
  //   return this;
  // }

  contains(val) {
    let currNode = this;
    while (currNode) {
      if (currNode.val === val) return true;
      if (val < currNode.val) {
        currNode = currNode.left;
      } else {
        currNode = currNode.right;
      }
    }
    return false;
  }

  // recursive contains method
  // O(n) space because of call stack
  // contains(val, node = this) {
  //   if (!node) return false;
  //   if (node.val === val) {
  //     return true;
  //   } else if (val < node.val) {
  //     return this.contains(val, node.left);
  //   } else if (val > node.val) {
  //     return this.contains(val, node.right);
  //   }
  // }
}

module.exports = BST;
