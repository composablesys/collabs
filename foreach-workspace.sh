#!/bin/bash

set -e

for workspace in `jq -r '.workspaces | join(" ")' package.json`
do
  $1 $workspace
done
