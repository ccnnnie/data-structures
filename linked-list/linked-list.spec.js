const SinglyLinkedList = require('./linked-list');

describe('A singly linked list', () => {
  let list;
  beforeEach(() => {
    list = new SinglyLinkedList();
  });

  test('can add first node to list', () => {
    list.push('HELLO');
    expect(list.head).toEqual(list.tail);
    expect(list.tail).toMatchObject({ val: 'HELLO' });
  });

  test('can add two nodes to list', () => {
    list.push('HELLO').push('WORLD');
    expect(list.length).toEqual(2);
    expect(list.head).toEqual({ val: 'HELLO', next: list.tail });
    expect(list.head.next).toEqual(list.tail);
    expect(list.tail).toMatchObject({ val: 'WORLD' });
  });
});
