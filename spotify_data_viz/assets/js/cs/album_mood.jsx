import React from 'react'
import Plot from 'react-plotly.js'
import {connect} from 'react-redux'

export function AlbumMood(props) {
  var token = props.token

  function getAlbum(album) {
    console.log("getAlbum")
    props.channel.push("album_mood", {
      albumID: album,
      token: token
    }).receive("ok", (data) => {
      console.log("update_album_mood", data)
      props.dispatch({type: "UPDATE_ALBUM_MOOD", data: data})})
  }

  return (<div>
    <Plot data={[
        {
          x: [1, 2, 3],
          y: [2, 6, 3],
          type: 'scatter',
          mode: 'lines+points',
          marker: {
            color: 'red'
          }
        }, {
          type: 'bar',
          x: [1, 2, 3],
          y: [2, 5, 3]
        }
      ]} layout={{
        title: 'A Fancy Plot'
      }}/>
    <div id="side-0" className="side col">
      <button id={"ok"} className={"btn btn-primary"} onClick={() => getAlbum("1WBZyULtlANBKed7Zf9cDP")}>Get Album</button>
    </div>
  </div>)
}

function propsFromState(state) {
  return {album_mood: state.album_mood}
}

export default connect(propsFromState)(AlbumMood)
