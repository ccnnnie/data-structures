const BST = require('./bst');

describe('A Binary Search Tree', () => {
  let tree;
  let values;
  beforeEach(function() {
    tree = new BST(50);
    values = [25, 75, 12, 5, 33, 64, 90, 81, 18];
  });

  test('can be created with the given value', () => {
    expect(tree.val).toBe(50);
    expect(tree.left).toBe(null);
    expect(tree.right).toBe(null);
    const anotherTree = new BST('hello world');
    expect(anotherTree.val).toBe('hello world');
    expect(anotherTree.left).toBe(null);
    expect(anotherTree.right).toBe(null);
  });

  test('can insert values in the correct location', () => {
    tree.insert(25);
    expect(tree.val).toBe(50);
    expect(tree.left.val).toBe(25);
    expect(tree.right).toBe(null);
    tree.insert(75);
    expect(tree.right.val).toBe(75);
  });

  test('can insert many values in the right locations', () => {
    values.forEach((num) => tree.insert(num));
    expect(tree.left.val).toBe(25);
    expect(tree.left.left.val).toBe(12);
    expect(tree.left.right.val).toBe(33);
    expect(tree.left.left.left.val).toBe(5);
    expect(tree.left.left.right.val).toBe(18);
    expect(tree.left.left.left.left).toBe(null);
    expect(tree.left.left.left.right).toBe(null);
    expect(tree.left.left.right.left).toBe(null);
    expect(tree.left.left.right.right).toBe(null);
    expect(tree.right.val).toBe(75);
    expect(tree.right.left.val).toBe(64);
    expect(tree.right.left.left).toBe(null);
    expect(tree.right.left.right).toBe(null);
    expect(tree.right.right.val).toBe(90);
    expect(tree.right.right.left.val).toBe(81);
    expect(tree.right.right.right).toBe(null);
    expect(tree.right.right.left.left).toBe(null);
    expect(tree.right.right.left.right).toBe(null);
  });

  test('can insert many values in the right locations (recursive solution) ', () => {
    values.forEach((num) => tree.insertRecursive(num));
    expect(tree.left.val).toBe(25);
    expect(tree.left.left.val).toBe(12);
    expect(tree.left.right.val).toBe(33);
    expect(tree.left.left.left.val).toBe(5);
    expect(tree.left.left.right.val).toBe(18);
    expect(tree.left.left.left.left).toBe(null);
    expect(tree.left.left.left.right).toBe(null);
    expect(tree.left.left.right.left).toBe(null);
    expect(tree.left.left.right.right).toBe(null);
    expect(tree.right.val).toBe(75);
    expect(tree.right.left.val).toBe(64);
    expect(tree.right.left.left).toBe(null);
    expect(tree.right.left.right).toBe(null);
    expect(tree.right.right.val).toBe(90);
    expect(tree.right.right.left.val).toBe(81);
    expect(tree.right.right.right).toBe(null);
    expect(tree.right.right.left.left).toBe(null);
    expect(tree.right.right.left.right).toBe(null);
  });

  test('can confirm is a node of a certain value exists', () => {
    values.forEach((num) => tree.insert(num));
    expect(tree.contains(50)).toBe(true);
    expect(tree.contains(25)).toBe(true);
    expect(tree.contains(-43)).toBe(false);
    expect(tree.contains(90)).toBe(true);
    expect(tree.contains(62)).toBe(false);
  });

  test('can confirm is a node of a certain value exists (recursive solution', () => {
    values.forEach((num) => tree.insertRecursive(num));
    expect(tree.containsRecursive(50)).toBe(true);
    expect(tree.containsRecursive(25)).toBe(true);
    expect(tree.containsRecursive(-43)).toBe(false);
    expect(tree.containsRecursive(90)).toBe(true);
    expect(tree.containsRecursive(62)).toBe(false);
  });

  test('can visit every sibling node before visiting children (breadth first search)', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.bfs((node) => valuesInTree.push(node.val));
    expect(valuesInTree).toEqual([50, 25, 75, 12, 33, 64, 90, 5, 18, 81]);
  });

  test('can visit every node in depth first search: pre-order', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfs((node) => valuesInTree.push(node.val), 'pre-order');
    expect(valuesInTree).toEqual([50, 25, 12, 5, 18, 33, 75, 64, 90, 81]);
  });

  test('can visit every node in depth first search: pre-order (iterative solution)', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfsIterative((node) => valuesInTree.push(node.val), 'pre-order');
    expect(valuesInTree).toEqual([50, 25, 12, 5, 18, 33, 75, 64, 90, 81]);
  });

  test('can visit every node in depth first search: post-order', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfs((node) => valuesInTree.push(node.val), 'post-order');
    expect(valuesInTree).toEqual([5, 18, 12, 33, 25, 64, 81, 90, 75, 50]);
  });

  test('can visit every node in depth first search: post-order (iterative solution)', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfsIterative((node) => valuesInTree.push(node.val), 'post-order');
    expect(valuesInTree).toEqual([5, 18, 12, 33, 25, 64, 81, 90, 75, 50]);
  });

  test('can visit every node in depth first search: in-order', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfs((node) => valuesInTree.push(node.val));
    expect(valuesInTree).toEqual([5, 12, 18, 25, 33, 50, 64, 75, 81, 90]);
  });

  test('can visit every node in depth first search: in-order (iterative solution)', () => {
    values.forEach((num) => tree.insert(num));
    let valuesInTree = [];
    tree.dfsIterative((node) => valuesInTree.push(node.val));
    expect(valuesInTree).toEqual([5, 12, 18, 25, 33, 50, 64, 75, 81, 90]);
  });
});

//         50
//       /   \
//     25     75
//     / \    / \
//   12  33  64  90
//   / \         /
//  5  18       81
