const BST = require('./bst');
const { TestScheduler } = require('jest');

describe('A Binary Search Tree', () => {
  let tree;
  beforeEach(function() {
    tree = new BST(50);
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
    const values = [25, 75, 12, 5, 33, 64, 90, 81, 18];
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

  test('can confirm is a node of a certain value exists', () => {
    const values = [25, 75, 12, 5, 33, 64, 90, 81, 18];
    values.forEach((num) => tree.insert(num));
    expect(tree.contains(50)).toBe(true);
    expect(tree.contains(25)).toBe(true);
    expect(tree.contains(-43)).toBe(false);
    expect(tree.contains(90)).toBe(true);
    expect(tree.contains(62)).toBe(false);
  });
});
