#!/bin/bash

if [ -e ./.env ] ; then
    export $(cat .env)
fi

function new_tab() {
    TAB_NAME=$1
    COMMAND=$2
    osascript \
        -e "tell application \"Terminal\"" \
        -e "tell application \"System Events\" to keystroke \"t\" using {command down}" \
        -e "do script \"$COMMAND\" in front window" \
        -e "end tell" > /dev/null
}

DIR=`pwd`

# Run gulp watch
new_tab "gulp watch" "cd '$DIR'; gulp watch"

# Run gulp
new_tab "gulp" "cd '$DIR'; gulp"

# Open a terminal
new_tab "terminal" "cd '$DIR'"
