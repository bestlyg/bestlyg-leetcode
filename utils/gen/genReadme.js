const fs = require("fs-extra");
const { resolve, otherReg } = require("./utils");
const toBeSolbed = require("./toBeSolved");
const srcPath = resolve("src");
const addField = (name, url) => `- [${name}](${url})\n`;
let res = "# bestlyg-leetcode\n" + "## 介绍\n" + "个人 LeetCode 题解\n";
const tagReg = new RegExp("标签：(.*)  ");
const difReg = new RegExp("难度：(.*)  ");
/**
 * 文档排序规则，若存在特殊字符串与数字比较则数字排前
 */
const mdSort = (a, b) => {
  const isOther1 = otherReg.test(a);
  const isOther2 = otherReg.test(b);
  if (isOther1 && !isOther2) return 1;
  else if (!isOther1 && isOther2) return -1;
  else if (isOther1 && isOther2) return 0;
  else return parseInt(a.substr(3)) - parseInt(b.substr(3));
};
const cache = {
  顺序索引: {},
  标签索引: {},
  难度索引: {}
};
run();
async function run() {
  addToBeResolved();
  resolveFolder();
  toString();
  fs.writeFileSync(resolve("README.md"), res);
  console.log(res);
}
function addToBeResolved() {
  res += "## 待完成题\n";
  for (const { name, url } of toBeSolbed) res += addField(name, url);
}
function resolveFolder() {
  const indexCache = cache["顺序索引"];
  const tagCache = cache["标签索引"];
  const difCache = cache["难度索引"];
  const folders = fs.readdirSync(srcPath).sort((a, b) => {
    if (a === "other") return 1;
    else if (b === "other") return -1;
    else {
      const n1 = parseInt(a.substring(0, a.indexOf("-")));
      const n2 = parseInt(b.substring(0, b.indexOf("-")));
      return n1 - n2;
    }
  });
  for (const folder of folders) {
    indexCache[folder] = !indexCache[folder] ? [] : indexCache[folder];
    const mds = fs.readdirSync(`${srcPath}/${folder}`);
    for (const md of mds) {
      const path = addField(md.substr(0, md.length - 3), `src/${folder}/${md}`);
      indexCache[folder].push(path);
      const file = fs.readFileSync(`${srcPath}/${folder}/${md}`).toString();
      const difGroup = difReg.exec(file);
      if (difGroup !== null) {
        const dif = difGroup[1];
        difCache[dif] = !difCache[dif] ? [] : difCache[dif];
        difCache[dif].push(path);
      }
      const tagGroup = tagReg.exec(file);
      const tags = tagGroup[1].split("、").filter((v) => v !== "");
      for (const tag of tags) {
        tagCache[tag] = !tagCache[tag] ? [] : tagCache[tag];
        tagCache[tag].push(path);
      }
    }
  }
}
function toString() {
  for (const key of Object.keys(cache)) {
    res += `## ${key}\n`;
    for (const [k, v] of Object.entries(cache[key])) {
      cache[key][k] = v.sort(mdSort);
      res += `### ${k}\n`;
      for (const field of v) res += field;
    }
  }
}
