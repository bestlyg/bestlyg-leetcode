import ISet from "./ISet";
import { ELEMENT_NOT_FOUND } from "../../types";
import { Visitor } from "../../utils/visitor_T";
export default class ListSet<T> implements ISet<T> {
  private list: T[] = [];
  size(): number {
    return this.list.length;
  }
  isEmpty(): boolean {
    return this.size() === 0;
  }
  clear(): void {
    this.list.length = 0;
  }
  contains(element: T): boolean {
    return this.list.includes(element);
  }
  add(element: T): void {
    const list = this.list;
    const index = list.indexOf(element);
    if (index !== ELEMENT_NOT_FOUND) {
      list[index] = element;
    } else {
      list.push(element);
    }
  }
  remove(element: T): void {
    const list = this.list;
    const index = list.indexOf(element);
    if (index != ELEMENT_NOT_FOUND) {
      list.splice(index, 1);
    }
  }
  traversal(visitor: Visitor<T>) {
    for (let el of this.list) if (visitor(el)) return;
  }
}
