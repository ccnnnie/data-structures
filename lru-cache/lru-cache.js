// using doubly linked list and an object

// get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
// put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class LRUCache {
  constructor(capacity = 10) {
    this.map = {};
    this.capacity = capacity;
    this.length = 0;
    this.head = null; // most recently used
    this.tail = null; // least recently used
  }

  // get value of an existing key in map
  // O(1) time complexity
  get(key) {
    if (this.map[key]) {
      const node = this.delete(this.map[key]);
      this.addToHead(node);
      return this.map[key];
    } else return null;
  }

  // O(1) time complexity
  set(key, val) {
    /*
    check if key is already in cache
      if it is, delete that associated node and add to head
      if not, check if there is room in cache
        if there is, add new node to head of list and add to map
        if not, evict the tail node and remove from map and then add new node to head of list and to map
    */
    const newNode = new Node(key, val);
    const existingNode = this.get(key);
    if (existingNode !== null) {
      this.delete(existingNode);
    } else {
      if (this.length >= this.capacity) {
        this.delete(this.tail);
      }
    }
    this.addToHead(newNode);
  }

  addToHead(node) {
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    this.length++;
    this.map[node.key] = node;
  }

  // delete a node with the specified key
  delete(node) {
    const prevNode = node.prev;
    const nextNode = node.next;
    if (prevNode) prevNode.next = nextNode;
    else this.head = nextNode;
    if (nextNode) nextNode.prev = prevNode;
    else this.tail = prevNode;
    node.prev = null;
    node.next = null;
    this.length--;
    delete this.map[node.key];
    return node;
  }
}

module.exports = LRUCache;
