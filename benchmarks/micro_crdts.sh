#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./run_all.sh <outdir>"
    echo "(or ./run_all.sh --testRun to do a test run)"
    exit 1
fi

if [ $1 == "--testRun" ]; then
    echo "test run"
    set -e
fi

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
