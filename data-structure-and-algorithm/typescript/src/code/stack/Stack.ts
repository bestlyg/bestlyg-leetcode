import ArrayList from "../list/ArrayList";
import List from "../list/List";
import { thorwEmptyError } from "../../utils";

export default class Stack<T> {
  private list: List<T> = new ArrayList<T>();

  public clear(): void {
    this.list.clear();
  }

  public size(): number {
    return this.list.size();
  }

  public isEmpty(): boolean {
    return this.list.isEmpty();
  }

  public push(element: T): void {
    this.list.add(element);
  }

  public pop(): T {
    this.thorwEmpty("pop");
    return this.list.remove(this.list.size() - 1) as T;
  }

  public top(): T {
    return this.list.get(this.list.size() - 1);
  }
  private thorwEmpty(method: string) {
    if (this.isEmpty()) {
      thorwEmptyError("Stack")(method);
    }
  }
}
