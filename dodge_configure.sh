#!/bin/bash

node -v &> /dev/null
if [ $? -ne 0 ]; then

		echo "Nodejs not installed, abort"

else
		npm install

		cd public/javascripts
		if [ ! -f socket.io.js ]; then
				echo "Generating symbolic links"
				ln -s ../../node_modules/socket.io-client/dist/socket.io.min.js socket.io.js
		fi
		cd ../..

		./dodge_make.sh

		if [ ! -p img_queue ]
		then
				echo "Create the named pipes"
				mkfifo img_queue
		fi
fi
