import { getPerson, Person } from "./src/utils";
import DuCircleLinkedList from "./src/code/list/LinkedList/DuCircleLinkedList";

const list = new DuCircleLinkedList<Person>();
list.add(getPerson(1));
console.log(list.toString());
list.add(getPerson(2));
console.log(list.toString());
list.add(getPerson(3));
console.log(list.toString());
