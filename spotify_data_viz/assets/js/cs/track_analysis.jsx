import React from 'react';
import {connect} from 'react-redux';
import {Form} from 'reactstrap';
import RadarChart from "./radar_spider_chart";

function TrackAnalysis(props) {
    let token = props.token;

    props.channel.join();
    let recents = props.channel.push("recent_tracks", {token: token})

    return (<div>
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
