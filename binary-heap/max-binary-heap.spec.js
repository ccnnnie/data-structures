const MaxBinaryHeap = require('./max-binary-heap');

describe('A max binary heap', () => {
  let heap;
  beforeEach(function() {
    heap = new MaxBinaryHeap();
  });

  test('can insert value at correct location', () => {
    heap.insert(100);
    expect(heap.values).toEqual([100]);
  });

  test('can insert multiple values at correct location', () => {
    heap
      .insert(100)
      .insert(500)
      .insert(19)
      .insert(36)
      .insert(17)
      .insert(6)
      .insert(126)
      .insert(45)
      .insert(130);
    expect(heap.values).toEqual([500, 130, 126, 100, 17, 6, 19, 36, 45]);
  });

  test('can remove the max value from heap', () => {
    expect(heap.extractMax()).toBeNull;

    heap.insert(350);
    expect(heap.extractMax()).toBe(350);
    expect(heap.values).toEqual([]);

    heap
      .insert(100)
      .insert(500)
      .insert(19)
      .insert(36)
      .insert(17)
      .insert(6)
      .insert(126)
      .insert(45)
      .insert(130);
    expect(heap.extractMax()).toBe(500);
    expect(heap.values).toEqual([130, 100, 126, 45, 17, 6, 19, 36]);
    expect(heap.extractMax()).toBe(130);
    expect(heap.values).toEqual([126, 100, 36, 45, 17, 6, 19]);
  });
});
