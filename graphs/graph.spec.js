const Graph = require('./graph');

describe('A Graph', () => {
  let graph, cities;
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
