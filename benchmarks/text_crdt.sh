#/usr/bin/bash

# Runs benchmarks using our TextCrdt only

if [ -z "$4" ]
  then
    echo "Usage: ./text_crdt.sh <out folder> <version> <warmup trials> <recorded trials>"
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

# todo-list

names=("compoCrdt" "compoJSONText" "compoJSONCrdt" "compoMovableCrdt")

for frequency in "whole"
do
    for measurement in "time" "network" "memory" "save"
    do
      for name in ${names[*]}
      do
          npm start -- $1 $2 $3 $4 "todo_list" $name $measurement $frequency
      done
    done
done

# automerge-perf
names=("text")

for frequency in "whole"
do
    for measurement in "time" "network" "memory" "save"
    do
      for name in ${names[*]}
      do
          npm start -- $1 $2 $3 $4 "automerge_perf" $name $measurement $frequency
      done
    done
done
