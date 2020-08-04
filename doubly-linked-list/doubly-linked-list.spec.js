const DoublyLinkedList = require('./doubly-linked-list');

describe('A double linked list', () => {
  let list;
  beforeEach(() => {
    list = new DoublyLinkedList();
  });

  test('can add first node to the list', () => {
    list.push('first');
    expect(list.head).toEqual(list.tail);
    expect(list.head.val).toBe('first');
  });

  test('can add two nodes to the list', () => {
    list.push('first').push('second');
    expect(list.length).toBe(2);
    expect(list.head).toEqual({ val: 'first', next: list.tail, prev: null });
    expect(list.head.next).toEqual(list.tail);
    expect(list.head.prev).toBe(null);
    expect(list.tail.prev).toEqual(list.head);
    expect(list.tail.next).toBe(null);
  });

  test('can add multiple nodes to the list', () => {
    list
      .push(1)
      .push(2)
      .push(3)
      .push(4)
      .push(5);
    expect(list.length).toBe(5);
    expect(list.head.val).toBe(1);
    expect(list.tail.val).toBe(5);
    expect(list.head).toEqual(list.head.next.prev);
    expect(list.head).toEqual(list.tail.prev.prev.prev.prev);
    expect(list.tail).toEqual(list.tail.prev.next);
    expect(list.head.next.next).toEqual(list.tail.prev.prev);
  });

  test('can remove from the end of the list', () => {
    list
      .push('the 1')
      .push('cardigan')
      .push('the last great american dynasty');
    const oldTail = list.pop();
    expect(list.tail).toEqual({ val: 'cardigan', next: null, prev: list.head });
    expect(list.length).toBe(2);
    expect(list.head.next).toEqual(list.tail);
    expect(oldTail).toEqual({
      val: 'the last great american dynasty',
      next: null,
      prev: null,
    });
  });

  test('can remove from the beginning of the list', () => {
    list.push(1).push(2);
    const oldHead = list.shift();
    expect(list.head.val).toBe(2);
    expect(list.head.prev).toBe(null);
    expect(list.head.next).toBe(null);
    expect(list.head).toEqual(list.tail);
    expect(list.length).toBe(1);
    expect(oldHead.next).toBe(null);
  });

  test('can add to the beginning of the list', () => {
    list
      .unshift('prosciutto')
      .unshift('brie')
      .unshift('crackers')
      .unshift('wine');
    expect(list.head.val).toBe('wine');
    expect(list.tail.val).toBe('prosciutto');
    expect(list.length).toBe(4);
    expect(list.head.next).toEqual(list.tail.prev.prev);
    expect(list.tail.prev).toEqual(list.head.next.next);
  });

  test('can get a node by its position in the list', () => {
    list
      .push('tacos')
      .push('fries')
      .push('chicken')
      .unshift('pizza');
    const pizza = list.get(0);
    expect(pizza).toEqual(list.head);
    expect(pizza.val).toBe('pizza');
    expect(pizza.next.val).toBe('tacos');
    const fries = list.get(2);
    expect(fries).toEqual(list.head.next.next);
    expect(fries.val).toBe('fries');
    const chicken = list.get(3);
    expect(chicken).toEqual(list.tail);
    expect(chicken.val).toBe('chicken');
  });

  test('can change the value of a node by its position in the list', () => {
    list
      .push('always')
      .push('be')
      .push('coding')
      .set('snacking', 2);
    expect(list.tail.val).toBe('snacking');
    expect(list.tail.prev.val).toBe('be');
    expect(list.tail.next).toBe(null);
  });
});
