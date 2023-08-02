#!/bin/bash

/home/levitree/.config/nvm/versions/node/v20.5.0/bin/npm --prefix /home/levitree/Desktop/Levitree_Control_App_Offline run dev &
echo "Web Server Initialized..."

node /home/levitree/Desktop/Levitree_Control_App_Offline/server.js &
echo "Local File System - Server Link Initialized..."