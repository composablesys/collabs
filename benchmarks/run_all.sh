#/usr/bin/sh

if [ -z "$3" ]
  then
    echo "Usage: ./run_all.sh <out folder> <warmup trials> <recorded trials>"
    exit 1
fi

if [ $2 == "0" ] && [ $3 == "0" ]
then
    echo "test run"
    set -e
fi

./automerge_perf.sh $1 $2 $3
./micro_automerge.sh $1 $2 $3
./micro_crdts.sh $1 $2 $3
./micro_yjs.sh $1 $2 $3
./todo_list.sh $1 $2 $3
