#/usr/bin/bash

if [ -z "$4" ]
  then
    echo "Usage: ./todo_list.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --theirsOnly]"
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
  names=("compoCrdt" "compoJson" "compoJsonText" "compoJsonCrdt" "compoMovableCrdt")
elif [ ! -z $5 ] && [ $5 == "--theirsOnly" ]
then
  names=("yjs" "automerge" "automergeNoText")
else
  names=("compoCrdt" "compoJson" "compoJsonText" "yjs" "automerge" "automergeNoText" "compoJsonCrdt" "compoMovableCrdt")
fi

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in ${names[*]}
      do
          npm start -- $1 $2 $3 $4 "todo_list" $name $measurement $frequency
      done
    done
done
