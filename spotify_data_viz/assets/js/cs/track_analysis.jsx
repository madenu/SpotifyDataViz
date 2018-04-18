import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'reactstrap';
import RadarChart from "./radar_spider_chart";
export function TrackAnalysis(props) {
    var token = props.token
    let recents = props.track_analysis.recent_tracks;

    let select_recents = [];
    function populateSelect() {
        select_recents = _.map(recents, (t, ii) => {
            return <option key={ii}>{recents[ii].name}</option>;
        });
    }

    function getTracks() {
        console.log("getting tracks...")
        props.channel.push("track_analysis", {token: token})
            .receive("ok", (data) => {
                props.dispatch({type: "UPDATE_TRACK_ANALYSIS", data: data})})
    }

    populateSelect();

    return (<div>
        <h1>Audio Analysis of Recent Tracks</h1>
        <div id="side-0" className="side col">
            <button id={"ok"} className={"btn btn-primary"} onClick={() => getTracks()}>Populate</button>
        </div>
        <div className="col-3">
            <Form>
                <select className="form-control" size="10" >
                    {select_recents}
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
