import WeightManager from "./WeightManager";
import EdgeInfo from "./EdgeInfo";
import { Hash } from "../../types";
import Graph from "./IGraph";
export default abstract class AbstractGraph<V extends Hash, E>
  implements Graph<V, E> {
  constructor(protected weightManager: WeightManager<E>) {}
  abstract edgesSize(): number;
  abstract verticesSize(): number;
  abstract addVertex(v: V): void;
  abstract addEdge(from: V, to: V, weight?: E): void;
  abstract removeVertex(v: V): void;
  abstract removeEdge(from: V, to: V): void;
  abstract bfs(begin: V, visitor: (v: V) => boolean): void;
  abstract dfs(begin: V, visitor: (v: V) => boolean): void;
  abstract topologicalSort(): V[];
  abstract mst(): Set<EdgeInfo<V, E>>;
}
