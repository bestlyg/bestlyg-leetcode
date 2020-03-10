import ISet from "../set/ISet";
import IMap from "../map/IMap";
import HashMap from "./HashMap";
import { IHash } from "../../types";
/**
 * 内置HashMap
 */
export default class HashSet<T extends IHash> implements ISet<T> {
  private _map: IMap<T, undefined> = new HashMap<T, undefined>();
  size(): number {
    return this._map.size();
  }
  isEmpty(): boolean {
    return this._map.isEmpty();
  }
  clear(): void {
    this._map.clear();
  }
  contains(element: T): boolean {
    return this._map.containsKey(element);
  }
  add(element: T): void {
    this._map.put(element, undefined);
  }
  remove(element: T): void {
    this._map.remove(element);
  }
  traversal(visitor: (element: T) => boolean): void {
    this._map.traversal(visitor);
  }
}
