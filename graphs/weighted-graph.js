const { PriorityQueue } = require('../binary-heap/priority-queue');

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

  // find shortest path
  dijkstra(start, end) {
    const nodes = new PriorityQueue();
    const distanceFromStart = {};
    const previous = {}; // the previous node in path - how did we get to this node?
    const path = [];
    for (let vertex in this.adjacencyList) {
      if (vertex !== start) {
        distanceFromStart[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      } else {
        distanceFromStart[vertex] = 0;
        nodes.enqueue(vertex, 0);
      }
      previous[vertex] = null;
    }

    while (nodes.values.length) {
      const closestVertex = nodes.dequeue().val; // gets vertex with smallest priority
      if (closestVertex === end) {
        let node = closestVertex;
        while (node !== null) {
          path.push(node);
          node = previous[node];
        }
        return path.reverse();
      } else if (distanceFromStart[closestVertex] !== Infinity) {
        this.adjacencyList[closestVertex].forEach((neighbor) => {
          const distance = distanceFromStart[closestVertex] + neighbor.weight;
          if (distance < distanceFromStart[neighbor.node]) {
            // updating new smallest distance to neighbor
            distanceFromStart[neighbor.node] = distance;
            // updating previous - how we got to neighbor
            previous[neighbor.node] = closestVertex;
            // enqueue in priority queue with new priority
            nodes.enqueue(neighbor.node, distance);
          }
        });
      }
    }
  }
}

module.exports = WeightedGraph;
