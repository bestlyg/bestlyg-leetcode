import AbstractGraph from "./Graph";
import EdgeInfo from "./EdgeInfo";
import HashSet from "../hash/HashSet";
import { Hash, Comparator } from "../../types";
import { equals, toString } from "../../utils";
import HashMap from "../hash/HashMap";
import Queue from "../queue/Queue";
import Stack from "../stack/Stack";
class Vertex<V extends Hash, E> implements Hash {
  inEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  outEdges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  constructor(public value: V) {}
  hashCode(): number {
    return this.value.hashCode();
  }
  equals(obj: any): boolean {
    return equals(this.value, (obj as Vertex<V, E>).value);
  }
  toString(): string {
    return this.value.toString();
  }
}
class Edge<V extends Hash, E> implements Hash {
  constructor(
    public from: Vertex<V, E>,
    public to: Vertex<V, E>,
    public weight: E
  ) {}
  info(): EdgeInfo<V, E> {
    return new EdgeInfo(this.from.value, this.to.value, this.weight);
  }
  hashCode(): number {
    return this.from.hashCode() * 31 + this.to.hashCode();
  }
  equals(obj: any): boolean {
    const edge: Edge<V, E> = obj as Edge<V, E>;
    return equals(this.from, edge.from) && equals(this.to, edge.to);
  }
  toString(): string {
    return (
      "Edge [from=" +
      this.from +
      ", to=" +
      this.to +
      ", weight=" +
      this.weight +
      "]"
    );
  }
}
export default class ListGraph<V extends Hash, E> extends AbstractGraph<V, E> {
  private _vertices: HashMap<V, Vertex<V, E>> = new HashMap<V, Vertex<V, E>>();
  private _edges: HashSet<Edge<V, E>> = new HashSet<Edge<V, E>>();
  private _edgeComparator: Comparator<Edge<V, E>> = (
    e1: Edge<V, E>,
    e2: Edge<V, E>
  ) => this.weightManager.compare(e1.weight, e2.weight);
  print(): void {
    console.log("【顶点】");
    this._vertices.traversal((key: V, value: Vertex<V, E>) => {
      console.log("------Vertices  start------");
      console.log(toString(key));
      console.log("--【out】");
      console.log(toString(value.outEdges));
      console.log("--【in】");
      console.log(toString(value.inEdges));
      return false;
    });
    console.log("【边】");
    this._edges.traversal(el => {
      console.log(toString(el));
      return false;
    });
  }
  edgesSize(): number {
    return this._edges.size();
  }
  verticesSize(): number {
    return this._vertices.size();
  }
  addVertex(v: V): void {
    if (this._vertices.containsKey(v)) return;
    this._vertices.put(v, new Vertex<V, E>(v));
  }
  addEdge(from: V, to: V, weight: E): void {
    let fromVertex: Vertex<V, E> | undefined = this._vertices.get(from);
    if (fromVertex === undefined) {
      fromVertex = new Vertex<V, E>(from);
      this._vertices.put(from, fromVertex);
    }
    let toVertex: Vertex<V, E> | undefined = this._vertices.get(to);
    if (toVertex === undefined) {
      toVertex = new Vertex<V, E>(to);
      this._vertices.put(to, toVertex);
    }
    const edge = new Edge<V, E>(fromVertex, toVertex, weight);
    if (fromVertex.outEdges.removeBoolean(edge)) {
      toVertex.inEdges.remove(edge);
      this._edges.remove(edge);
    }
    fromVertex.outEdges.add(edge);
    toVertex.inEdges.add(edge);
    this._edges.add(edge);
  }
  removeVertex(v: V): void {
    const vertex = this._vertices.remove(v);
    if (vertex === undefined) return;
    const temp: Edge<V, E>[] = [];
    vertex.outEdges.traversal(edge => {
      edge.to.inEdges.remove(edge);
      temp.push(edge);
      this._edges.remove(edge);
      return false;
    });
    temp.forEach(edge => vertex.outEdges.remove(edge));
    vertex.inEdges.traversal(edge => {
      edge.from.outEdges.remove(edge);
      temp.push(edge);
      this._edges.remove(edge);
      return false;
    });
    temp.forEach(edge => vertex.inEdges.remove(edge));
  }
  removeEdge(from: V, to: V): void {
    const fromVertex = this._vertices.get(from);
    if (fromVertex === undefined) return;
    const toVertex = this._vertices.get(to);
    if (toVertex === undefined) return;
    const edge = new Edge<V, E>(
      fromVertex,
      toVertex,
      this.weightManager.zero()
    );
    if (fromVertex.outEdges.removeBoolean(edge)) {
      toVertex.inEdges.remove(edge);
      this._edges.remove(edge);
    }
  }
  bfs(begin: V, visitor: (v: V) => boolean): void {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return;
    const visitedVertices = new HashSet<Vertex<V, E>>();
    const queue = new Queue<Vertex<V, E>>();
    queue.enQueue(beginVertex);
    visitedVertices.add(beginVertex);
    while (!queue.isEmpty()) {
      const vertex = queue.deQueue();
      if (visitor(vertex.value)) return;
      vertex.outEdges.traversal(edge => {
        if (!visitedVertices.contains(edge.to)) {
          queue.enQueue(edge.to);
          visitedVertices.add(edge.to);
        }
        return false;
      });
    }
  }
  dfs(begin: V, visitor: (v: V) => boolean): void {
    const beginVertex = this._vertices.get(begin);
    if (beginVertex === undefined) return;
    const visitedVertices = new HashSet<Vertex<V, E>>();
    const stack = new Stack<Vertex<V, E>>();
    stack.push(beginVertex);
    visitedVertices.add(beginVertex);
    if (visitor(beginVertex.value)) return;
    while (!stack.isEmpty()) {
      const vertex = stack.pop();
      let f = false;
      vertex.outEdges.traversal(edge => {
        if (visitedVertices.contains(edge.to)) return false;
        console.log(edge.to.value);
        stack.push(edge.from);
        stack.push(edge.to);
        visitedVertices.add(edge.to);
        if (visitor(edge.to.value)) f = true;
        return true;
      });
      if (f) return;
    }
  }
  topologicalSort(): V[] {
    const list: V[] = [];
    const queue: Queue<Vertex<V, E>> = new Queue<Vertex<V, E>>();
    const ins: Map<Vertex<V, E>, number> = new Map<Vertex<V, E>, number>();
    this._vertices.traversal((v: V, vertex: Vertex<V, E>) => {
      const outIn = vertex.inEdges.size();
      if (outIn === 0) queue.enQueue(vertex);
      else ins.set(vertex, outIn);
      return false;
    });
    while (!queue.isEmpty()) {
      const vertex = queue.deQueue();
      list.push(vertex.value);
      vertex.outEdges.traversal(edge => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const toIn = ins.get(edge.to)! - 1;
        if (toIn === 0) queue.enQueue(edge.to);
        else ins.set(edge.to, toIn);
        return false;
      });
    }
    return list;
  }
  mst(type = "prim"): Set<EdgeInfo<V, E>> {
    return type === "prim" ? this.prim() : this.kruskal();
  }
  private prim(): Set<EdgeInfo<V, E>> {
    const edgeInfos = new Set<EdgeInfo<V, E>>();
    return edgeInfos;
  }
  private kruskal(): Set<EdgeInfo<V, E>> {
    const edgeInfos = new Set<EdgeInfo<V, E>>();
    return edgeInfos;
  }
}
