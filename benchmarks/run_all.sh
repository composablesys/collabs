#/usr/bin/sh

if [ -z "$4" ]
  then
    echo "Usage: ./run_all.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly]"
    echo "If --oursOnly is set, only our library's tests are run."
    exit 1
fi

if [ $3 == "0" ] && [ $4 == "0" ]
then
    echo "test run"
    set -e
fi

./automerge_perf.sh $1 $2 $3 $4 $5
./micro_crdts.sh $1 $2 $3 $4
if [ -z $5 ] || [ $5 != "--oursOnly" ]
then
  ./micro_automerge.sh $1 $2 $3 $4
  ./micro_yjs.sh $1 $2 $3 $4
fi
./todo_list.sh $1 $2 $3 $4 $5
