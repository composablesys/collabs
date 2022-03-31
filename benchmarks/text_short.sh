#/usr/bin/bash

if [ -z "$5" ]
then
  echo "Usage: ./text_short.sh <out folder> <version> <warmup trials> <recorded trials> <text implementation>"
  echo "Runs RealText Single-Sender benchmarks for the given implementation."
  exit 1
fi

for measurement in "sendTime" "sendMemory" "sendNetwork" "receiveTime" "receiveMemory" "receiveSave"
do
  npm start -- $1 $2 $3 $4 $measurement RealText $5 single
done
