#/usr/bin/sh

if [ -z "$2" ]
  then
    echo "Usage: ./run_automerge_perf.sh <outdir> <frequency>"
    exit 1
fi


# automerge_perf
for measurement in "time" "memory" "network"
do
  for name in "trivial" "plainJsArray" "treedocLww" "treedocPrimitiveLww" "mapLww" "yjs" #"automerge"
  do
    npm start -- $1 "automerge_perf" $name $measurement $2
  done
done
