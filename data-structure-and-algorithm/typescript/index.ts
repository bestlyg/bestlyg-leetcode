import { getPerson, Person } from "./src/utils";
import DuCircleLinkedList from "./src/code/list/DuCircleLinkedList";
import SingleLinkedList from "./src/code/list/SingleLinkedList";

const list = new SingleLinkedList<Person>();
const obj1 = getPerson(1);
list.clear();
console.log(list.size());
list.add(obj1);
console.log(list.size());
list.remove(0);
console.log(list.size());
