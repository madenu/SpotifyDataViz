import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'reactstrap'
import RadarChart from "./radar_spider_chart"
export function TrackAnalysis(props) {
  var token = props.token

  function getTracks() {
    console.log("getTracks")
    props.channel.push("track_analysis", {token: token})
      .receive("ok", (data) => {
       console.log("update_track_analysis", data)
       props.dispatch({type: "UPDATE_TRACK_ANALYSIS", data: data})})
  }

    return (<div>
        <div id="side-0" className="side col">
            <button id={"ok"} className={"btn btn-primary"} onClick={() => getTracks()}>Get Tracks</button>
        </div>
        <h1>TRACK ANALYSIS</h1>
        <div className="col-3">
            <Form>
                <select className="form-control">
                    {props.track_analysis.recent_tracks}
                </select>
            </Form>
        </div>
        <div>
            <RadarChart />
        </div>
    </div>);
}

function propsFromState(state) {
    return {track_analysis: state.track_analysis}
}

export default connect(propsFromState)(TrackAnalysis)
