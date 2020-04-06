import ArrayList from "./core/list/ArrayList";
import SingleLinkedList from "./core/list/SingleLinkedList";
import SingleLinkedList2 from "./core/list/SingleLinkedList2";
import DuLinkedList from "./core/list/DuLinkedList";
import SingleCircleLinkedList from "./core/list/SingleCircleLinkedList";
import DuCircleLinkedList from "./core/list/DuCircleLinkedList";
import Stack from "./core/stack/Stack";
import Queue from "./core/queue/Queue";
import Deque from "./core/queue/Deque";
import CircleQueue from "./core/queue/CircleQueue";
import CircleDeque from "./core/queue/CircleDeque";
import BinarySearchTree from "./core/tree/BinarySearchTree";
import AVLTree from "./core/tree/AVLTree";
import RedBlackTree from "./core/tree/RedBlackTree";
import ListSet from "./core/set/ListSet";
import TreeSet from "./core/set/TreeSet";
import TreeSet2 from "./core/set/TreeSet2";
import TreeMap from "./core/map/TreeMap";
import HashMap from "./core/hash/HashMap";
import HashSet from "./core/hash/HashSet";
import LinkedHashMap from "./core/hash/LinkedHashMap";
import LinkedHashSet from "./core/hash/LinkedHashSet";
import BinaryHeap from "./core/heap/BinaryHeap";
import Trie from "./core/trie/Trie";
import UnionFind_QF from "./core/union/UnionFind_QF";
import UnionFind_QU from "./core/union/UnionFind_QU";
import UnionFind_QU_S from "./core/union/UnionFind_QU_S";
import UnionFind_QU_R from "./core/union/UnionFind_QU_R";
import UnionFind_QU_R_PC from "./core/union/UnionFind_QU_R_PC";
import UnionFind_QU_R_PH from "./core/union/UnionFind_QU_R_PH";
import UnionFind_QU_R_PS from "./core/union/UnionFind_QU_R_PS";
import ListGraph from "./core/graph/ListGraph";
import BinaryTreesPrinter from "./utils/BinaryTreesPrinter";
import * as algorithms from "./core/algorithms";
import * as types from "./types";
export {
  ArrayList,
  SingleLinkedList,
  SingleLinkedList2,
  DuLinkedList,
  SingleCircleLinkedList,
  DuCircleLinkedList,
  Stack,
  Queue,
  Deque,
  CircleQueue,
  CircleDeque,
  BinarySearchTree,
  AVLTree,
  RedBlackTree,
  ListSet,
  TreeSet,
  TreeSet2,
  TreeMap,
  HashMap,
  HashSet,
  LinkedHashMap,
  LinkedHashSet,
  BinaryHeap,
  Trie,
  UnionFind_QF,
  UnionFind_QU,
  UnionFind_QU_S,
  UnionFind_QU_R,
  UnionFind_QU_R_PC,
  UnionFind_QU_R_PH,
  UnionFind_QU_R_PS,
  ListGraph,
  BinaryTreesPrinter,
  algorithms,
  types
};

//
import { Person, getPerson } from "./utils/model/";
import WeightManager from "./core/graph/WeightManager";
const manager: WeightManager<number> = {
  compare(w1: number, w2: number): number {
    return w1 - w2;
  },
  add(w1: number, w2: number): number {
    return w1 + w2;
  },
  zero(): number {
    return 0;
  }
};
const graph = new ListGraph<Person, number>(manager);
graph.addEdge(getPerson(1), getPerson(2), 0);
graph.addEdge(getPerson(2), getPerson(3), 0);
graph.addEdge(getPerson(2), getPerson(4), 0);
graph.addEdge(getPerson(2), getPerson(5), 0);
graph.addEdge(getPerson(5), getPerson(6), 0);
console.log(graph.topologicalSort());
//
