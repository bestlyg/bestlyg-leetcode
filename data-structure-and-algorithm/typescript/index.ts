import TreeMap from "./src/core/map/TreeMap";
import BinaryTreesPrinter from "./src/core/tree/BinaryTreesPrinter";

const map = new TreeMap<number, string>((e1, e2) => e1 - e2);
const nums = [93, 21, 79, 15, 56, 51, 23];
for (let num of nums) {
  map.put(num, num + "");
}
BinaryTreesPrinter.print(map);
for (let num of nums) {
  console.log(`==============
【${num}】`);
  console.log(map.remove(num));
  BinaryTreesPrinter.print(map);
}
console.log(map.size());
