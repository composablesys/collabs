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

# todo_list, short tests
for measurement in "time" "memory" "network"
do
    for frequency in "whole" "rounds"
    do
        for name in "plainJs" "compoCrdt" "compoJsonText" "yjs"
        do
            npm start -- $1 "todo_list" $name $measurement $frequency
        done
    done
done


# micro_crdts
for measurement in "time" "network" "memory"
do
    for frequency in "whole" "rounds"
    do
        for name in "NoopCrdt" "DeepNoopCrdt" "Counter" "CounterPure" "Counter-1" "CounterPure-1" "Counter-10" "CounterPure-10" "Counter-50" "CounterPure-50" "Counter-100" "CounterPure-100" "MultiValueRegister" "LwwRegister" "NumberCrdt" "EnableWinsFlag" "AddWinsSet" "AddWinsSetRolling" "MapCrdt" "MapCrdtRolling" "TreedocPrimitiveListLtr" "TreedocPrimitiveListRandom"
        do
            npm start -- $1 "micro_crdts" $name $measurement $frequency
        done
    done
done


# todo_list, long tests
for measurement in "time" "memory" "network"
do
    for frequency in "whole" "rounds"
    do
        for name in "compoJson" "automerge" "automergeNoText"
        do
            npm start -- $1 "todo_list" $name $measurement $frequency
        done
    done
done


# automerge_perf, short tests
for measurement in "time" "network" "memory"
do
    for frequency in "whole" "rounds"
    do
        for name in "treedocLww" "treedocPrimitiveLww" "yjs"
        do
            npm start -- $1 "automerge_perf" $name $measurement $frequency
        done
    done
done


# automerge_perf, long tests
for measurement in "time" "memory" "network"
do
    for frequency in "whole" "rounds"
    do
        for name in "automerge"
        do
            npm start -- $1 "automerge_perf" $name $measurement $frequency
        done
    done
done
