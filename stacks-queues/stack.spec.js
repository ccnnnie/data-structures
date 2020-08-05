let Stack = require('./stack');

describe('A stack', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });

  test('can add first item to the stack', () => {
    stack.add('first');
    expect(stack.top).toEqual(stack.bottom);
    expect(stack.size).toBe(1);
    expect(stack.top.next).toBe(null);
  });

  test('can add multiple items to the stack', () => {
    stack
      .add('pancakes')
      .add('fruit')
      .add('butter')
      .add('syrup');
    expect(stack.top.val).toBe('syrup');
    expect(stack.bottom.val).toBe('pancakes');
    expect(stack.size).toBe(4);
    expect(stack.top.next.val).toBe('butter');
  });

  test('can remove from top of stack', () => {
    stack
      .add('pancakes')
      .add('fruit')
      .add('butter')
      .add('syrup');
    let removedItem = stack.remove();
    expect(removedItem.val).toBe('syrup');
    expect(removedItem.next).toBe(null);
    expect(stack.top.val).toBe('butter');
    removedItem = stack.remove();
    expect(removedItem.val).toBe('butter');
    expect(stack.top.val).toBe('fruit');
    removedItem = stack.remove();
    expect(removedItem.val).toBe('fruit');
    expect(stack.top).toEqual(stack.bottom);
    expect(stack.size).toBe(1);
    removedItem = stack.remove();
    expect(removedItem.val).toBe('pancakes');
    expect(stack.top).toBe(null);
    expect(stack.bottom).toBe(null);
  });
});
