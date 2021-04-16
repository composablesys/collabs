#/usr/bin/sh

set -e

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in "NoopCrdt" "DeepNoopCrdt" "Counter" "CounterPure" "Counter-1" "CounterPure-1" "Counter-10" "CounterPure-10" "Counter-50" "CounterPure-50" "Counter-100" "CounterPure-100" "MultiValueRegister" "LwwRegister" "NumberCrdt" "EnableWinsFlag" "AddWinsSet" "AddWinsSetRolling" "MapCrdt" "MapCrdtRolling" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom"
      do
        npm start -- $1 "micro_crdts" $name $measurement $frequency
      done
    done
done
