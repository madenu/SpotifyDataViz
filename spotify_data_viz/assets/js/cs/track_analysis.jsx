import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'reactstrap';
import RadarChart from "./radar_spider_chart";

function TrackAnalysis(props) {
    let token = props.token;
    let recents = null;
    function getTracks() {
        props.channel.join()
        recents = props.channel.push("track_analysis", {token: token})
    }

    return (<div>
        <div id="side-0" className="side col">
            <button id={"ok"} className={"btn btn-primary"} onClick={() => getTracks()}>Get Tracks</button>
        </div>
        <h1>TRACK ANALYSIS</h1>
        <div className="col-3">
            <Form>
                <select className="form-control">
                    {recents}
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
