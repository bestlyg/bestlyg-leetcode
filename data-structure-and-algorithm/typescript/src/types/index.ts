import IList from "../core/list/IList";
import IQueue from "../core/queue/IQueue";
import IDeque from "../core/queue/IDeque";
import IStack from "../core/stack/IStack";
import IBinaryTree from "../core/tree/IBinaryTree";
import ISet from "../core/set/ISet";
import IMap from "../core/map/IMap";
import IHeap from "../core/heap/IHeap";
interface IHash {
  hashCode(): number;
  equals(obj: any): boolean;
}
interface IComparable<T> {
  compareTo(obj: T): number;
}
interface IBinaryTreesPrinter {
  /**
   * 根节点
   */
  _root(): any;
  /**
   * 左节点
   * @param {any} node
   * @return {any | null}
   */
  _left(node: any): any;
  /**
   * 右节点
   * @param {any} node
   * @return {any | null}
   */
  _right(node: any): any;
  /**
   * 输出节点的方式
   * @param {any} node
   * @return {string}
   */
  _string(node: any): string;
}
export {
  IList,
  IQueue,
  IDeque,
  IStack,
  ISet,
  IBinaryTree,
  IMap,
  IHeap,
  IHash,
  IComparable,
  IBinaryTreesPrinter
};

// /**
//  * @type ergodic 遍历
//  * @type recursion 递归
//  */
// export type heightMethodType = "ergodic" | "recursion";
// /**
//  * @type unified 统一
//  * @type common 普通
//  */
// export type rebalanceMethodType = "unified" | "common";
