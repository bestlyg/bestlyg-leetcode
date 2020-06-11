const fs = require("fs-extra");
const { solvePath, solveTemplate, formatTemplate } = require("./utils");
const solve = {
  name: "739. 每日温度",
  url: "https://leetcode-cn.com/problems/daily-temperatures/",
  tag: ["栈", "哈希表"],
  desc:
    "根据每日 气温 列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替。",
  solves: [
    {
      type: "typescript",
      time: 1732,
      memory: 45.5,
      desc: "倒序遍历，相比起正序遍历的每次都遍历到重复值节约时间",
      code: `function dailyTemperatures(T: number[]): number[] {
        const len = T.length;
        if (len === 0) return [];
        let ans: number[] = [];
        for (let i = len - 1; i >= 0; i--) {
          if (i === len - 1) {
            ans.unshift(0);
            continue;
          }
          ans.unshift(find(T[i], i + 1));
        }
        return ans;
        function find(num: number, index: number): number {
          for (let i = index; i < len; i++) if (T[i] > num) return i - index + 1;
          return 0;
        }
      }`
    },
    {
      type: "typescript",
      time: 196,
      memory: 50.3,
      desc: "维护单调栈，栈顶元素小于当前元素即赋值",
      code: `function dailyTemperatures(T: number[]): number[] {
        const stack: number[] = [];
        const ans: number[] = [];
        for (let i = 0, len = T.length; i < len; i++) {
          while (stack.length !== 0 && T[stack.slice(-1)[0]] < T[i]) {
            const index = stack.pop() as number;
            ans[index] = i - index;
          }
          stack.push(i);
        }
        while (stack.length !== 0) ans[stack.pop() as number] = 0;
        return ans;
      }`
    }
  ]
};
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
//       code: `/**
//   * @param {number} x
//   * @return {boolean}
//   */
//  var isPalindrome = (x) =>
//    x.toString() === x.toString().split("").reverse().join("");`
//     }
//   ]
// };
