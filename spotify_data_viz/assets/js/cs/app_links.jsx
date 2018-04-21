import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function AppLinks(props) {
  var albumArray = []
  var albumList = props.album_list
  var albumListLength = Math.min(4, Math.max(0, props.album_list.length))

  for (var i = 0; i < albumListLength; i++) {
    albumArray[i] = <div className="card">
      <div className="card-body">
        <p>
          <b>{albumList[i].album_name}</b>
        </p>
        {albumList[i].artist_name}
      </div>
    </div>
  }

  return (<div>
    <div className="card" style={{
        width: "18rem",
        float: "left"
      }}>
      <img className="card-img-top" src="/images/album-mood.png" alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Album Mood</h5>
        <p className="card-text">Search for an album and see a line plot of the change in tempo and valence with each track</p>
        <Link to={"/album_mood"} className="btn btn-primary">GO!</Link>
      </div>
    </div>
    <div className="card" style={{
        width: "18rem",
        float: "left"
      }}>
      <img className="card-img-top" src="/images/track-analysis.png" alt="Card image cap"/>
      <div className="card-body">
        <h5 className="card-title">Track Analysis</h5>
        <p className="card-text">Plot audio features of your most recently played songs on a radar spider chart</p>
        <Link to={"/track_analysis"} className="btn btn-primary">GO!</Link>
      </div>
    </div>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Top Album Searches</h5>
      </div>
    </div>
    {albumArray}
  </div>)
}

function propsFromState(state) {
  return {album_list: state.album_list}
}

export default connect(propsFromState)(AppLinks)
