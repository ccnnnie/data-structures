const LRUCache = require('./lru-cache');

describe('A LRU Cache', () => {
  let cache;
  beforeEach(() => {
    cache = new LRUCache(2);
  });

  test('can insert values if key is not already present in cache', () => {
    cache.set('cookies', 'use lots of chocolate chips');
    expect(cache.map).toEqual(
      expect.objectContaining({ cookies: expect.anything() })
    );
    cache.set('pie', 'apple');
    expect(cache.map).toEqual(
      expect.objectContaining({
        cookies: expect.anything(),
        pie: expect.anything(),
      })
    );
    expect(cache.length).toBe(2);
    expect(cache.head.key).toBe('pie');
    expect(cache.tail.key).toBe('cookies');
  });

  test('can get item in cache from key', () => {
    cache.set(1, 'one');
    cache.set(2, 'two');
    expect(cache.get(1).val).toBe('one');
    expect(cache.get(2).val).toBe('two');
  });

  test('evicts the least recently used item when cache is up to capacity', () => {
    cache.set(1, 'one');
    cache.set(2, 'two');
    expect(cache.get(1).val).toBe('one');
    expect(cache.get(2).val).toBe('two');
    cache.set(3, 'three'); // 1 should be evicted now
    expect(cache.get(1)).toBeNull();
    expect(cache.map).toEqual(
      expect.objectContaining({
        '3': expect.anything(),
        '2': expect.anything(),
      })
    );
    expect(cache.length).toBe(2);
    expect(cache.head.key).toBe(3);
    expect(cache.tail.key).toBe(2);
  });

  test('evicts LRU items when adding new items and cache is full', () => {
    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1).val).toBe(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).toBeNull(); // returns null (not found)
    cache.set(4, 4); // evicts key 1
    expect(cache.get(1)).toBeNull(); // returns null (not found)
    cache.get(3); // returns 3
    cache.get(4); // returns 4
  });

  test('overwrites value if setting an item with an existing key', () => {
    cache.set(2, 1);
    cache.set(2, 2);
    expect(cache.get(2).val).toBe(2); // returns 2
    cache.set(1, 1);
    cache.set(4, 1); // evicts key 2
    expect(cache.get(2)).toBeNull(); // returns null (not found)
  });
});
