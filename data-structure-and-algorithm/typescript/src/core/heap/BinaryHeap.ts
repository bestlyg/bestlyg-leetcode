import AbstractHeap from "./AbstractHeap";
import { IBinaryTreesPrinter } from "../../types";
import { thorwEmptyError, toString } from "../../utils";
export default class BinaryHeap<T> extends AbstractHeap<T>
  implements IBinaryTreesPrinter {
  private elements: T[] = [];
  constructor(comparator: (t1: T, t2: T) => number, elements: T[] = []) {
    super(comparator);
    const size = elements.length;
    if (size !== 0) {
      this.elements = [...elements];
      this._size = size;
      this.heapify();
    }
  }
  clear(): void {
    this.elements.length = 0;
    this._size = 0;
  }
  add(element: T) {
    this.elements.push(element);
    this.siftUp(this._size++);
  }
  get(): T {
    this.emptyCheck("get");
    return this.elements[0];
  }
  remove(): T {
    this.emptyCheck("remove");
    const root = this.elements[0];
    this.elements[0] = this.elements.pop()!;
    this._size--;
    this.siftDown(0);
    return root;
  }
  replace(element: T): T | null {
    let root: T | null = null;
    if (this._size === 0) {
      this.elements[0] = element;
      this._size++;
    } else {
      root = this.elements[0];
      this.elements[0] = element;
      this.siftDown(0);
    }
    return root;
  }
  heapify(): void {
    for (let i = (this._size >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }
  private siftUp(index: number): void {
    const element = this.elements[index];
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      const parent = this.elements[parentIndex];
      if (this.comparator(element, parent) <= 0) break;
      this.elements[index] = parent;
      index = parentIndex;
    }
    this.elements[index] = element;
  }
  private siftDown(index: number): void {
    const element = this.elements[index];
    const half = this._size >> 1;
    while (index < half) {
      let childIndex = (index << 1) + 1;
      let child = this.elements[childIndex];
      const rightIndex = childIndex + 1;
      if (
        rightIndex < this._size &&
        this.comparator(this.elements[rightIndex], child) > 0
      ) {
        child = this.elements[(childIndex = rightIndex)];
      }
      if (this.comparator(element, child) >= 0) break;
      this.elements[index] = child;
      index = childIndex;
    }
    this.elements[index] = element;
  }
  private emptyCheck(string: string): void {
    if (this.isEmpty()) thorwEmptyError("BinaryHeap")(string);
  }
  _root(): any {
    return 0;
  }
  _left(node: any): any {
    const index = ((<number>node) << 1) + 1;
    return index >= this._size ? null : index;
  }
  _right(node: any): any {
    const index = ((<number>node) << 1) + 2;
    return index >= this._size ? null : index;
  }
  _string(node: any): string {
    return toString(this.elements[node as number]);
  }
}
