#/usr/bin/sh

if [ -z "$2" ]
  then
    echo "Usage: ./run_todo_list.sh <outdir> <frequency>"
    exit 1
fi


# todo_list
for measurement in "time" "memory" "network"
do
  for name in "plainJs" "compoCrdt" "compoJsonText" "yjs" "compoJson" "automerge" "automergeNoText"
  do
    npm start -- $1 "todo_list" $name $measurement $2
  done
done
