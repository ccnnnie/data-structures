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
});
