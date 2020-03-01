import ISet from "./ISet";
import IMap from "../map/IMap";
import TreeMap from "../map/TreeMap";
/**
 * 内置TreeMap
 */
export default class TreeSet<T> implements ISet<T> {
  private map: IMap<T, null>;
  constructor(comparator: (t1: T, t2: T) => number) {
    this.map = new TreeMap<T, null>(comparator);
  }
  size(): number {
    return this.map.size();
  }
  isEmpty(): boolean {
    return this.map.isEmpty();
  }
  clear(): void {
    this.map.clear();
  }
  contains(element: T): boolean {
    return this.map.containsKey(element);
  }
  add(element: T): void {
    this.map.put(element, null);
  }
  remove(element: T): void {
    this.map.remove(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this.map.traversal(visitor);
  }
}
