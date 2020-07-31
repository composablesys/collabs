#!/bin/sh

npm run tsc
npm run wp
cp -r build/. demo/public/
cp dist/test/demo_server.js demo/dist/test/demo_server.js
cp dist/src/server.js demo/dist/src/server.js
