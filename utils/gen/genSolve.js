const fs = require("fs-extra");
const {
  solvePath,
  solveTemplate,
  formatTemplate,
  resolve
} = require("./utils");
const solve = require(resolve("temp/solve.js"));
run();
function run() {
  const { name, url, tag, desc, solves } = solve;
  let str = formatTemplate(name, url, tag, desc);
  let no = 1;
  for (const { type, time, memory, desc, code } of solves)
    str += solveTemplate(no++, type, time, memory, desc, code);
  fs.writeFileSync(solvePath(name), str);
}

// const solve = {
//   name: "9. 回文数",
//   url: "https://leetcode-cn.com/problems/palindrome-number/",
//   tag: ["数学", "asd", "sad"],
//   desc:
//     "判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。",
//   solves: [
//     {
//       type: "typescript",
//       time: 80,
//       memory: 35.9,
//       desc: "介绍",
//       code: `/**\n  * @param {number} x\n  * @return {boolean}\n  */\n var isPalindrome = (x) =>\n   x.toString() === x.toString().split("").reverse().join("");`
//     }
//   ]
// };
