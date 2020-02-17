import { getPerson, Person } from "./src/utils";
import DuCircleLinkedList from "./src/code/list/DuCircleLinkedList";
import SingleLinkedList from "./src/code/list/SingleLinkedList";
import CircleQueue from "./src/code/queue/CircleQueue";

const queue = new CircleQueue<Person>(10);
for (let i = 0; i < 10; i++) {
  queue.enQueue(getPerson(i));
}
console.log(queue.toString());
for (let i = 0; i < 9; i++) {
  queue.deQueue();
}
console.log(queue.toString());
for (let i = 0; i < 3; i++) {
  queue.enQueue(getPerson(i));
  console.log(queue.toString());
}
console.log(queue.toString());
