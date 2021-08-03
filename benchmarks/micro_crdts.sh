#/usr/bin/bash

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
    for measurement in "time" "network" "memory" "save"
    do
      for name in "NoopCrdt" "DeepNoopCrdt" "Counter" "Counter-1" "Counter-10" "Counter-50" "Counter-100" "MultiValueRegister" "Register" "NumberCrdt" "EnableWinsFlag" "AddWinsSet" "AddWinsSetRolling" "AddWinsSetRollingGrow" "MapCrdt" "MapCrdtRolling" "MapCrdtRollingGrow" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom" "LwwMapRollingGrow" "TextLtrGrow" "TextRandomGrow" "RgaLtr" "RgaRandom" "RgaLtrGrow" "RgaRandomGrow"
      do
        npm start -- $1 $2 $3 $4 "micro_crdts" $name $measurement $frequency
      done
    done
done

#  "TensorAvg" "TensorAvg-1" "TensorAvg-10" "TensorAvg-50" "TensorAvg-100" "TensorCounter" "TensorCounter-1" "TensorCounter-10" "TensorCounter-50" "TensorCounter-100"
