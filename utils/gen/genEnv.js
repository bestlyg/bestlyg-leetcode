const fs = require("fs-extra");
const { resolve } = require("./utils");
const tempPath = resolve("temp");
const resolveObjTemplate =
  `module.exports = {
    name: "leetcode name",
    url: "leetcode url",
    tag: ["some","type"],
    desc:
      "input some description",
    solves: [
      {
        type: "typescript",
        time: 80,
        memory: 35.9,
        desc: "description",
        code: ` +
  "`" +
  "`" +
  `
      }
    ]
  };
  `;
const newNesolveObjTemplate =
  `module.exports = {
  name: "leetcode name",
  solves: [
    {
      type: "typescript",
      time: 272,
      memory: 45.8,
      desc: "description",
      code: ` +
  "`" +
  "`" +
  `
    }
  ]
};
`;
run();
function run() {
  fs.ensureDirSync(tempPath);
  fs.ensureFile(`${tempPath}/index.js`);
  fs.ensureFile(`${tempPath}/index.ts`);
  fs.writeFile(`${tempPath}/solve.js`, resolveObjTemplate);
  fs.writeFile(`${tempPath}/newSolve.js`, newNesolveObjTemplate);
}
