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
  // O(d) space because of call stack
  insertRecursive(val) {
    let newNode = new BST(val);
    const traverse = (node) => {
      if (val < node.val) {
        if (node.left) {
          traverse(node.left);
        } else {
          node.left = newNode;
        }
      } else {
        if (node.right) {
          traverse(node.right);
        } else {
          node.right = newNode;
        }
      }
    };
    traverse(this);
    return this;
  }

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
  // O(d) space because of call stack
  containsRecursive(val, node = this) {
    if (!node) return false;
    if (node.val === val) {
      return true;
    } else if (val < node.val) {
      return this.contains(val, node.left);
    } else if (val > node.val) {
      return this.contains(val, node.right);
    }
  }

  // time complexity is the same for bfs and dfs because we visit every node once
  // space complexity:
  //    bfs: there will be more items in the queue if the tree is wider
  //    dfs: there will be more calls in the call stack as the tree gets deeper

  bfs(func) {
    const queue = [this];
    while (queue.length) {
      let node = queue.shift();
      func(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  dfs(func, order = 'in-order', node = this) {
    switch (order) {
      case 'pre-order': {
        // root, left, right
        func(node);
        if (node.left) this.dfs(func, 'pre-order', node.left);
        if (node.right) this.dfs(func, 'pre-order', node.right);
        break;
      }
      case 'post-order': {
        // left, right, root
        if (node.left) this.dfs(func, 'post-order', node.left);
        if (node.right) this.dfs(func, 'post-order', node.right);
        func(node);
        break;
      }
      default: {
        // left, root, right
        if (node.left) this.dfs(func, 'in-order', node.left);
        func(node);
        if (node.right) this.dfs(func, 'in-order', node.right);
        break;
      }
    }
  }

  dfsIterative(func, order = 'in-order') {
    const stack = [];
    let node = this;
    switch (order) {
      case 'pre-order': {
        // root, left, right
        // push node in stack and do callback func on node
        // then node = node.left
        // if no node, pop off stack, and then node is now equal to popped off node's right
        // repeat
        while (stack.length || node) {
          if (node) {
            stack.push(node);
            func(node);
            node = node.left;
          } else {
            node = stack.pop();
            node = node.right;
          }
        }
        break;
      }
      case 'post-order': {
        // left, right, root
        const visited = new Map();
        stack.push(node);
        while (stack.length) {
          /*
          push node to stack
          if node.left exists and has not been visited,
            push node.left to stack
            node = node.left
          else if left doesn't exist and right node exists and has not been visited,
            push node.right to stack
            node = node.right
          else if none exist
            pop off current node from stack and process
            mark node as visited
            node = last item in stack
          */
          if (node.left && !visited.has(node.left)) {
            node = node.left;
            stack.push(node);
          } else if (node.right && !visited.has(node.right)) {
            node = node.right;
            stack.push(node);
          } else {
            func(stack.pop());
            visited.set(node, true);
            node = stack[stack.length - 1];
          }
        }
        break;
      }
      default: {
        // left, root, right
        while (stack.length || node) {
          if (node) {
            stack.push(node);
            node = node.left;
          } else {
            node = stack.pop();
            func(node);
            node = node.right;
          }
        }
        break;
      }
    }
  }
}

module.exports = BST;
