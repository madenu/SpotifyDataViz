import React from 'react';
import {connect} from 'react-redux'

export function TrackAnalysis(props) {

    var token = props.token

    function getTracks() {
        props.channel.join()
        props.channel.push("track_analysis", {token: token})
    }

  return (<div>
      <div id="side-0" className="side col">
          <button id={"ok"} className={"btn btn-primary"} onClick={() => getTracks()}>Get Tracks</button>
      </div>
      <h1>TRACK ANALYSIS</h1></div>)
}

function propsFromState(state) {
  return {track_analysis: state.track_analysis}
}

export default connect(propsFromState)(TrackAnalysis)
