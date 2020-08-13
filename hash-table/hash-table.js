// a simple hash function for learning purposes
// uses separate chaining to handle collisions

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0);
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  set(key, value) {
    const idx = this._hash(key);
    let values = this.keyMap[idx];
    if (!values) {
      this.keyMap[idx] = [];
    }
    this.keyMap[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    const values = this.keyMap[idx];
    if (values) {
      const val = values.filter((elem) => elem[0] === key);
      return val.length ? val[0] : undefined;
    } else return undefined;
  }

  keys() {
    let keys = [];
    this.keyMap.forEach((array) => {
      if (array) {
        array.forEach((keyVal) => {
          keys.push(keyVal[0][0]);
        });
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.keyMap.forEach((array) => {
      if (array) {
        array.forEach((keyVal) => {
          if (!values.includes(keyVal[0][1])) {
            values.push(keyVal[0][1]);
          }
        });
      }
    });
    return values;
  }
}

module.exports = HashTable;
