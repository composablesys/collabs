#/usr/bin/sh

if [ -z "$4" ]
  then
    echo "Usage: ./micro_crdts.sh <out folder> <version> <warmup trials> <recorded trials>"
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
      for name in "NoopCrdt" "DeepNoopCrdt" "Counter" "CounterPure" "Counter-1" "CounterPure-1" "Counter-10" "CounterPure-10" "Counter-50" "CounterPure-50" "Counter-100" "CounterPure-100" "MultiValueRegister" "Register" "NumberCrdt" "EnableWinsFlag" "AddWinsSet" "AddWinsSetRolling" "AddWinsSetRollingGrow" "MapCrdt" "MapCrdtRolling" "MapCrdtRollingGrow" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom" "LwwMapRollingGrow" "TextLtrGrow" "TextRandomGrow"
      do
        npm start -- $1 $2 $3 $4 "micro_crdts" $name $measurement $frequency
      done
    done
done
