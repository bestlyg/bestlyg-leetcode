const fs = require("fs-extra");
const { solveTemplate, solvePath, resolve } = require("./utils");
const newSolve = require(resolve("temp/newSolve.js"));
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
