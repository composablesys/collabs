import framework from "../framework";

// Example of something to benchmark.
function addFunc() {
  let x = 0;
  for (let i = 0; i < 1000; i++) {
    x += i;
  }
  return { x };
}

let suite = framework.newSuite("Test");
suite.benchCpu("addFunc#time", () => {}, addFunc);
suite.benchMemory("addFunc#memory", () => {}, addFunc);
suite.benchGeneral(
  "addFunc#network",
  "Traffic sent (bytes)",
  () => {},
  () => {
    return 42;
  },
  1
);
