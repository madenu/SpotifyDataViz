import React from 'react';
import {connect} from 'react-redux'
import store from "./store";

function TrackAnalysis(props) {
    let token = store.getState().user_token;

    props.channel.join();
    props.channel.push("recent_tracks", {token: token})

    return (<div>
    </div>);
}

function props_to_state(state) {
    return {track_analysis: state.track_analysis}
}

export default connect(props_to_state)(TrackAnalysis);
