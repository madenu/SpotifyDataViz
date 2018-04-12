import React from 'react';
import {connect} from 'react-redux'
import Plot from 'react-plotly.js'

// TODO make dummy data and plot with D3.js
export default function AlbumMood(props) {
  return (<Plot
    data={[
      {
        x: [1, 2, 3],
        y: [2, 6, 3],
        type: 'scatter',
        mode: 'lines+points',
        marker: {color: 'red'},
      },
      {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
    ]}
    layout={ {title: 'A Fancy Plot'} }
    />)
}
