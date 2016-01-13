#!/bin/bash

if [ -e ./.env ] ; then
    export $(cat .env)
fi

git pull
bower install
npm install
MINIFY=true gulp compile
SCRIPT=`forever list | grep "claudialoutfi" | awk '{ print $3 }'`
if [ -n "$SCRIPT" ]
then
    forever restart $SCRIPT
fi
