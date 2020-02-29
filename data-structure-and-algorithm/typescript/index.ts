import { Person } from "./src/utils/Person";
import * as dataStruct from "./src/index";
import { getPerson } from "./src/utils";
const ArrayList = dataStruct.ArrayList;
const list = new ArrayList<Person>();
for (let i = 0; i < 15; i++) {
  list.add(getPerson(i));
}
for (let i = 0; i < 15; i++) {
  list.remove(0);
}
console.log(list.isEmpty());
console.log(list.size());
