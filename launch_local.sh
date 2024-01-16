#!/bin/bash

#/opt/homebrew/bin/npm --prefix /Users/aiden/Projects/Levitree/ControlApp run dev &
echo "Web Server Initialized..."

node server.js -p 3001 -d /Users/aiden/Projects/Levitree/storage
echo "Local File System - Server Link Initialized..."