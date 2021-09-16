/**
 * Runs the command given in the first command line argument
 * once with each workspace as its argument.
 *
 * Basically the same as "yarn workspaces foreach", but
 * homemade because I couldn't find an npm analog.
 */
const fs = require("fs");
const child_process = require("child_process");

(async function () {
  const command = process.argv[2];
  const packageJson = JSON.parse(fs.readFileSync("package.json").toString());
  const commands = [];
  for (const workspace of packageJson.workspaces) {
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
