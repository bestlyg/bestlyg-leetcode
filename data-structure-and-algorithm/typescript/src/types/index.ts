import IList from "../core/list/IList";
import IQueue from "../core/queue/IQueue";
import IDeque from "../core/queue/IDeque";
import IStack from "../core/stack/IStack";
import IBinaryTree from "../core/tree/IBinaryTree";
import ISet from "../core/set/ISet";
import IMap from "../core/map/IMap";
interface IHash {
  hashCode(): number;
  equals(obj: any): boolean;
}
interface IComparable<T> {
  compareTo(obj: T): number;
}
export {
  IList,
  IQueue,
  IDeque,
  IStack,
  ISet,
  IBinaryTree,
  IMap,
  IHash,
  IComparable
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
