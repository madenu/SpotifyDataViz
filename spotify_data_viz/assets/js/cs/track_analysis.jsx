import React from 'react';
import {connect} from 'react-redux'

export function TrackAnalysis(props) {
  return (<h1>TRACK ANALYSIS</h1>)
}

function propsFromState(state) {
  return {track_analysis: state.track_analysis}
}

export default connect(propsFromState)(TrackAnalysis)
