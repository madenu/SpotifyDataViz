#!/bin/bash

export PORT=5110

cd ~/www/spotify_data_viz
./bin/spotify_data_viz stop || true
./bin/spotify_data_viz start

