#!/bin/bash

set -e
set -x

cd ..

# TODO: dedupe package list. Must be in build order.
for package in "core" "crdts" "collabs" "container" "matrix-widget" "ws-client" "ws-server"
do
  npm run build -w $package
done

cd docs

# Only include published packages with TypeScript APIs (the ones you want public API docs for).
for package in "core" "crdts" "collabs" "container" "matrix-widget" "ws-client" "ws-server"
do
  typedoc --out generated/api/$package ../$package/src/index.ts --tsconfig ../$package/tsconfig.json
done
