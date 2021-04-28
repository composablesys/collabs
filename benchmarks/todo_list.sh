#/usr/bin/sh

if [ -z "$3" ]
  then
    echo "Usage: ./todo_list.sh <out folder> <warmup trials> <recorded trials>"
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
      for name in "compoCrdt" "compoJson" "compoJsonText" "yjs" "automerge" "automergeNoText" "compoJsonCrdt"
      do
          npm start -- $1 $2 $3 "todo_list" $name $measurement $frequency
      done
    done
done
