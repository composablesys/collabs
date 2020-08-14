# Compoventuals

One day, we'll come up with a better name.

(Template based on [ts-demo-webpack](https://github.com/rauschma/ts-demo-webpack))

Install: npm install
Also run this whenever someone changes package.json.

Build:
* Compile: npm run tsc
* Build webpack webpage: npm run wp
* (Can also do "npm run tscw" or "npm run wpw" to have things rebuild automatically on file save)
* Build demo server for Heroku: npm run demobuild

Run:
* Webpack webpage: npm run serve
    * Look at the console to see outputs of current tests (anything that's run/required in src/main.ts)
    * Currently this complains because we use the same webpage (html/index.html and src/main.ts) for both webpack and Heroku, but only Heroku starts the CRDT message server
* Demo server for Heroku: npm run start
(This is what Heroku runs when you git commit it)
    * Deploys to https://compoventuals-tests.herokuapp.com/
    * You can also deploy it locally if you install the heroku command line tools
* Individual files (e.g., test/causal_broadcast_test_server.ts and test/basic_causal_network/causal_broadcast_tests.ts, which when run in that order will do a basic test of the causal broadcast network): "npm run tsc" to compile; cd into the directory containing the compiled .js version of the files (in demo/); "node &lt; filename &gt;"


## How to run tests?

After running the complie command `npm run tsc`, all the files that test needed is under `./dist/test/`

- Note: The `./dist` file is in .gitignore 


### Run tests without server

You can run test under `./dist/test/crdts` by:

```
node ${test scripts name}
```

### Run tests with localhost server 

You have to start the localhost casual broadcasting server by: 

```
node causal_broadcast_test_server.js
```

And then you can do the integration test under `./dist/test/crdt_network_integration` by:

```
node ${test scripts name}
```