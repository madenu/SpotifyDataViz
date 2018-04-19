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
    console.log(e.target.value)
    let song = e.target.value;
    populateRadar(song);
  }

  function populateRadar(song) {
    let data = _.find(recents, function(t) {
      return t.name == song;
    })
    data = {
      title: data.name + " by " + data.artists,
      danceability: data.features.dance,
      energy: data.features.energy,
      valence: data.features.valence,
      instrumentalness: data.features.instrumentalness,
      speechiness: data.features.speechiness
    };
    props.dispatch({type: "UPDATE_RADAR", data: data});
  }

  function getTracks() {
    console.log("getting tracks...")
    props.channel.push("track_analysis", {token: token}).receive("ok", (data) => {
      props.dispatch({type: "UPDATE_TRACK_ANALYSIS", data: data})
    })
  }

  populateSelect()

  return (<div id="Site">
    <h1>Recent Tracks</h1>
    <div id="side-0" className="side col">
      <button id={"ok"} className={"btn btn-primary"} onClick={() => getTracks()}>Populate</button>
    </div>
    <div className="col-3" id="select-recents">
      <Form>
        <select id="recents" className="form-control" size="20" onChange={getSong}>
          {select_recents}
        </select>
      </Form>
    </div>
    <div className="col-6" id="radar-div">
      <h3>{props.radar_chart.title}</h3>
      <Radar width={500} height={500} padding={70} domainMax={1} highlighted={null} data={{
          variables: [
            {
              key: 'danceability',
              label: 'Danceability'
            }, {
              key: 'energy',
              label: 'Energy'
            }, {
              key: 'valence',
              label: 'Valence'
            }, {
              key: 'instrumentalness',
              label: 'Instrumentalness'
            }, {
              key: 'speechiness',
              label: 'Speechiness'
            }
          ],
          sets: [
            {
              key: 'song1',
              label: 'Welcome to the Jungle',
              values: {
                danceability: props.radar_chart.danceability,
                energy: props.radar_chart.energy,
                valence: props.radar_chart.valence,
                instrumentalness: props.radar_chart.instrumentalness,
                speechiness: props.radar_chart.speechiness
              }
            }
          ]
        }}/>
    </div>
    <div id="radar-description" className="col-3">
      <p>
        <strong>Danceability:
        </strong>describes how suitable a track is for dancing based on tempo, rhythm stability, beat strength, and overall regularity (0 is least danceable, 1 is most)</p>
      <p>
        <strong>Energy:
        </strong>represents the perceptual measure of intensity and activity based on dynamic range, perceived loudness, timbre, onset rate, and general entropy (1 is fast, loud, and noisy)</p>
      <p>
        <strong>Valence:
        </strong>describes the musical positiveness conveyed (0 is sad, depressed, or angry while 1 is happy, cheerful, or euphoric)</p>
      <p>
        <strong>Instrumentalness:
        </strong>predicts whether a track contains no vocals ("ooh" and "aah" sounds are treated as instrumental). The closer the Instrumentalness is to 1, the greater likelihood the track contains no vocal content</p>
      <p>
        <strong>Speechiness:
        </strong>detects the presence of spoken words in a track (values below 0.33 most likely represent music, values close to 1 represent spoken-word)</p>
    </div>
  </div>);
}

function propsFromState(state) {
  return {track_analysis: state.track_analysis, radar_chart: state.radar_chart}
}

export default connect(propsFromState)(TrackAnalysis)
