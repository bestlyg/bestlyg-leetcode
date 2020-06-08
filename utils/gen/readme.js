const fs = require("fs-extra");
const path = require("path");
const resolve = (p = "") => path.resolve(path.resolve(__dirname, "../../"), p);
const srcPath = resolve("src");
const addField = (name, url) => `- [${name}](${url})\n`;
let res = "# bestlyg-leetcode\n" + "## 介绍\n" + "个人 LeetCode 题解\n";
const tagReg = new RegExp("标签：(.*)  ");

const cache = {
  顺序索引: {},
  标签索引: {},
};
run();
async function run() {
  addToBeResolved();
  resolveFolder();
  toString();
  fs.writeFileSync(resolve("./README.md"), res);
  console.log(res);
}
function addToBeResolved() {
  const toBeResolbed = {
    "126.单词接龙II": "https://leetcode-cn.com/problems/word-ladder-ii/",
    "887.鸡蛋掉落": "https://leetcode-cn.com/problems/super-egg-drop/",
  };
  res += "## 待完成题\n";
  for (const [k, v] of Object.entries(toBeResolbed)) res += addField(k, v);
}
function resolveFolder() {
  const indexCache = cache["顺序索引"];
  const tagCache = cache["标签索引"];
  const folders = fs.readdirSync(srcPath).sort((a, b) => {
    if (a === "other") return 1;
    else if (b === "other") return -1;
    else {
      const n1 = parseInt(a.substring(0, a.indexOf("-")));
      const n2 = parseInt(b.substring(0, b.indexOf("-")));
      return n1 - n2;
    }
  });
  const mdSort = (a, b) => {
    const isface1 = a.substr(3, 3) === "面试题";
    const isface2 = b.substr(3, 3) === "面试题";
    if (isface1 && !isface2) return 1;
    else if (!isface1 && isface2) return -1;
    const n1 = isface1 ? parseInt(a.substr(6)) : parseInt(a.substr(3));
    const n2 = isface2 ? parseInt(b.substr(6)) : parseInt(b.substr(3));
    return n1 - n2;
  };
  for (const folder of folders) {
    indexCache[folder] = !indexCache[folder] ? [] : indexCache[folder];
    const mds = fs.readdirSync(`${srcPath}/${folder}`);
    for (const md of mds) {
      const path = addField(md.substr(0, md.length - 3), `src/${folder}/${md}`);
      indexCache[folder].push(path);
      const file = fs.readFileSync(`${srcPath}/${folder}/${md}`).toString();
      const tagGroup = tagReg.exec(file);
      const tags = tagGroup[1].split("、").filter((v) => v !== "");
      for (const tag of tags) {
        tagCache[tag] = !tagCache[tag] ? [] : tagCache[tag];
        tagCache[tag].push(path);
      }
    }
  }
  for (let [k, v] of Object.entries(indexCache)) indexCache[k] = v.sort(mdSort);
  for (let [k, v] of Object.entries(tagCache)) tagCache[k] = v.sort(mdSort);
}
function toString() {
  for (const key of Object.keys(cache)) {
    res += `## ${key}\n`;
    for (const [k, v] of Object.entries(cache[key])) {
      res += `### ${k}\n`;
      for (const field of v) res += field;
    }
  }
}
