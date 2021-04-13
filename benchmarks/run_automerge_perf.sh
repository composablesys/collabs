#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./paper_benchmarks.sh <outdir>"
    exit 1
fi

# exit when any command fails
set -e

# automerge_perf
for name in "trivial" "plainJsArray" "treedocLww" "treedocPrimitiveLww" "mapLww" "yjs" "automerge"
do
  for measurement in "time" "memory" "network"
  do
    npm start -- $1 "automerge_perf" $name $measurement
  done
done
