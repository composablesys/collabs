#/usr/bin/sh

if [ -z "$4" ]
  then
    echo "Usage: ./micro_automerge.sh <out folder> <version> <warmup trials> <recorded trials>"
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
        for name in "Register" "Counter" "CounterMap" "CounterMapRolling" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom"
        do
            npm start -- $1 $2 $3 $4 "micro_automerge" $name $measurement $frequency
        done
    done
done
