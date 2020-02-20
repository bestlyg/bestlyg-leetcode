import { getPerson, Person } from "./src/utils";
import BinarySearchTree from "./src/code/tree/BinarySearchTree";

function testCompare(p1: Person, p2: Person): number {
  return p1.Age - p2.Age;
}
function getNewBST(
  fn: (p1: Person, p2: Person) => number = testCompare
): BinarySearchTree<Person> {
  return new BinarySearchTree<Person>(fn);
}
function getBST(
  array: Person[] = [
    getPerson(6),
    getPerson(4),
    getPerson(1),
    getPerson(3),
    getPerson(5),
    getPerson(8),
    getPerson(7),
    getPerson(9),
    getPerson(2)
  ]
): BinarySearchTree<Person> {
  const bst = getNewBST();
  for (let i = 0, len = array.length; i < len; i++) {
    bst.add(array[i]);
  }
  return bst;
}
let string = "";
const bst = getBST();
bst.preorder((person: Person) => {
  string += person.Age + " ";
  if (person.Age === 5) return true;
  return false;
});
console.log(string);
