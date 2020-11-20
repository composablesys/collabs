# Compoventuals

One day, we'll come up with a better name.

(Template based on [ts-demo-webpack](https://github.com/rauschma/ts-demo-webpack))

## How to build on local?

Run the following command under root folder `/compoventuals` and wait for setup process:

```
sh heroku_deploy.sh
```

The shell script will do the following work for you:
* Clean the old dependencies for the main project and all sub npm projects.
* Install the new dependencies for the main project and all sub npm projects.
* Compile all the sub projects.
* Build webpack webpage in the `demo` sub project.

**Note:**
All the steps can be done manually with other options
- Can also do `npm run tscw` or `npm run wpw` to have things rebuild automatically on file save.


## How to run the local server?

Run the following command under root folder `/compoventuals`, the local server will listen on port `3000`:
```
npm start
```

Access the service via `localhost:3000`, look at the console to see outputs of current deployment.

## How to build on Heroku?

Deploys to https://compoventuals-tests.herokuapp.com/

* The Heroku deployment will be automatically triggered by `git commit` and `git push`.
* The Heroku server will run the shell script `heroku_deploy.sh` and `npm start` to build and run the project.

Options for manually deployment:

* Log in your Heroku with CLI tool and verify on browser:

```
heroku login
```

* Commit and push the code on Heroku master just like the way you do on Github:

```
git add ${selected files}
git commit -m ${commit messages}
git push heroku master
git push
```

## client package commands

* `npm run build`: Build
* `npm run test`: Run tests (from test/test.ts) in node
* `npm run bench`: Run benchmark suite (from test/benchmark/benchmark.ts) in node
