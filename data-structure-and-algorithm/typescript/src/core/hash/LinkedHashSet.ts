import ISet from "../set/ISet";
import IMap from "../map/IMap";
import LinkedHashMap from "./LinkedHashMap";
import { IHash } from "../../types";
/**
 * 内置LinkedHashMap
 */
export default class LinkedHashSet<T extends IHash> implements ISet<T> {
  private map: IMap<T, undefined> = new LinkedHashMap<T, undefined>();
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
    this.map.put(element, undefined);
  }
  remove(element: T): void {
    this.map.remove(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this.map.traversal(visitor);
  }
}
