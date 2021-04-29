#/usr/bin/sh

if [ -z "$3" ]
  then
    echo "Usage: ./todo_list.sh <out folder> <warmup trials> <recorded trials> [--oursOnly]"
    echo "If --oursOnly is set, only our library's tests are run."
    exit 1
fi

if [ $2 == "0" ] && [ $3 == "0" ]
then
    echo "test run"
    set -e
fi

if [ ! -z $4 ] && [ $4 == "--oursOnly" ]
then
  names=("compoCrdt" "compoJson" "compoJsonText" "compoJsonCrdt")
else
  names=("compoCrdt" "compoJson" "compoJsonText" "yjs" "automerge" "automergeNoText" "compoJsonCrdt")
fi

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in ${names[*]}
      do
          npm start -- $1 $2 $3 "todo_list" $name $measurement $frequency
      done
    done
done
