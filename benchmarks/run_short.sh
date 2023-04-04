#!/bin/bash

if [ -z "$4" ]
then
  echo "Usage: ./run_short.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --othersOnly]"
  echo "Runs most benchmarks, skipping longer ones and near-duplicates."
  echo "If --oursOnly is set, only our library's tests are run."
  echo "If --othersOnly is set, only other libraries' tests are run."
  exit 1
fi

if [ ! -z $5 ] && [ $5 == "--oursOnly" ]
then
  which="ours"
elif [ ! -z $5 ] && [ $5 == "--othersOnly" ]
then
  which="others"
else
  which="all"
fi

echo "Which implementations: $which"

# Suffixes refer to Mode. Multi refers to rotate & concurrent modes.
function setImpls {
  if [ $which == "ours" ]
  then
    implsSingle=("${oursSingle[@]}")
    implsMulti=("${oursMulti[@]}")
  elif [ $which == "others" ]
  then
    implsSingle=("${othersSingle[@]}")
    implsMulti=("${othersMulti[@]}")
  else
    implsSingle=("${oursSingle[@]}" "${othersSingle[@]}")
    implsMulti=("${oursMulti[@]}" "${othersMulti[@]}")
  fi
}

in1=$1
in2=$2
in3=$3
in4=$4

function go {
  setImpls
  for implementation in ${implsSingle[*]}
  do
    for measurement in "sendTime" "sendMemory" "receiveAll"
    do
      npm start -- $in1 $in2 $in3 $in4 $measurement $trace $implementation single
    done
  done
  for implementation in ${implsMulti[*]}
  do
    for mode in "rotate" "concurrent"
    do
      for measurement in "receiveAll"
      do
        npm start -- $in1 $in2 $in3 $in4 $measurement $trace $implementation $mode
      done
    done
  done
}

# Skip CollabsCG implementations, since they're not too different from Collabs.
# Skip Automerge multi-sender implementations, since they are slow and concurrent
# mode sometimes OOMs.

trace="MicroMap"
oursSingle=("CollabsMap")
oursMulti=("CollabsMap")
othersSingle=("AutomergeMap" "YjsMap")
othersMulti=("YjsMap")
go

# Skip MicroMapRolling: almost the same as MicroMap.

trace="MicroVariable"
oursSingle=("CollabsVariable")
oursMulti=("CollabsVariable")
othersSingle=("AutomergeVariable" "YjsVariable")
othersMulti=("YjsVariable")
go

# Skip RealText since it is the longest. Consider run_text_short.sh instead.
# TODO: add this back if possible, but still skip RealText concurrent mode
# because it takes a while.

trace="TodoList"
oursSingle=("CollabsTodoList")
oursMulti=("CollabsTodoList")
othersSingle=("AutomergeTodoList" "YjsTodoList")
othersMulti=("YjsTodoList")
go

# Skip CollabsNestedNoop since it is a bit obscure.

trace="Noop"
oursSingle=("CollabsNoop")
oursMulti=("CollabsNoop")
othersSingle=()
othersMulti=()
go

trace="MicroTextLtr"
oursSingle=("CollabsText")
oursMulti=("CollabsText")
othersSingle=("AutomergeText" "YjsText")
othersMulti=("YjsText")
go

trace="MicroTextRandom"
go
