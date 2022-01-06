import { startWebSocketServer } from "@collabs/ws-server";
import express from "express";
import fs from "fs";
import path from "path";
import https from "https";
import { Server } from "http";
import { Command } from "commander";

// Parse args
const program = new Command();
program.option(
  "-s, --https",
  "run in https mode, using a fake (not secret, self-signed) certificate"
);
program.option(
  "-u, --url",
  "interpret CONTAINER as an absolute URL instead of a file path"
);
program.name("container-testing-server");
program.usage(
  "[OPTION] CONTAINER\n\twhere CONTAINER is a container file (or URL, if --url is set)"
);
program.parse();
const containerArg = program.args[0];
if (containerArg === undefined) {
  console.log("Error: no container specified");
  program.help({ error: true });
}

const app = express();

let containerUrl: string;
if (program.opts().url) {
  containerUrl = containerArg;
} else {
  // container is a file.
  // Server local files under /container, based in the same
  // directory as containerUrl.
  containerUrl = "container/" + path.basename(containerArg);
  app.use(
    "/container",
    express.static(path.dirname(containerArg), {
      setHeaders: (res) => {
        // Allow CORS, so you can get the files with AJAX
        // from a selector host.
        res.set("Access-Control-Allow-Origin", "*");
      },
    })
  );
}

// Serve test server files in build/site (we'll be in build/server).
app.use((req, res) => {
  if (req.path === "/containerUrl.js") {
    // Autogenerate a script that returns the containerUrl var.
    // Use JSON.stringify(x).slice(1, -1) to convert the string
    // into somethat that JS will parse as that string again.
    res.set("Content-Type", "text/javascript");
    res.send(
      `const containerUrl = "${JSON.stringify(containerUrl).slice(1, -1)}";`
    );
    return;
  }
  if (req.path === "/reset.html") {
    resetMessageHistory();
  }
  res.sendFile(req.path, { root: path.join(__dirname, "../site") });
});

const port = process.env.PORT || 3000;
let server: Server;
// If option --https is set, start an HTTPS server with
// a fake (insecure, self-signed) key.
if (program.opts().https) {
  const key = fs.readFileSync(path.join(__dirname, "../../keys/demo-key.pem"));
  const cert = fs.readFileSync(
    path.join(__dirname, "../../keys/demo-cert.pem")
  );
  server = https
    .createServer({ key, cert }, app)
    .listen(port, () => console.log(`Listening at https://localhost:${port}/`));
} else {
  server = app.listen(port, () =>
    console.log(`Listening at http://localhost:${port}/`)
  );
}

// Run the ws-server.
const { reset } = startWebSocketServer({ server });
// If you replace the ws-server with something else,
// remove resetMessageHistory() and reset.html.
function resetMessageHistory() {
  reset();
  console.log("reset message history");
}
