const fs = require("fs-extra");
const { solveTemplate, solvePath } = require("./utils");
const newSolve = {};
run();
function run() {
  let { name, solves } = newSolve;
  const path = solvePath(name);
  let str = fs.readFileSync(path).toString();
  let last = parseInt(
    str
      .match(/题解 (\d{1,20}) -/g)
      .reverse()[0]
      .split(" ")[1]
  );
  for (const { type, time, memory, desc, code } of solves)
    str += solveTemplate(++last, type, time, memory, desc, code);
  fs.writeFileSync(path, str);
}

// const newSolve = {
//   name: "9. 回文数",
//   solves: [
//     {
//       type: "typescript",
//       time: 272,
//       memory: 45.8,
//       desc: "翻转一半的数字进行判断",
//       code: `function isPalindrome(x: number): boolean {
//         if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
//         let revertedNumber: number = 0;
//         while (x > revertedNumber) {
//           revertedNumber = revertedNumber * 10 + (x % 10);
//           x = ~~(x / 10);
//         }
//         return x === revertedNumber || x === ~~(revertedNumber / 10);
//       }
//       `
//     }
//   ]
// };
