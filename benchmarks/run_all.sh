#!/bin/bash

if [ -z "$4" ]
then
  echo "Usage: ./run_all.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --othersOnly]"
  echo "If --oursOnly is set, only Collabs's tests are run."
  echo "If --othersOnly is set, only other frameworks' tests are run."
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

# Skip "single" mode for CollabsNoVC, since it's not interesting.

trace="Map"
oursSingle=("CollabsMap")
oursMulti=("CollabsMap" "CollabsNoVCMap")
othersSingle=("AutomergeMap" "YjsMap")
othersMulti=("AutomergeMap" "YjsMap")
go

trace="MapRolling"
go

trace="Variable"
oursSingle=("CollabsVariable")
oursMulti=("CollabsVariable" "CollabsNoVCVariable")
othersSingle=("AutomergeVariable" "YjsVariable")
othersMulti=("AutomergeVariable" "YjsVariable")
go

trace="Noop"
oursSingle=("CollabsNoop" "CollabsNestedNoop")
oursMulti=("CollabsNoop" "CollabsNoVCNoop" "CollabsNestedNoop" "CollabsNoVCNestedNoop")
othersSingle=()
othersMulti=()
go

trace="TextLtr"
oursSingle=("CollabsText")
oursMulti=("CollabsText" "CollabsNoVCText")
othersSingle=("AutomergeText" "YjsText")
othersMulti=("AutomergeText" "YjsText")
go

trace="TextRandom"
go

trace="TodoList"
oursSingle=("CollabsTodoList")
oursMulti=("CollabsTodoList" "CollabsNoVCTodoList")
# TODO: implement AutomergeTodoList
othersSingle=("YjsTodoList")
othersMulti=("YjsTodoList")
go

trace="RealText"
oursSingle=("CollabsRichTextWithCursor")
oursMulti=("CollabsRichTextWithCursor" "CollabsNoVCRichTextWithCursor")
othersSingle=("AutomergeTextWithCursor" "YjsTextWithCursor")
othersMulti=("AutomergeTextWithCursor" "YjsTextWithCursor")
go