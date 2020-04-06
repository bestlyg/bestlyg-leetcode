import ListGraph from "../../src/core/graph/ListGraph";
import { Person, getPerson } from "../../src/utils/model";
import { WeightManager } from "../../src/types";
const manager: WeightManager<number> = {
  compare(w1: number, w2: number): number {
    return w1 - w2;
  },
  add(w1: number, w2: number): number {
    return w1 + w2;
  },
  zero(): number {
    return 0;
  }
};
function getNewGraph(): ListGraph<Person, number> {
  return new ListGraph<Person, number>(manager);
}
/*
1  →  3  →  5
↓  ↖ ↓     ↓
2  →  4  →  6

*/
function getGraph(): ListGraph<Person, number> {
  const graph = getNewGraph();
  graph.addEdge(getPerson(1), getPerson(2), 0);
  graph.addEdge(getPerson(1), getPerson(3), 0);
  graph.addEdge(getPerson(2), getPerson(4), 0);
  graph.addEdge(getPerson(3), getPerson(5), 0);
  graph.addEdge(getPerson(3), getPerson(4), 0);
  graph.addEdge(getPerson(4), getPerson(1), 0);
  graph.addEdge(getPerson(4), getPerson(6), 0);
  graph.addEdge(getPerson(5), getPerson(6), 0);
  return graph;
}
/*
       ↗ 3 ↘ 
1  → 2 →  5 → 6
       ↘ 4
*/
function getGraph2(): ListGraph<Person, number> {
  const graph = getNewGraph();
  graph.addEdge(getPerson(1), getPerson(2), 0);
  graph.addEdge(getPerson(2), getPerson(3), 0);
  graph.addEdge(getPerson(2), getPerson(4), 0);
  graph.addEdge(getPerson(2), getPerson(5), 0);
  graph.addEdge(getPerson(5), getPerson(6), 0);
  graph.addEdge(getPerson(3), getPerson(6), 0);
  return graph;
}
describe("Graph", () => {
  test("common test", () => {
    const graph = getGraph();
    graph.print();
    expect(graph.verticesSize()).toBe(6);
    expect(graph.edgesSize()).toBe(8);
    graph.removeVertex(getPerson(4));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(3), getPerson(4));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(2), getPerson(1));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(4);
    graph.removeEdge(getPerson(1), getPerson(2));
    expect(graph.verticesSize()).toBe(5);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(getPerson(2));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(getPerson(4));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
    graph.removeVertex(new Person("1", 1));
    expect(graph.verticesSize()).toBe(3);
    expect(graph.edgesSize()).toBe(2);
    graph.addVertex(getPerson(5));
    expect(graph.verticesSize()).toBe(3);
    expect(graph.edgesSize()).toBe(2);
    graph.addVertex(getPerson(1));
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(2);
    graph.addEdge(getPerson(1), new Person("3", 3), 0);
    expect(graph.verticesSize()).toBe(4);
    expect(graph.edgesSize()).toBe(3);
  });
  test("bfs", () => {
    const graph = getGraph();
    let string = "";
    graph.bfs(getPerson(1), (p: Person) => {
      string += p.age + " ";
      return false;
    });
    expect(string).toBe("1 2 3 4 5 6 ");
  });
  test("dfs", () => {
    const graph = getGraph();
    let string = "";
    graph.dfs(getPerson(1), (p: Person) => {
      string += p.age + " ";
      if (p.age === 3) return true;
      return false;
    });
    expect(string).toBe("1 2 4 6 3 ");
  });
  test("topologicalSort", () => {
    const graph = getGraph2();
    const [p1, p2, p3, p4, p5, p6] = graph.topologicalSort();
    expect(p1).toBe(getPerson(1));
    expect(p2).toBe(getPerson(2));
    expect(p3).toBe(getPerson(4));
    expect(p4).toBe(getPerson(3));
    expect(p5).toBe(getPerson(5));
    expect(p6).toBe(getPerson(6));
  });
});
