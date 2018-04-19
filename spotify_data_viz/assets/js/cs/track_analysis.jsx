import React from 'react'
import {connect} from 'react-redux'
import {Form} from 'reactstrap';
import Radar from 'react-d3-radar';

export function TrackAnalysis(props) {
    var token = props.token
    let recents = props.track_analysis.recent_tracks;

    let select_recents = [];
    function populateSelect() {
        select_recents = _.map(recents, (t, ii) => {
            return <option key={ii}>{recents[ii].name}</option>;
        });
    }

    function getSong(e) {
        let song = e.target.value;
        populateRadar(song);
    }

    function populateRadar(song) {
        let data = _.find(recents, function(t){
            return t.name == song;
        })
        console.log("data", data);
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
        <div className="col-3" id="select-recents" >
            <Form>
                <select id="recents" className="form-control" size="20" onChange={getSong}>
                    {select_recents}
                </select>
            </Form>
        </div>
        <div className="col-7 offset-2" id="radar" >
            <Radar
                width={500}
                height={500}
                padding={70}
                domainMax={1}
                highlighted={null}
                data={{
                    variables: [
                        {key: 'danceability', label: 'Danceability'},
                        {key: 'energy', label: 'Energy'},
                        {key: 'valence', label: 'Valence'},
                        {key: 'instrumentalness', label: 'Instrumentalness'},
                        {key: 'speechiness', label: 'Speechiness'},
                    ],
                    sets: [
                        {
                            key: 'song1',
                            label: 'Welcome to the Jungle',
                            values: {
                                danceability: .35,
                                energy: .8,
                                valence: .6,
                                instrumentalness: .8,
                                speechiness: .7,
                            },
                        },
                    ],
                }}
            />
        </div>
    </div>);
}

function propsFromState(state) {
    return {track_analysis: state.track_analysis}
}

export default connect(propsFromState)(TrackAnalysis)
