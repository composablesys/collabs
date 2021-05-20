#/usr/bin/bash

if [ -z "$4" ]
  then
    echo "Usage: ./run_all.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --theirsOnly]"
    echo "If --oursOnly is set, only our library's tests are run."
    echo "If --theirsOnly is set, only competitors' tests are run."
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

./automerge_perf.sh $1 $2 $3 $4 $5
if [ -z $5 ] || [ $5 != "--theirsOnly" ]
then
  ./micro_crdts.sh $1 $2 $3 $4
fi
if [ -z $5 ] || [ $5 != "--oursOnly" ]
then
  ./micro_automerge.sh $1 $2 $3 $4
  ./micro_yjs.sh $1 $2 $3 $4
fi
./todo_list.sh $1 $2 $3 $4 $5
