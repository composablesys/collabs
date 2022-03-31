#/usr/bin/bash

if [ -z "$4" ]
then
  echo "Usage: ./run_paper.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --othersOnly]"
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

function setImpls {
  if [ $which == "ours" ]
  then
    implementations=("${ours[@]}")
  elif [ $which == "others" ]
  then
    implementations=("${others[@]}")
  else
    implementations=("${ours[@]}" "${others[@]}")
  fi
}

in1=$1
in2=$2
in3=$3
in4=$4

function go {
  setImpls
  for implementation in ${implementations[*]}
  do
    for measurement in "sendTime" "sendMemory" "sendNetwork" "receiveTime" "receiveMemory" "receiveSave"
    do
      npm start -- $in1 $in2 $in3 $in4 $measurement $trace $implementation single
    done
    for measurement in "sendNetwork" "receiveTime" "receiveMemory" "receiveSave"
    do
      npm start -- $in1 $in2 $in3 $in4 $measurement $trace $implementation multi
    done
  done
}

trace="MicroMapRolling"
ours=("CollabsMap")
others=("AutomergeMap" "YjsMap")
go

trace="MicroMap"
go

trace="MicroVariable"
ours=("CollabsVariable")
others=("AutomergeVariable" "YjsVariable")
go

trace="MicroTextLtr"
ours=("CollabsText")
others=("AutomergeText" "YjsText")
go

trace="MicroTextRandom"
go

trace="TodoList"
ours=("CollabsDeletingTodoList")
others=("AutomergeTodoList" "YjsTodoList")
go

ours=("CollabsText")
others=("AutomergeText" "YjsText")
trace="RealText"
go
