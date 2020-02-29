import { thorwEmptyError } from "../../utils";
import IList from "./IList";
export default abstract class AbstractList<T> implements IList<T> {
  ELEMENT_NOT_FOUND: number = -1;
  protected length: number = 0;
  public size(): number {
    return this.length;
  }
  public isEmpty(): boolean {
    return this.length === 0;
  }
  public contains(element: T): boolean {
    return this.indexOf(element) !== this.ELEMENT_NOT_FOUND;
  }
  protected rangeCheck(index: number): void {
    if (index < 0 || index >= this.size()) {
      this.outOfBounds(index);
    }
  }
  protected rangeCheckForAdd(index: number): void {
    if (index < 0 || index > this.size()) {
      this.outOfBounds(index);
    }
  }
  protected thorwEmpty(method: string) {
    if (this.isEmpty()) {
      thorwEmptyError("List")(method);
    }
  }
  protected outOfBounds(index: number): void {
    throw new Error("Index:" + index + ", Size:" + this.size());
  }
  abstract remove(element: number): T;
  abstract add(element: T, index?: number): void;
  abstract clear(): void;
  abstract get(index: number): T;
  abstract set(index: number, element: T): T;
  abstract indexOf(element: T): number;
  abstract first(): T;
  abstract addFirst(element: T): void;
  abstract delFirst(): T;
  abstract last(): T;
  abstract addLast(element: T): void;
  abstract delLast(): T;
}
