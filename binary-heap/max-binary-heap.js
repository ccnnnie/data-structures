class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(val) {
    this.values.push(val);
    if (this.values.length > 1) {
      this.bubbleUp();
    }
    return this;
  }

  bubbleUp() {
    let valIdx = this.values.length - 1;
    // swap values if parent is smaller than val
    while (valIdx > 0) {
      let parentIdx = Math.floor((valIdx - 1) / 2);
      if (this.values[valIdx] > this.values[parentIdx]) {
        let temp = this.values[valIdx];
        this.values[valIdx] = this.values[parentIdx];
        this.values[parentIdx] = temp;
        valIdx = parentIdx;
      } else break;
    }
  }

  extractMax() {
    if (!this.values.length) return null;
    const removedMax = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 1) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return removedMax;
  }

  bubbleDown() {
    let idx = 0;
    const length = this.values.length;
    while (idx < length) {
      let root = this.values[idx];
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let left = leftChildIdx < length ? this.values[leftChildIdx] : null;
      let right = leftChildIdx < length ? this.values[rightChildIdx] : null;
      if ((root > left && root > right) || (!left && !right)) break;
      else if ((root > left && !right) || (root > right && !left)) break;
      else if (root < left && left > right) {
        let temp = this.values[idx];
        this.values[idx] = this.values[leftChildIdx];
        this.values[leftChildIdx] = temp;
        idx = leftChildIdx;
      } else if (root < right && right > left) {
        let temp = this.values[idx];
        this.values[idx] = this.values[rightChildIdx];
        this.values[rightChildIdx] = temp;
        idx = rightChildIdx;
      }
    }
  }
}

module.exports = MaxBinaryHeap;
