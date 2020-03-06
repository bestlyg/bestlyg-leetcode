import { getClassName, isIHash } from "./src/utils/";
import {
  getPerson,
  getMyNumber,
  Key,
  MyString,
  getMyString,
  getKey,
  getMyObject,
  Person,
  getHash,
  Hash
} from "./src/utils/model";
import { HashMap, BinaryTreesPrinter, LinkedHashMap } from "./src";
import { IHash } from "./src/types";
function getNewMap(): LinkedHashMap<IHash, any> {
  return new LinkedHashMap<IHash, any>();
}
function getMap(
  nums: number[] = [55, 87, 56, 74, 96, 22, 62, 20, 70, 68, 90, 50, 99]
): HashMap<IHash, any> {
  const map = getNewMap();
  for (let num of nums) {
    map.put(getKey(num), num);
  }
  return map;
}
const map = getNewMap();
for (let i = 0; i < 10; i++) map.put(getKey(i), i);
console.log(map.size());
console.log(map.containsValue(1));
