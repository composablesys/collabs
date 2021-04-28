#/usr/bin/sh

if [ -z "$3" ]
  then
    echo "Usage: ./automerge_perf.sh <out folder> <warmup trials> <recorded trials>"
    exit 1
fi

if [ $2 == "0" ] && [ $3 == "0" ]
then
    echo "test run"
    set -e
fi

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in "treedocLww" "treedocPrimitiveLww" "mapLww" "yjs" "automerge"
      do
          npm start -- $1 $2 $3 "automerge_perf" $name $measurement $frequency
      done
    done
done
