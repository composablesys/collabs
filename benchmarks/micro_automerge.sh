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

#git pull origin paper-benchmarks
#cd ..
#npm reset
#npm run clean
#npm install
#npm run build
#cd benchmarks


# micro_crdts
for measurement in "time" "network" "memory"
do
    for frequency in "whole" "rounds"
    do
        for name in "Register" "Counter" "CounterMap" "CounterMapRolling" "LwwMap" "LwwMapRolling" "TextLtr" "TextRandom"
        do
            npm start -- $1 "micro_automerge" $name $measurement $frequency
        done
    done
done
