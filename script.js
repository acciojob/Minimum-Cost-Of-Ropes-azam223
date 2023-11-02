function calculateMinCost() {
  const inputElement = document.getElementById('rope-lengths');
  const resultElement = document.getElementById('result');

  // Get the input and split it into an array of rope lengths
  const input = inputElement.value.trim();
  const ropeLengths = input.split(',').map(Number);

  // Ensure that there are at least two ropes to connect
  if (ropeLengths.length < 2) {
    resultElement.textContent = 'Minimum cost is 0';
    return;
  }

  // Calculate the minimum cost using a priority queue (min-heap)
  function minCostToConnectRopes(ropeLengths) {
    const pq = new MinHeap();
    pq.buildHeap(ropeLengths);

    let cost = 0;

    while (pq.size() > 1) {
      const min1 = pq.extractMin();
      const min2 = pq.extractMin();
      const currentCost = min1 + min2;
      cost += currentCost;
      pq.insert(currentCost);
    }

    return cost;
  }

  // MinHeap class for managing priority queue
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    size() {
      return this.heap.length;
    }

    buildHeap(array) {
      const lastParentIdx = Math.floor((array.length - 2) / 2);
      for (let i = lastParentIdx; i >= 0; i--) {
        this.siftDown(i);
      }
      this.heap = array;
    }

    siftDown(idx) {
      let leftChildIdx = 2 * idx + 1;
      while (leftChildIdx < this.heap.length) {
        const rightChildIdx = leftChildIdx + 1;
        const minChildIdx =
          rightChildIdx < this.heap.length &&
          this.heap[rightChildIdx] < this.heap[leftChildIdx]
            ? rightChildIdx
            : leftChildIdx;
        if (this.heap[minChildIdx] < this.heap[idx]) {
          this.swap(idx, minChildIdx);
          idx = minChildIdx;
          leftChildIdx = 2 * idx + 1;
        } else {
          return;
        }
      }
    }

    siftUp(idx) {
      let parentIdx = Math.floor((idx - 1) / 2);
      while (idx > 0 && this.heap[idx] < this.heap[parentIdx]) {
        this.swap(idx, parentIdx);
        idx = parentIdx;
        parentIdx = Math.floor((idx - 1) / 2);
      }
    }

    insert(value) {
      this.heap.push(value);
      this.siftUp(this.heap.length - 1);
    }

    extractMin() {
      this.swap(0, this.heap.length - 1);
      const min = this.heap.pop();
      this.siftDown(0);
      return min;
    }

    swap(i, j) {
      const temp = this.heap[i];
      this.heap[i] = this.heap[j];
      this.heap[j] = temp;
    }
  }

  // Calculate the minimum cost
  const minCost = minCostToConnectRopes(ropeLengths);

  // Display the result
  resultElement.textContent = `Minimum cost: ${minCost}`;
}
