const Graph = require('./graph-adjacencyMatrix');

describe('A Graph', () => {
  let graph, cities, testAdjacencyMatrix;
  beforeEach(() => {
    graph = new Graph(5);
    cities = ['Tokyo', 'London', 'New York City', 'Paris', 'Madrid'];
    cities.forEach((city) => graph.addVertex(city));
    testAdjacencyMatrix = new Array(5).fill().map(() => new Array(5).fill(0));
  });

  test('can add a vertex', () => {
    let g = new Graph(2);
    let testMap = new Map();
    testMap.set('A', 0);

    g.addVertex('A');
    expect(g.vertices).toEqual(testMap);

    testMap.set('B', 1);
    g.addVertex('B');
    expect(g.vertices).toEqual(testMap);
  });

  test('can add multiple vertices', () => {
    let testMap = new Map();
    testMap.set('Tokyo', 0);
    testMap.set('London', 1);
    testMap.set('New York City', 2);
    testMap.set('Paris', 3);
    testMap.set('Madrid', 4);

    expect(graph.vertices).toEqual(testMap);
  });

  test('can add an edge between two vertices', () => {
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');

    testAdjacencyMatrix[0][1] = 1;
    testAdjacencyMatrix[1][0] = 1;
    testAdjacencyMatrix[2][1] = 1;
    testAdjacencyMatrix[1][2] = 1;

    expect(graph.adjacencyMatrix).toEqual(testAdjacencyMatrix);
  });

  test('does not overwrite an existing key in the list', () => {
    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    graph.addVertex('London');
    expect(graph.adjacencyMatrix[0][1]).toEqual(1);
    expect(graph.adjacencyMatrix[1][0]).toEqual(1);
    expect(graph.adjacencyMatrix[2][1]).toEqual(1);
    expect(graph.adjacencyMatrix[1][2]).toEqual(1);
  });

  test('can remove an edge', () => {
    graph.addEdge('Tokyo', 'London');
    testAdjacencyMatrix[0][1] = 1;
    testAdjacencyMatrix[1][0] = 1;
    graph.addEdge('New York City', 'London');
    graph.removeEdge('London', 'New York City');

    expect(graph.adjacencyMatrix[0][1]).toEqual(1);
    expect(graph.adjacencyMatrix[1][0]).toEqual(1);
    expect(graph.adjacencyMatrix[2][1]).toEqual(0);
    expect(graph.adjacencyMatrix[1][2]).toEqual(0);
    expect(graph.adjacencyMatrix).toEqual(testAdjacencyMatrix);
  });

  test('can remove a vertex and all associated edges', () => {
    // testMap.set('Tokyo', 0);
    // testMap.set('London', 1);
    // testMap.set('New York City', 2);
    // testMap.set('Paris', 3);
    // testMap.set('Madrid', 4);

    graph.addEdge('Tokyo', 'London');
    graph.addEdge('New York City', 'London');
    graph.addEdge('New York City', 'Madrid');
    graph.addEdge('Paris', 'Madrid');
    graph.addEdge('Paris', 'London');
    graph.addEdge('Paris', 'New York City');
    graph.addEdge('Madrid', 'London');
    graph.addEdge('Tokyo', 'New York City');

    testAdjacencyMatrix = [
      [0, 1, 1, 0, 0],
      [1, 0, 1, 1, 1],
      [1, 1, 0, 1, 1],
      [0, 1, 1, 0, 1],
      [0, 1, 1, 1, 0],
    ];
    expect(graph.adjacencyMatrix).toEqual(testAdjacencyMatrix);

    graph.removeVertex('New York City');

    testAdjacencyMatrix = [
      [0, 1, 0, 0],
      [1, 0, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 0],
    ];

    expect(graph.adjacencyMatrix).toEqual(testAdjacencyMatrix);
    expect(graph.vertices.size).toBe(4);
    expect(graph.vertices.get('New York City')).toBeUndefined();
    expect(graph.vertices.get('Madrid')).toBe(3);
    expect(() => {
      graph.removeVertex('New York City');
    }).toThrow();
  });
});

describe('Graph Traversal', () => {
  let graph;
  beforeEach(() => {
    graph = new Graph(6);
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

    //     A  B  C  D  E  F
    //   [
    // A  [0, 1, 1, 0, 0, 0],
    // B  [1, 0, 0, 1, 0, 0],
    // C  [1, 0, 0, 0, 1, 0],
    // D  [0, 1, 0, 0, 1, 1],
    // E  [0, 0, 1, 1, 0, 1],
    // F  [0, 0, 0, 1, 1, 0]
    //   ]

    // [5];

    //visited 0, 2, 1, 3, 4, 5

    // A, B, C, D, E
  });

  test('can be traversed depth first recursively', () => {
    const results = [];
    const cb = function(node) {
      results.push(node);
    };
    graph.dfs('A', cb);
    expect(results).toEqual(['A', 'B', 'D', 'E', 'C', 'F']);
  });

  //   test('can be traversed depth first iteratively', () => {
  //     const results = [];
  //     const cb = function(node) {
  //       results.push(node);
  //     };
  //     graph.dfIterative('A', cb);
  //     expect(results).toEqual(['A', 'C', 'E', 'F', 'D', 'B']);
  //   });

  test('can be traversed breadth first', () => {
    const results = [];
    const cb = function(node) {
      results.push(node);
    };
    graph.bfs('A', cb);
    expect(results).toEqual(['A', 'B', 'C', 'D', 'E', 'F']);
  });
});
