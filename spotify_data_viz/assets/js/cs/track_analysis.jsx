import React from 'react';
import {connect} from 'react-redux'
import Radar from 'react-d3-radar';

export function TrackAnalysis(props) {
  return (<Radar
  width={500}
  height={500}
  padding={70}
  domainMax={10}
  highlighted={null}
  onHover={(point) => {
    if (point) {
      console.log('hovered over a data point');
    } else {
      console.log('not over anything');
    }
  }}
  data={{
    variables: [
      {key: 'danceability', label: 'Danceability'},
      {key: 'energy', label: 'Energy'},
      {key: 'tempo', label: 'Tempo'},
      {key: 'loudness', label: 'Loudness'},
      {key: 'speechiness', label: 'Speechiness'},
    ],
    sets: [
      {
        key: 'song1',
        label: 'Welcome to the Jungle',
        values: {
          danceability: 2,
          energy: 8,
          tempo: 6, 
          loudness: 8, 
          speechiness: 7,
        },
      },
      {
        key: 'song2',
        label: 'Levels',
        values: {
          danceability: 10,
          energy: 8,
          tempo: 8,
          loudness: 7,
          speechiness: 2,
        },
      },
    ],
  }}
/>)
}

function propsFromState(state) {
  return {track_analysis: state.track_analysis}
}

export default connect(propsFromState)(TrackAnalysis)
