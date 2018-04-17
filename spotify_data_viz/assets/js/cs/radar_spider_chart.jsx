import React from 'react';
import {connect} from 'react-redux'
import store from "./store";
import {Form} from 'reactstrap';

function Chart(props) {

}

function TrackAnalysis(props) {
    let token = store.getState().user_token;

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
            <Chart />
        </div>
    </div>);
}

function props_to_state(state) {
    return {track_analysis: state.track_analysis}
}

export default connect(props_to_state)(TrackAnalysis);
