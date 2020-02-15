import { getPerson, Person } from "./src/utils";
import { DuLinkList } from "./src/code/list/LinkedList/DuLinkedList";

const list = new DuLinkList<Person>();
list.add(getPerson(1));
list.add(getPerson(2));
list.add(getPerson(3));
list.add(getPerson(4));
list.add(getPerson(5));
console.log(list.get(3));
