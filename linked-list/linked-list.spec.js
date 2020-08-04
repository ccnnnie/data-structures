const SinglyLinkedList = require('./linked-list');

describe('A singly linked list', () => {
  let list;
  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  test('can add first node to list', () => {
    list.push('HELLO');
    expect(list.head).toEqual(list.tail);
    expect(list.tail.val).toBe('HELLO');
  });

  test('can add two nodes to list', () => {
    list.push('HELLO').push('WORLD');
    expect(list.length).toEqual(2);
    expect(list.head).toEqual({ val: 'HELLO', next: list.tail });
    expect(list.head.next).toEqual(list.tail);
    expect(list.tail.val).toBe('WORLD');
  });

  test('can add multiple items to the list', () => {
    list
      .push(1)
      .push(2)
      .push(3)
      .push(4)
      .push(5);
    expect(list.tail.next).toBe(null);
    expect(list.head.val).toBe(1);
    expect(list.head.next.val).toBe(2);
    expect(list.head.next.next.val).toBe(3);
    expect(list.tail).toEqual(list.head.next.next.next.next);
    expect(list.tail.val).toBe(5);
  });

  test('can remove from the end of the list', () => {
    list
      .push(1)
      .push(2)
      .pop();
    expect(list.length).toBe(1);
    expect(list.tail.val).toBe(1);
    expect(list.head).toEqual(list.tail);
    expect(list.tail.next).toBe(null);
    list.pop();
    expect(list.length).toBe(0);
    expect(list.tail).toBe(null);
    expect(list.head).toBe(null);
  });

  test('can remove from the beginning of the list', () => {
    list
      .push(1)
      .push(2)
      .push(3)
      .shift();
    expect(list.length).toBe(2);
    expect(list.head.val).toBe(2);
    list.shift();
    expect(list.length).toBe(1);
    expect(list.head.val).toBe(3);
    expect(list.head).toEqual(list.tail);
    list.shift();
    expect(list.length).toBe(0);
    expect(list.head).toBe(null);
    expect(list.tail).toBe(null);
  });

  test('can add to the beginning of the list', () => {
    list
      .unshift(3)
      .unshift(2)
      .unshift(1);
    expect(list.length).toBe(3);
    expect(list.head.val).toBe(1);
    expect(list.tail.val).toBe(3);
    expect(list.tail).toEqual(list.head.next.next);
  });

  test('can get a node by its position in the list', () => {
    list
      .push('tacos')
      .push('fries')
      .push('chicken');
    const tacos = list.get(0);
    expect(tacos).toEqual(list.head);
    expect(tacos.val).toBe('tacos');
    const fries = list.get(1);
    expect(fries).toEqual(list.head.next);
    expect(fries.val).toBe('fries');
    const chicken = list.get(2);
    expect(chicken).toEqual(list.tail);
    expect(chicken.val).toBe('chicken');
  });

  test('can change the value of a node by its position in the list', () => {
    list
      .push('tacos')
      .push('fries')
      .push('chicken')
      .set('vegetables', 1);
    const vegetables = list.get(1);
    expect(vegetables).toEqual(list.head.next);
    expect(vegetables.next).toEqual(list.tail);
    expect(vegetables.val).toBe('vegetables');
  });

  test('can insert a node at a specified position', () => {
    list
      .push('Jan')
      .push('Mar')
      .push('Apr')
      .insert('Feb', 1);
    expect(list.length).toBe(4);
    expect(list.head.next.val).toBe('Feb');
    expect(list.head.next.next.val).toBe('Mar');
    list.insert('May', 4);
    expect(list.tail.val).toBe('May');
    expect(list.length).toBe(5);
  });

  test('can remove a node from a specified position', () => {
    list
      .push(1)
      .push(2)
      .push(3)
      .push(4)
      .push(5)
      .remove(1);
    expect(list.length).toBe(4);
    expect(list.head.next.val).toBe(3);
    list.remove(0);
    expect(list.head.val).toBe(3);
    list.remove(2);
    expect(list.tail.val).toBe(4);
  });

  test('can reverse the list in place', () => {
    list
      .push(1)
      .push(2)
      .push(3)
      .push(4)
      .push(5)
      .reverse();
    expect(list.length).toBe(5);
    expect(list.head.val).toBe(5);
    expect(list.tail.val).toBe(1);
    expect(list.tail).toBe(list.head.next.next.next.next);
    expect(list.head.next.val).toBe(4);
    expect(list.head.next.next.val).toBe(3);
    expect(list.head.next.next.next.val).toBe(2);
  });
});
