#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./run_all.sh <outdir>"
    exit 1
fi

./run_todo_list.sh $1 whole
./run_todo_list.sh $1 rounds
./run_automerge_perf.sh $1 whole
./run_automerge_perf.sh $1 rounds
