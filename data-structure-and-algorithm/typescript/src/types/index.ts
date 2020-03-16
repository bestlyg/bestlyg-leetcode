import IList from "../core/list/IList";
import IQueue from "../core/queue/IQueue";
import IDeque from "../core/queue/IDeque";
import IStack from "../core/stack/IStack";
import IBinaryTree from "../core/tree/IBinaryTree";
import ISet from "../core/set/ISet";
import IMap from "../core/map/IMap";
import IHeap from "../core/heap/IHeap";
import ITrie from "../core/trie/ITrie";
const ELEMENT_NOT_FOUND = -1;
type Comparator<T> = (el1: T, el2: T) => number;
interface ISort {
  readonly name: string;
  readonly swapCount: number;
  readonly compareCount: number;
  readonly time: number;
  readonly array: number[];
  readonly string: string;
  readonly toString: Function;
}
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
  _printerRoot(): any;
  /**
   * 左节点
   * @param {any} node
   * @return {any | null}
   */
  _printerLeft(node: any): any;
  /**
   * 右节点
   * @param {any} node
   * @return {any | null}
   */
  _printerRight(node: any): any;
  /**
   * 输出节点的方式
   * @param {any} node
   * @return {string}
   */
  _printerString(node: any): string;
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
  ITrie,
  IHash,
  IComparable,
  IBinaryTreesPrinter,
  ELEMENT_NOT_FOUND,
  Comparator,
  ISort
};
