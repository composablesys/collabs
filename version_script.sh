#!/bin/bash

# This script updates package.json versions and internal dependency versions.
# It's needed until we upgrade to an npm version that does this for us
# (https://github.com/npm/cli/pull/4588).

if [ "$#" -ne 2 ]; then
    echo "Usage: npm run version <old version> <new version>"
    echo "    E.g., npm run version 0.1.0 0.2.0"
    exit 1
fi

# Update versions.
echo "Updating version fields"
grep -rl --exclude-dir={node_modules,.git} --include="package.json" "\"version\": \"$1\"" . | xargs sed -i "s/\"version\": \"$1\"/\"version\": \"$2\"/g"

# Update dependencies. $package loops over published packages.
publishedStr=$(jq -r '.workspaceLists.publish | @sh' package.json)
declare -a published="($publishedStr)"
for package in "${published[@]}"
do
    echo "Updating dependencies on ${package}"
    grep -rl --exclude-dir={node_modules,.git} --include="package.json" "\"@collabs/$package\": \"$1\"" . | xargs sed -i "s/\"@collabs\/$package\": \"$1\"/\"@collabs\/$package\": \"$2\"/g"
done

# TODO: automatically update dependency versions in templates.
echo ""
echo "! Manually update template dependency versions if needed"
echo "!     E.g., 0.1.x -> 0.2.x"