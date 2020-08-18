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
    expect(cache.get(1)).toBe('one');
    expect(cache.get(2)).toBe('two');
  });

  test('evicts the least recently used item when cache is up to capacity', () => {
    cache.set(1, 'one');
    cache.set(2, 'two');
    expect(cache.get(1)).toBe('one');
    expect(cache.get(2)).toBe('two');
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
});
