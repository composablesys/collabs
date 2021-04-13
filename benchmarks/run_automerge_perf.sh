#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./paper_benchmarks.sh <outdir>"
    exit 1
fi


# automerge_perf
for measurement in "time" "memory" "network"
do
  for name in "trivial" "plainJsArray" "treedocLww" "treedocPrimitiveLww" "mapLww" "yjs" #"automerge"
  do
    npm start -- $1 "automerge_perf" $name $measurement
  done
done
