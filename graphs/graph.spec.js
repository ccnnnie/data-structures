const Graph = require('./graph');

describe('A Graph', () => {
  let graph, cities, nodes;
  beforeEach(() => {
    graph = new Graph();
    cities = ['Tokyo', 'London', 'New York City', 'Paris', 'Madrid'];
  });

  test('can add a vertex', () => {
    graph.addVertex('A');
    expect(graph.adjacencyList).toEqual({ A: [] });
    graph.addVertex('B');
    expect(graph.adjacencyList).toEqual({ A: [], B: [] });
  });

  test('can add an edge between two vertices', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    expect(graph.adjacencyList.London).toEqual(['Tokyo', 'New York City']);
    expect(graph.adjacencyList.Tokyo).toEqual(['London']);
    expect(graph.adjacencyList['New York City']).toEqual(['London']);
  });

  test('does not overwrite an existing key in the list', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    graph.addVertex('London');
    expect(graph.adjacencyList.London).toEqual(['Tokyo', 'New York City']);
  });

  test('can remove an edge', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    graph.removeEdge('London', 'New York City');
    expect(graph.adjacencyList.London).toEqual(['Tokyo']);
    expect(graph.adjacencyList.Tokyo).toEqual(['London']);
    expect(graph.adjacencyList['New York City']).toEqual([]);
  });

  test('can remove a vertex and all associated edges', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    graph.addEdge('New York City', 'Hong Kong');
    graph.addEdge('New York City', 'Madrid');
    graph.addEdge('Paris', 'Madrid');
    graph.addEdge('Paris', 'London');
    graph.addEdge('Paris', 'New York City');
    graph.addEdge('Madrid', 'London');
    graph.addEdge('Tokyo', 'New York City');
    graph.removeVertex('New York City');
    expect(graph.adjacencyList.London).toEqual(
      expect.arrayContaining(['Tokyo', 'Paris', 'Madrid'])
    );
    expect(graph.adjacencyList.London).not.toEqual(
      expect.arrayContaining(['New York City'])
    );
    expect(graph.adjacencyList.Tokyo).toEqual(
      expect.arrayContaining(['London'])
    );
    expect(graph.adjacencyList.Tokyo).not.toEqual(
      expect.arrayContaining(['New York City'])
    );
    expect(graph.adjacencyList.Paris).toEqual(
      expect.arrayContaining(['Madrid', 'London'])
    );
    expect(graph.adjacencyList.Paris).not.toEqual(
      expect.arrayContaining(['New York City'])
    );
    expect(graph.adjacencyList.Madrid).toEqual(
      expect.arrayContaining(['Paris', 'London'])
    );
    expect(graph.adjacencyList.Madrid).not.toEqual(
      expect.arrayContaining(['New York City'])
    );
    expect(graph.adjacencyList['New York City']).toBeUndefined();
  });
});

describe('Graph Traversal', () => {
  let graph;
  beforeEach(() => {
    graph = new Graph();
    const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
    nodes.forEach((node) => graph.addVertex(node));
    graph.addEdge('A', 'B');
    graph.addEdge('A', 'C');
    graph.addEdge('B', 'D');
    graph.addEdge('C', 'E');
    graph.addEdge('D', 'E');
    graph.addEdge('D', 'F');
    graph.addEdge('E', 'F');

    //        A
    //      /   \
    //     B    C
    //    /      \
    //   D-------E
    //    \     /
    //       F
  });

  test('can be traversed depth first recursively', () => {
    const results = [];
    const cb = function(node) {
      results.push(node);
    };
    graph.dfRecursive('A', cb);
    expect(results).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
  });

  test('can be traversed depth first iteratively', () => {
    const results = [];
    const cb = function(node) {
      results.push(node);
    };
    graph.dfIterative('A', cb);
    expect(results).toEqual(['A', 'C', 'E', 'F', 'D', 'B']);
  });

  test('can be traversed breadth first', () => {
    const results = [];
    const cb = function(node) {
      results.push(node);
    };
    graph.bfTraversal('A', cb);
    expect(results).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });
});
