import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Nav from './nav'
import TrackAnalysis from './track_analysis'
import AlbumMood from './album_mood'

function Site(props) {
  function AppLinks() {
    var albumArray = []
    var albumList = props.album_list
    var albumListLength = Math.min(4, Math.max(0, props.album_list.length))

    console.log(albumList)

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
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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

  return (<div>
    <Nav token={props.token}/>
    <Route path='/' exact={true} render={AppLinks}/>
    <Route path='/album_mood' exact={true} render={() => <AlbumMood channel={props.channel} token={props.token}/>}/>
    <Route path='/track_analysis' exact={true} render={() => <TrackAnalysis channel={props.channel} token={props.token}/>}/>
  </div>)
}

function propsFromState(state) {
  return state
}

export default connect(propsFromState)(Site)
