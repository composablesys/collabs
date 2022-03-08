#/usr/bin/bash

if [ -z "$4" ]
then
  echo "Usage: ./run_all.sh <out folder> <version> <warmup trials> <recorded trials> [--oursOnly | --othersOnly]"
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
    for measurement in ${measurements[*]}
    do
      npm start -- $in1 $in2 $in3 $in4 $trace $implementation $measurement
    done
    for concArg in "${concArgs[@]}"
    do
      for concurrentReceiveMetric in "Time" "Memory"
      do
        for concurrentReceiveType in "coarse" "fine"
        do
          npm start -- $in1 $in2 $in3 $in4 $trace $implementation "concurrentReceive$concurrentReceiveMetric $concurrentReceiveType $concArg"
        done
      done
    done
  done
}

measurements=("sendTime" "sendMemory" "sendNetwork" "receiveTime" "receiveMemory" "save")
# Numeric args ("<numUsers> <concOpStart> <concOps>") to concurrentReceive measurements.
concArgs=("10 0 1000")

trace="MicroMapRolling"
ours=("CollabsMap")
others=("AutomergeMap" "YjsMap")
go

trace="MicroMap"
go

trace="MicroRegister"
ours=("CollabsRegister")
others=("AutomergeRegister" "YjsRegister")
go

trace="MicroTextLtr"
ours=("CollabsText")
others=("AutomergeText" "YjsText")
go

trace="MicroTextRandom"
go

trace="RealText"
concArgs=("10 10000 10000")
ours=("CollabsDeletingText" "CollabsRichText" "CollabsText")
others=("AutomergeText" "YjsText")
go

trace="TodoList"
concArgs=("10 1000 1000")
# TODO: JSON, JSONOpt
#ours=("CollabsDeletingTodoList" "CollabsJSONOptTodoList" "CollabsJSONTodoList")
ours=("CollabsDeletingTodoList" "CollabsJSONTextTodoList")
others=("AutomergeTodoList" "YjsTodoList")
go
