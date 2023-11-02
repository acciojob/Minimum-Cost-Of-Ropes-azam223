
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