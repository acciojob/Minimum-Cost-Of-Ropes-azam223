function calculateMinCost() {
  const inputElement = document.getElementById('rope-lengths');
  const resultElement = document.getElementById('result');
  
  const ropeLengths = inputElement.value.split(',').map(Number);

  // Edge case: If there are no ropes or just one rope, cost is zero.
  if (ropeLengths.length <= 1) {
    resultElement.textContent = 'Minimum cost is 0';
    return;
  }

  // Use a priority queue (min heap) to efficiently merge ropes
  const minHeap = new MinHeap(ropeLengths);

  let totalCost = 0;
  while (minHeap.size() > 1) {
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();
    const combinedLength = min1 + min2;
    totalCost += combinedLength;
    minHeap.insert(combinedLength);
  }

  resultElement.textContent = 'Minimum cost is ' + totalCost;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }
    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.sinkDown(0);
    return min;
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const element = this.heap[index];
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];

      if (element >= parent) {
        break;
      }

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  sinkDown(index) {
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    let smallest = index;

    if (left < this.size() && this.heap[left] < this.heap[smallest]) {
      smallest = left;
    }

    if (right < this.size() && this.heap[right] < this.heap[smallest]) {
      smallest = right;
    }

    if (smallest !== index) {
      const temp = this.heap[index];
      this.heap[index] = this.heap[smallest];
      this.heap[smallest] = temp;
      this.sinkDown(smallest);
    }
  }
}

// Export the MinHeap class for use in the HTML file
window.MinHeap = MinHeap;
