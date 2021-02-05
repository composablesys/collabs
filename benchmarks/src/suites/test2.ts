import framework from "../framework";

function addFunc() {
  let x = 0;
  for (let i = 0; i < 10000000; i++) {
    x += i;
  }
  return { x };
}

let suite = framework.newSuite("Test2");
suite.benchMemory("addFunc#memory", () => {}, addFunc);
suite.benchCpu("addFunc#time", () => {}, addFunc);
suite.benchGeneral(
  "addFunc#network",
  "Traffic sent (bytes)",
  () => {},
  () => {
    return 37;
  },
  1
);
