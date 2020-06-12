const fs = require("fs-extra");
const { resolve } = require("./utils");
const tempPath = resolve("temp");
const resolveObjTemplate = `const solve = {
    name: "9. 回文数",
    url: "https://leetcode-cn.com/problems/palindrome-number/",
    tag: ["数学", "asd", "sad"],
    desc:
      "判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。",
    solves: [
      {
        type: "typescript",
        time: 80,
        memory: 35.9,
        desc: "介绍",
        code: \`/**\n  * @param {number} x\n  * @return {boolean}\n  */\n var isPalindrome = (x) =>\n   x.toString() === x.toString().split("").reverse().join("");\`
      }
    ]
  };
  module.exports = solve`;
const newNesolveObjTemplate = `const newSolve = {
  name: "9. 回文数",
  solves: [
    {
      type: "typescript",
      time: 272,
      memory: 45.8,
      desc: "翻转一半的数字进行判断",
      code: \`function isPalindrome(x: number): boolean {\n        if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n        let revertedNumber: number = 0;\n        while (x > revertedNumber) {\n          revertedNumber = revertedNumber * 10 + (x % 10);\n          x = ~~(x / 10);\n        }\n        return x === revertedNumber || x === ~~(revertedNumber / 10);\n}\`
    }
  ]
};
module.exports = newSolve;`;
run();
function run() {
  fs.ensureDirSync(tempPath);
  fs.ensureFile(`${tempPath}/index.js`);
  fs.ensureFile(`${tempPath}/index.ts`);
  fs.writeFile(`${tempPath}/resolve.js`, resolveObjTemplate);
  fs.writeFile(`${tempPath}/newSolve.js`, newNesolveObjTemplate);
}
