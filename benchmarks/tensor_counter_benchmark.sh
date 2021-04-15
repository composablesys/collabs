#!/usr/bin/sh

set -e

for frequency in "whole" "rounds"
do
    for measurement in "time" "network" "memory"
    do
      for name in "TensorCounter" "TensorCounter-1" "TensorCounter-10" "TensorCounter-50" "TensorCounter-100"
      do
        npm start -- $1 "micro_crdts" $name $measurement $frequency
      done
    done
done
