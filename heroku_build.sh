#!/bin/sh

npm run tsc
npm run wp
cp -r build/. app/public/
cp dist/test/heroku_server.js app/dist/test/heroku_server.js
cp dist/src/server.js app/dist/src/server.js

