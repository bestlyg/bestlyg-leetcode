function formatTemplate(name, url, tag, desc) {
  let str = `# ${name}
> 链接：[${name}](${url})  
> 标签：${tag.join("、")}  
> 简介：${desc}  
`;
  return str;
}
module.exports = formatTemplate;
