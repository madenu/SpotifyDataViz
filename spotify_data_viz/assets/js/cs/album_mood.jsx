import React from 'react';
import {connect} from 'react-redux'
import Plot from 'react-plotly.js'
import store from "./store";

// TODO make dummy data and plot with D3.js
export function AlbumMood(props) {


    console.log("props is")
    console.log(props)

    var token = props.token

    function getAlbum(album) {
        props.channel.join()
        props.channel.push("album_mood", {albumID: album, token: token})
    }

  return (<div>

      <div id="side-0" className="side col">
          <button id={"ok"} className={"btn btn-primary"} onClick={() => getAlbum("1WBZyULtlANBKed7Zf9cDP")}>Get Album</button>
      </div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {title: 'A Fancy Plot'} }
        />

  </div>)
}

function propsFromState(state) {
  return {album_mood: state.album_mood}
}

export default connect(propsFromState)(AlbumMood)
