import IHeap from "./IHeap";
export default abstract class AbstractHeap<T> implements IHeap<T> {
  protected _size: number = 0;
  protected comparator: (t1: T, t2: T) => number;
  constructor(comparator: (t1: T, t2: T) => number) {
    this.comparator = comparator;
  }
  size(): number {
    return this._size;
  }
  isEmpty(): boolean {
    return this._size === 0;
  }
  abstract clear(): void;
  abstract add(element: T);
  abstract get(): T;
  abstract remove(): T;
  abstract replace(element: T): T | null;
}
