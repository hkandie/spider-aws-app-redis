#!/bin/bash
SERVICE='emrys-1.0.0.jar'
BASE_FOLDER='/d/developer/runner-02/'

PID=`ps -eaf | grep $SERVICE | grep -v grep | awk '{print $2}'`

if [[ "" !=  "$PID" ]]; then
        echo "Application $SERVICE running on PID $PID . Stoping the service.";
        sleep 1
        kill -9 $PID
        echo "Attemping to Start it";
        sleep 1
        cd $BASE_FOLDER
        sleep 3
        nohup java -Xms2048m -Xmx2G -jar $SERVICE &
        sleep 1
        PID=`ps -eaf | grep $SERVICE | grep -v grep | awk '{print $2}'`
else
        echo "Process not found. Attemping to Starting it";
        cd $BASE_FOLDER
        sleep 1
        nohup java -Xms2048m -Xmx2G -jar $SERVICE &
        sleep 1
        PID=`ps -eaf | grep $SERVICE | grep -v grep | awk '{print $2}'`
fi

if [[ "" !=  "$PID" ]]; then
  echo "Application $SERVICE started on $PID";
else
  echo "Application $SERVICE Failed To start.";
fi

echo "*******************************************************************";


