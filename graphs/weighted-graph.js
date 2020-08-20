class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  // O(1) time complexity
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // O(1) time complexity
  addEdge(vertex1, vertex2, weight) {
    if (
      !this.adjacencyList[vertex1] ||
      !this.adjacencyList[vertex2] ||
      !weight
    ) {
      return null;
    }
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  // O(E) time complexity where E is number of edges
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return null;
    }
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (vertex) => vertex.node !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (vertex) => vertex.node !== vertex1
    );
  }

  // O(V+E) time complexity where V is number of vertices and E is number of edges
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const { node } = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, node);
    }
    delete this.adjacencyList[vertex];
  }
}

module.exports = WeightedGraph;
