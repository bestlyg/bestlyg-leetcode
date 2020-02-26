import { Person, getPerson } from "./src/utils/Person";
import ArrayList from "./src/code/list/ArrayList";
import SingleLinkedList from "./src/code/list/SingleLinkedList";
import SingleLinkedList2 from "./src/code/list/SingleLinkedList2";
import DuLinkedList from "./src/code/list/DuLinkedList";
import SingleCircleLinkedList from "./src/code/list/SingleCircleLinkedList";
import DuCircleLinkedList from "./src/code/list/DuCircleLinkedList";
import Stack from "./src/code/stack/Stack";
import Queue from "./src/code/queue/Queue";
import Deque from "./src/code/queue/Deque";
import CircleQueue from "./src/code/queue/CircleQueue";
import CircleDeque from "./src/code/queue/CircleDeque";
import BinaryTree from "./src/code/tree/BinaryTree";
import AVLTree from "./src/code/tree/AVLTree";
import IList from "./src/code/list/IList";
import Node from "./src/code/tree/Node";
import BinaryTreesPrinter from "./src/code/tree/BinaryTreesPrinter";
import BinarySearchTree from "./src/code/tree/BinarySearchTree";
import { toString } from "./src/utils/index";
const tree = new AVLTree<number>((n1, n2) => n1 - n2);
const nums = [79, 91, 14, 51, 10, 11, 95, 62, 84, 74, 19, 9, 18, 12];
for (const num of nums) {
  console.log(`===\n【${num}】:`);
  tree.add(num);
  BinaryTreesPrinter.print(tree);
}
