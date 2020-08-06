const Queue = require('./queue');
const { TestScheduler } = require('jest');

describe('A queue', () => {
  let q;
  beforeEach(() => {
    q = new Queue();
  });

  test('can add an item to the end of the queue', () => {
    q.enqueue('Amy');
    expect(q.first).toEqual(q.last);
    expect(q.first.val).toBe('Amy');
    expect(q.first.next).toBe(null);
  });

  test('can add multiple items to the end of the queue', () => {
    q.enqueue('Amy')
      .enqueue('Bridget')
      .enqueue('Cassie');
    expect(q.last).toEqual(q.first.next.next);
    expect(q.first.val).toBe('Amy');
    expect(q.first.next.val).toBe('Bridget');
    expect(q.last.val).toBe('Cassie');
  });

  test('can remove from the beginning of the queue', () => {
    q.enqueue('Amy')
      .enqueue('Bridget')
      .enqueue('Cassie');
    let removed = q.dequeue();
    expect(q.last).toEqual(q.first.next);
    expect(q.first.val).toBe('Bridget');
    expect(q.first.next.val).toBe('Cassie');
    expect(q.last.val).toBe('Cassie');
    expect(removed.next).toBe(null);
    removed = q.dequeue();
    expect(q.first).toEqual(q.last);
    expect(removed.next).toBe(null);
    removed = q.dequeue();
    expect(q.size).toBe(0);
    expect(removed.next).toBe(null);
    expect(q.first).toBe(null);
    expect(q.last).toBe(null);
  });
});
