const { PriorityQueue, Node } = require('./priority-queue');

describe('A priority queue', () => {
  let heap;
  beforeEach(function() {
    heap = new PriorityQueue();
  });

  test('can enqueue or insert value at correct location', () => {
    heap.enqueue(100, 5);
    expect(heap.values).toEqual([new Node(100, 5)]);
  });

  test('can enqueue or insert multiple values at correct location', () => {
    heap
      .enqueue('low fever', 4)
      .enqueue('slight cough', 5)
      .enqueue('flu', 3)
      .enqueue('exploded head', 1)
      .enqueue('gunshot wound', 1)
      .enqueue('annual checkup', 5)
      .enqueue('concussion', 2);
    expect(heap.values).toEqual([
      new Node('exploded head', 1),
      new Node('gunshot wound', 1),
      new Node('concussion', 2),
      new Node('slight cough', 5),
      new Node('flu', 3),
      new Node('annual checkup', 5),
      new Node('low fever', 4),
    ]);
  });

  test('can remove the highest priority value from heap', () => {
    expect(heap.dequeue()).toBeNull;

    heap.enqueue(350, 3);
    expect(heap.dequeue()).toEqual(new Node(350, 3));
    expect(heap.values).toEqual([]);

    heap
      .enqueue(100, 4)
      .enqueue(500, 5)
      .enqueue(19, 1)
      .enqueue(36, 3)
      .enqueue(17, 2)
      .enqueue(14, 2);
    expect(heap.dequeue()).toEqual(new Node(19, 1));
    expect(heap.dequeue()).toEqual(new Node(17, 2));
    expect(heap.dequeue()).toEqual(new Node(14, 2));
    expect(heap.dequeue()).toEqual(new Node(36, 3));
    // expect(heap.values).toEqual([130, 100, 126, 45, 17, 6, 19, 36]);
    // expect(heap.dequeue()).toBe(130);
    // expect(heap.values).toEqual([126, 100, 36, 45, 17, 6, 19]);
  });
});
