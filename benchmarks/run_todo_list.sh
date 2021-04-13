#/usr/bin/sh

if [ -z "$1" ]
  then
    echo "Usage: ./paper_benchmarks.sh <outdir>"
    exit 1
fi


# todo_list
for measurement in "time" "memory" "network"
do
  for name in "plainJs" "compoCrdt" "compoJsonText" "yjs" #"compoJson" "automerge"
  do
    npm start -- $1 "todo_list" $name $measurement $2
  done
done
