#!/bin/bash

export PORT=5104
export MIX_ENV=prod
export GIT_PATH=/home/spotify/cs5610project/spotify_data_viz

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "othello" ]; then
	echo "Error: must run as user 'othello'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/spotify ]; then
	echo mv ~/www/othello ~/old/$NOW
	mv ~/www/spotify ~/old/$NOW
fi

mkdir -p ~/www/spotify
REL_TAR=~/src/spotify/_build/prod/rel/spotify_data_viz/releases/0.0.1/spotify_data_viz.tar.gz
(cd ~/www/spotify && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/spotify/src/spotify/start.sh
CRONTAB

#. start.sh
