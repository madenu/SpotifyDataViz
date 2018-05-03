#!/bin/bash

export PORT=5110
export MIX_ENV=prod
export GIT_PATH=/home/spotify_data_viz/cs5610project2/spotify_data_viz

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "spotify_data_viz" ]; then
	echo "Error: must run as user 'spotify_data_viz'"
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
if [ -d ~/www/spotify_data_viz ]; then
	echo mv ~/www/spotify_data_viz ~/old/$NOW
	mv ~/www/spotify_data_viz ~/old/$NOW
fi

mkdir -p ~/www/spotify_data_viz
REL_TAR=~/src/spotify_data_viz/_build/prod/rel/spotify_data_viz/releases/0.0.1/spotify_data_viz.tar.gz
(cd ~/www/spotify_data_viz && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/spotify_data_viz/src/spotify_data_viz/start.sh
CRONTAB

#. start.sh
