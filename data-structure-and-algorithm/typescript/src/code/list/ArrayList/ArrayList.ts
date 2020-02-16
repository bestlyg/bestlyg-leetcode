import AbstractList from "../AbstractList";
import { isNumber } from "../../../utils";
export default class ArrayList<T> extends AbstractList<T> {
  private elements: Array<T> = []; //所有元素储存
  /**
   * 清除所有元素
   */
  public clear(): void {
    this.elements.length = 0;
  }
  /**
   * 元素的数量
   * @return
   */
  public size(): number {
    return this.elements.length;
  }
  /**
   * 是否为空
   * @return
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }
  /**
   * 查看元素的索引
   * @param element
   * @return
   */
  public indexOf(element: T): number {
    for (let i = 0, len = this.size(); i < len; i++) {
      if (this.elements[i] === element) {
        return i;
      }
    }
    return this.ELEMENT_NOT_FOUND;
  }
  /**
   * 获取index位置的元素
   * @param index
   * @return
   */
  public get(index: number): T {
    this.rangeCheck(index);
    return this.elements[index];
  }
  /**
   * 设置index位置的元素
   * @param index
   * @param element
   * @return 原来的元素ֵ
   */
  public set(index: number, element: T): T {
    this.rangeCheck(index);
    return this.elements.splice(index, 1, element)[0];
  }
  /**
   * 是否包含某个元素
   * @param element
   * @return
   */
  public contains(element: T): boolean {
    return this.indexOf(element) !== this.ELEMENT_NOT_FOUND;
  }
  add(element: T, index: number = this.size()): void {
    this.elements.splice(index, 0, element);
  }
  public remove(index: number | T): number | T {
    if (!isNumber(index)) {
      index = this.indexOf(index);
      this.rangeCheck(index);
      this.elements.splice(index, 1);
      return index;
    } else {
      this.rangeCheck(index);
      return this.elements.splice(index, 1)[0];
    }
  }
  public toString(): string {
    let string = `size:${this.size()},elements:[`;
    for (let i = 0, len = this.size(); i < len; i++) {
      if (i !== 0) {
        string += ",";
      }
      string += `${this.elements[i]}`;
    }
    string += "]";
    return string;
  }

  public first(): T {
    this.thorwEmpty("first");
    return this.elements[0];
  }
  public addFirst(element: T): void {
    this.elements.unshift(element);
  }
  public delFirst(): T {
    this.thorwEmpty("delFirst");
    return this.elements.shift()!;
  }
  public last(): T {
    this.thorwEmpty("last");
    return this.elements[this.size() - 1];
  }
  public addLast(element: T): void {
    this.elements.push(element);
  }
  public delLast(): T {
    this.thorwEmpty("delLast");
    return this.elements.pop()!;
  }
}
