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

  // Function to find the minimum cost of connecting ropes
  function minCostOfRopes(ropes) {
    // Create a min-heap to efficiently find the smallest ropes
    const minHeap = new MinHeap();

    // Add all ropes to the min-heap
    for (const rope of ropes) {
      minHeap.insert(rope);
    }

    let totalCost = 0;

    // Keep connecting ropes until there is only one rope left
    while (minHeap.size() > 1) {
      const rope1 = minHeap.extractMin();
      const rope2 = minHeap.extractMin();
      const currentCost = rope1 + rope2;
      totalCost += currentCost;
      minHeap.insert(currentCost);
    }

    return totalCost;
  }

  // MinHeap class for managing priority queue
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
      if (this.size() === 0) return null;
      if (this.size() === 1) return this.heap.pop();

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

        if (element >= parent) break;

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
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        this.sinkDown(smallest);
      }
    }
  }

  // Calculate the minimum cost
  const minCost = minCostOfRopes(ropeLengths);

  // Display the result
  resultElement.textContent = `Minimum cost: ${minCost}`;
}
