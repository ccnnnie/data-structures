// undirected graph using adjacency list

class Graph {
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
  addEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return null;
    }
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  // O(E) time complexity where E is number of edges
  removeEdge(vertex1, vertex2) {
    if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) {
      return null;
    }
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (vertex) => vertex !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (vertex) => vertex !== vertex1
    );
  }

  // O(V+E) time complexity where V is number of vertices and E is number of edges
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  //depth first traversal

  dfRecursive(vertex, cb, visited = {}) {
    if (!this.adjacencyList[vertex]) return null;
    cb(vertex);
    visited[vertex] = true;
    const neighbors = this.adjacencyList[vertex];
    neighbors.forEach((neighbor) => {
      if (!visited[neighbor]) {
        this.dfRecursive(neighbor, cb, visited);
      }
    });
  }
  //        A
  //      /   \
  //     B    C
  //    /      \
  //   D-------E
  //    \     /
  //       F

  dfIterative(vertex, cb) {
    if (!this.adjacencyList[vertex]) return;
    const stack = [vertex];
    const visited = {};
    visited[vertex] = true;

    while (stack.length) {
      const currVertex = stack.pop();
      cb(currVertex);
      const neighbors = this.adjacencyList[currVertex];
      neighbors.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
  }

  // breadth first traversal

  bfTraversal(vertex, cb) {
    const queue = [vertex];
    const visited = {};
    visited[vertex] = true;

    while (queue.length) {
      const currVertex = queue.shift();
      cb(currVertex);
      const neighbors = this.adjacencyList[currVertex];
      neighbors.forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
  }
}

module.exports = Graph;
