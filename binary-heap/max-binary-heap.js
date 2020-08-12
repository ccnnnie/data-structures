class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  //O(log n) time complexity
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
    if (this.values.length > 0) {
      this.values[0] = end;
      this.bubbleDown();
    }
    return removedMax;
  }

  bubbleDown() {
    let idx = 0;
    const length = this.values.length;

    while (idx < length) {
      let elem = this.values[idx];
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let left, right;
      let swapIdx = null;
      if (leftChildIdx < length) {
        left = this.values[leftChildIdx];
        if (left > elem) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        right = this.values[rightChildIdx];
        if (right > elem) {
          if (swapIdx === null || right > left) {
            swapIdx = rightChildIdx;
          }
        }
      }

      if (!swapIdx) break;
      else {
        let temp = this.values[idx];
        this.values[idx] = this.values[swapIdx];
        this.values[swapIdx] = temp;
        idx = swapIdx;
      }
    }
  }
}

module.exports = MaxBinaryHeap;
