import { Person, getPerson } from "./../../src/utils";
import Queue from "../../src/code/queue/Queue";
function getNewQueue() {
  return new Queue<Person>();
}
describe("queue", () => {
  test("toString", () => {
    const queue = getNewQueue();
    queue.enQueue(getPerson(1));
    queue.enQueue(getPerson(2));
    queue.enQueue(getPerson(3));
    expect(queue.toString()).toBe(
      "size:3,front->[Person name:1 age:1,Person name:2 age:2,Person name:3 age:3]"
    );
  });
});
