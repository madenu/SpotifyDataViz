import React from 'react';
import {connect} from 'react-redux'

function RadarChart(props) {

}

function props_to_state(state) {
    return {track_analysis: state.track_analysis}
}

export default connect(props_to_state)(RadarChart);
