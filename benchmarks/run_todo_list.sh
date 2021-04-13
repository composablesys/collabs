#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./paper_benchmarks.sh <outdir>"
    exit 1
fi

# exit when any command fails
set -e

# todo_list
for name in "plainJs" "compoCrdt" "compoJson" "compoJsonText" "yjs" "automerge"
do
  for measurement in "time" "memory" "network"
  do
    npm start -- $1 "todo_list" $name $measurement
  done
done
