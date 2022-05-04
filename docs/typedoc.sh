#!/bin/bash

set -e
set -x

# Only include published packages with TypeScript APIs (the ones you want public API docs for).
for package in "collabs" "container" "core" "crdts" "matrix-widget" "ws-client" "ws-server" # TODO: more
do
  typedoc --out generated/api/$package ../$package/src/index.ts --tsconfig ../$package/tsconfig.json
done
