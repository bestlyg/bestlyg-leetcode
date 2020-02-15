import { getPerson, Person } from "./src/utils";
import { SingleLinkedList } from "./src/code/list/LinkedList/SingleLinkedList";

const list = new SingleLinkedList<Person>();
const obj1 = getPerson(1);
const obj2 = getPerson(2);
const obj3 = getPerson(3);
list.add(obj1);
list.add(obj2);
list.add(obj3);
console.log(list.remove(obj3));
