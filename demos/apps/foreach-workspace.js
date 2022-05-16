/**
 * Usage: node foreach-workspace.js -- <which> [-o <which skip>] <command>
 * For each workspace in package.json's workspaceLists.<which> field,
 * skipping those in workspaceLists.<which skip>, runs `command -w <workspace>`.
 * <command> must be a single argument; usually this means you must quote it.
 * A which of "all" uses package.json's workspaces field.
 */
const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

function error(message) {
  console.log("Error: " + message);
  console.log(
    "Usage: node foreach-workspace.js <which> [-s <which skip>] <command>"
  );
  process.exit(1);
}

(async function () {
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json")).toString()
  );

  const args = process.argv.slice(2);
  if (!(args.length === 2 || args.length === 4)) {
    error("Wrong number of arguments");
  }
  const which =
    args[0] === "all"
      ? packageJSON.workspaces
      : packageJSON.workspaceLists[args[0]];
  if (which === undefined) {
    error("Unknown which: " + args[0]);
  }
  let whichSkip = new Set();
  if (args.length === 4) {
    if (args[1] !== "-s") error("Unrecognized flag: " + args[1]);
    whichSkipList = packageJSON.workspaceLists[args[2]];
    if (whichSkipList === undefined) {
      error("Unknown whichSkip: " + args[2]);
    }
    whichSkip = new Set(whichSkipList);
  }
  const command = args[args.length - 1];

  for (const workspace of which) {
    if (whichSkip.has(workspace)) {
      console.log("skipping " + workspace);
      continue;
    }
    console.log("> " + command + " " + workspace);
    const out = child_process.spawnSync(command, [workspace], {
      stdio: [process.stdin, process.stdout, process.stderr],
      shell: true,
    });
    if (out.error) {
      console.log(out.error.toString());
      process.exit(1);
    }
    if (out.status !== 0) {
      console.log("exited with status " + out.status);
      process.exit(1);
    }
  }
})();
