#/usr/bin/sh

if [ -z "$2" ]
  then
    echo "Usage: ./run_benchmark_compare.sh <outdir> <frequency>"
    exit 1
fi


# automerge_perf
for measurement in "time" "memory" "network"
do
  for name in "compareBench"
  do
    npm start -- $1 "benchCompare" $name $measurement $2
  done
done
