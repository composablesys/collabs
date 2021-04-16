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
      for name in "Register" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom"
      do
        for lib in "micro_yjs"
        do
            npm start -- $1 $lib $name $measurement $frequency
        done
      done
    done
done
