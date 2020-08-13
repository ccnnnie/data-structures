const HashTable = require('./hash-table');

describe('A Hash Table', () => {
  let hashTable;
  beforeEach(() => {
    hashTable = new HashTable();
  });

  test('can store a key/value pair and retrieve it', () => {
    hashTable.set('hello', 'world');
    expect(hashTable.get('hello')).toEqual(['hello', 'world']);
  });

  test('can set and get multiple key/value pairs and handle collisions', () => {
    const hash = hashTable._hash('wizard');
    expect(hash).toBe(hashTable._hash('muggle'));
    hashTable.set('wizard', 'magic');
    hashTable.set('muggle', 'human');
    expect(hashTable.keyMap[hash]).toHaveLength(2);
    expect(hashTable.get('wizard')).toEqual(['wizard', 'magic']);
    expect(hashTable.get('muggle')).toEqual(['muggle', 'human']);

    hashTable.set('Wingardium Leviosa', "It's leviOsa not levioSA");
    expect(hashTable.keyMap[hash]).toHaveLength(3);
    expect(hashTable.get('Wingardium Leviosa')).toEqual([
      'Wingardium Leviosa',
      "It's leviOsa not levioSA",
    ]);
  });

  test('can return array of keys that are in the table', () => {
    const testHashTable = new HashTable(10);
    const pairs = [
      ['hello', 'goodbye'],
      ['pink', 'blue'],
      ['harry', 'potter'],
      ['Hermione', 'Ron'],
      ['ABCDEFG', 'abc'],
      ['Hi there!', 'Nice to meet you.'],
      ['hash', 'table'],
      ['lady', 'bug'],
    ];
    pairs.forEach((elem) => testHashTable.set(elem));
    const keys = testHashTable.keys();
    expect(keys).toHaveLength(8);
    expect(keys).toEqual(
      expect.arrayContaining([
        'hello',
        'pink',
        'harry',
        'Hermione',
        'ABCDEFG',
        'Hi there!',
        'hash',
        'lady',
      ])
    );
  });

  test('can return array of values that are in the table', () => {
    const testHashTable = new HashTable(10);
    const grades = [
      ['Sally', 'A'],
      ['Susie', 'A'],
      ['Carmen', 'C'],
      ['Aaron', 'D'],
      ['Robbie', 'C'],
      ['Darren', 'B'],
    ];
    grades.forEach((elem) => testHashTable.set(elem));
    const values = testHashTable.values();
    expect(values).toHaveLength(4);
    expect(values).toEqual(expect.arrayContaining(['A', 'B', 'C', 'D']));
  });
});
