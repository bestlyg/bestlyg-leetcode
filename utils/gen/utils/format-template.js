const { diffArr } = require("./constants");
module.exports = function formatTemplate(name, url, difficulty, tag, desc) {
  if (!diffArr.includes(difficulty)) {
    throw new TypeError(`难度只有：${diffArr.join("、")}。`);
  }
  let str = `# ${name}
> 链接：[${name}](${url})  
> 难度：${difficulty}  
> 标签：${tag.join("、")}  
> 简介：${desc}  
`;
  return str;
};
