#!/usr/bin/sh

set -e

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in "TensorAvg" "TensorAvg-1" "TensorAvg-10" "TensorAvg-50" "TensorAvg-100"
      do
        npm start -- $1 "micro_crdts" $name $measurement $frequency
      done
    done
done
