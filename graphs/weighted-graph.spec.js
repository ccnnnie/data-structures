const WeightedGraph = require('./weighted-graph');

describe('A Weighted Graph', () => {
  let graph, cities, nodes;
  beforeEach(() => {
    graph = new WeightedGraph();
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
    graph.addEdge('Tokyo', 'London', 5.9);
    graph.addEdge('New York City', 'London', 3.5);
    expect(graph.adjacencyList.London).toEqual([
      { node: 'Tokyo', weight: 5.9 },
      { node: 'New York City', weight: 3.5 },
    ]);
    expect(graph.adjacencyList.Tokyo).toEqual([
      { node: 'London', weight: 5.9 },
    ]);
    expect(graph.adjacencyList['New York City']).toEqual([
      { node: 'London', weight: 3.5 },
    ]);
  });

  test('does not overwrite an existing key in the list', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London', 5.9);
    graph.addEdge('New York City', 'London', 3.5);
    graph.addVertex('London');
    expect(graph.adjacencyList.London).toEqual([
      { node: 'Tokyo', weight: 5.9 },
      { node: 'New York City', weight: 3.5 },
    ]);
  });

  test('can remove an edge', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London', 5.9);
    graph.addEdge('New York City', 'London', 3.5);
    graph.removeEdge('London', 'New York City');
    expect(graph.adjacencyList.London).toEqual([
      { node: 'Tokyo', weight: 5.9 },
    ]);
    expect(graph.adjacencyList.Tokyo).toEqual([
      { node: 'London', weight: 5.9 },
    ]);
    expect(graph.adjacencyList['New York City']).toEqual([]);
  });

  test('can remove a vertex and all associated edges', () => {
    cities.forEach((city) => graph.addVertex(city));
    graph.addEdge('Tokyo', 'London', 5);
    graph.addEdge('New York City', 'London', 1);
    graph.addEdge('New York City', 'Hong Kong', 1);
    graph.addEdge('New York City', 'Madrid', 1);
    graph.addEdge('Paris', 'Madrid', 3);
    graph.addEdge('Paris', 'London', 3);
    graph.addEdge('Paris', 'New York City', 1);
    graph.addEdge('Madrid', 'London', 4);
    graph.addEdge('Tokyo', 'New York City', 1);
    graph.removeVertex('New York City');

    const nycNode = { node: 'New York City', weight: 1 };

    for (let city in graph.adjacencyList) {
      expect(graph.adjacencyList[city]).not.toEqual(
        expect.arrayContaining([{ nycNode }])
      );
    }
    expect(graph.adjacencyList['New York City']).toBeUndefined();
  });

  test('can find shortest path from start to end point', () => {
    graph.addVertex('A');
    graph.addVertex('B');
    graph.addVertex('C');
    graph.addVertex('D');
    graph.addVertex('E');
    graph.addVertex('F');

    graph.addEdge('A', 'B', 4);
    graph.addEdge('A', 'C', 2);
    graph.addEdge('B', 'E', 3);
    graph.addEdge('C', 'D', 2);
    graph.addEdge('C', 'F', 4);
    graph.addEdge('D', 'E', 3);
    graph.addEdge('D', 'F', 1);
    graph.addEdge('E', 'F', 1);

    expect(graph.dijkstra('A', 'E')).toEqual(['A', 'C', 'D', 'F', 'E']);
    expect(graph.dijkstra('F', 'B')).toEqual(['F', 'E', 'B']);
    expect(graph.dijkstra('C', 'E')).toEqual(['C', 'D', 'F', 'E']);
    expect(graph.dijkstra('C', 'B')).toEqual(['C', 'A', 'B']);
  });
});
