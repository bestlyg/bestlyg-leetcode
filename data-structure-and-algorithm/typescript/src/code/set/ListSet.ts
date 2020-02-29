import IList from "../list/IList";
import DuLinkedList from "../list/DuLinkedList";
import ISet from "./ISet";
export default class ListSet<T> implements ISet<T> {
  private list: IList<T> = new DuLinkedList<T>();
  size(): number {
    return this.list.size();
  }
  isEmpty(): boolean {
    return this.list.isEmpty();
  }
  clear(): void {
    this.list.clear();
  }
  contains(element: T): boolean {
    return this.list.contains(element);
  }
  add(element: T): void {
    const list = this.list;
    const index = list.indexOf(element);
    if (index != list.ELEMENT_NOT_FOUND) {
      list.set(index, element);
    } else {
      this.list.add(element);
    }
  }
  remove(element: T): void {
    const list = this.list;
    const index = list.indexOf(element);
    if (index != list.ELEMENT_NOT_FOUND) {
      list.remove(index);
    }
  }
  traversal(visitor: (element: T) => boolean) {
    const list = this.list;
    const size = list.size();
    for (let i = 0; i < size; i++) {
      if (visitor(list.get(i))) return;
    }
  }
}
