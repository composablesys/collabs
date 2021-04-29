#/usr/bin/sh

if [ -z "$3" ]
  then
    echo "Usage: ./run_all.sh <out folder> <warmup trials> <recorded trials> [--oursOnly]"
    echo "If --oursOnly is set, only our library's tests are run."
    exit 1
fi

if [ $2 == "0" ] && [ $3 == "0" ]
then
    echo "test run"
    set -e
fi

./automerge_perf.sh $1 $2 $3 $4
./micro_crdts.sh $1 $2 $3
if [ -z $4 ] || [ $4 != "--oursOnly" ]
then
  ./micro_automerge.sh $1 $2 $3
  ./micro_yjs.sh $1 $2 $3
fi
./todo_list.sh $1 $2 $3 $4
