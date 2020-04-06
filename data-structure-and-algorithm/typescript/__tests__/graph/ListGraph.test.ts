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
describe("Graph", () => {
  test("common test", () => {
    const graph = getNewGraph();
    graph.addEdge(getPerson(1), getPerson(2), 0);
    graph.addEdge(getPerson(1), getPerson(3), 0);
    graph.addEdge(getPerson(2), getPerson(4), 0);
    graph.addEdge(getPerson(3), getPerson(5), 0);
    graph.addEdge(getPerson(3), getPerson(4), 0);
    graph.addEdge(getPerson(4), getPerson(1), 0);
    graph.addEdge(getPerson(4), getPerson(6), 0);
    graph.addEdge(getPerson(5), getPerson(6), 0);
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
});
