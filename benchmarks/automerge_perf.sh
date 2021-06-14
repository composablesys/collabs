#/usr/bin/bash

if [ -z "$4" ]
  then
    echo "Usage: ./automerge_perf.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --theirsOnly]"
    echo "If --oursOnly is set, only our library's tests are run."
    echo "If --theirsOnly is set, only competitors' tests are run."
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

if [ ! -z $5 ] && [ $5 == "--oursOnly" ]
then
  names=("treedocLww" "textCrdt" "mapLww")
elif [ ! -z $5 ] && [ $5 == "--theirsOnly" ]
then
  names=("yjs" "automerge")
else
  names=("treedocLww" "textCrdt" "mapLww" "yjs" "automerge")
fi

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in ${names[*]}
      do
          npm start -- $1 $2 $3 $4 "automerge_perf" $name $measurement $frequency
      done
    done
done
