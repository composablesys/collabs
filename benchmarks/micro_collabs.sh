#/usr/bin/bash

if [ -z "$4" ]
  then
    echo "Usage: ./micro_collabs.sh <out folder> <version> <warmup trials> <recorded trials>"
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

for frequency in "whole"
do
    for measurement in "time" "network" "memory" "save"
    do
      for name in "Noop" "DeepNoop" "Counter" "Counter-1" "Counter-10" "Counter-50" "Counter-100" "MultiValueRegister" "Register" "Number" "EnableWinsFlag" "AddWinsSet" "AddWinsSetRolling" "AddWinsSetRollingGrow" "Map" "MapRolling" "MapRollingGrow" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom" "LwwMapRollingGrow" "TextLtrGrow" "TextRandomGrow" "TensorAvg-10" "TensorCounter-10"
      do
        if [ $measurement == "save" ] && [[ $name == Tensor* ]]
        then
          echo "Skipping micro_collabs $name save (not implemented)"
        else
          npm start -- $1 $2 $3 $4 "micro_collabs" $name $measurement $frequency
        fi
      done
    done
done

#  "TensorAvg" "TensorAvg-1" "TensorAvg-10" "TensorAvg-50" "TensorAvg-100" "TensorCounter" "TensorCounter-1" "TensorCounter-10" "TensorCounter-50" "TensorCounter-100"
