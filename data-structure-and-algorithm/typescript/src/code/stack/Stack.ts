import ArrayList from "../list/ArrayList";
import IList from "../list/IList";
import { thorwEmptyError } from "../../utils";
/**
 * @constructor
 * @type 栈
 */
export default class Stack<T> {
  private list: IList<T> = new ArrayList<T>();
  /**
   * 清空栈
   */
  public clear(): void {
    this.list.clear();
  }
  /**
   * 获取栈的大小
   * @return {number} 返回大小
   */
  public size(): number {
    return this.list.size();
  }
  /**
   * 判断栈是否为空
   *@return {boolean} true|false
   */
  public isEmpty(): boolean {
    return this.list.isEmpty();
  }
  /**
   * 压栈
   * @param {T} element 压栈的元素
   */
  public push(element: T): void {
    this.list.add(element);
  }
  /**
   * 出栈
   * @return {T} 出栈的元素
   */
  public pop(): T {
    this.thorwEmpty("pop");
    return this.list.remove(this.list.size() - 1) as T;
  }
  /**
   * 返回栈顶的元素
   * @return {T} 返回栈顶元素的值
   */
  public top(): T {
    return this.list.get(this.list.size() - 1);
  }
  private thorwEmpty(method: string) {
    if (this.isEmpty()) {
      thorwEmptyError("Stack")(method);
    }
  }
}
