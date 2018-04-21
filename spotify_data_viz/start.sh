#!/bin/bash

export PORT=5104

cd ~/www/spotify
./bin/spotify_data_viz stop || true
./bin/spotify_data_viz start

