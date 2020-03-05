import ISet from "../set/ISet";
import IMap from "../map/IMap";
import HashMap from "./HashMap";
import { IHash } from "../../types";
/**
 * 内置HashMap
 */
export default class HashSet<T extends IHash> implements ISet<T> {
  private map: IMap<T, null> = new HashMap<T, null>();
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
