import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


import Nav from './nav'
import TrackAnalysis from './track_analysis'
import AlbumMood from './album_mood'

export default function main_init(root, store, channel) {
  var token = {
    spotify_access_token: window.access_token,
    spotify_refresh_token: window.refresh_token
  }

    channel.join().receive("ok", resp => {
        console.log("Joined successfully", resp)
    }).receive("error", resp => {
        console.log("Unable to join", resp)
    })
  ReactDOM.render(<Provider store={store}>
    <Main channel={channel} token={token} state={store.getState()}/>
  </Provider>, root)
}

function Site(props) {
  function AppLinks() {

    var albumList = props.album_list
    var albumListLength = albumList.length

      var albumArray = []

      if (albumListLength > 5) {
      albumListLength = 10
      }

      for (var i = 0; i < albumListLength; i++) {
          albumArray[i] =
              <div className="card">
                <div className="card-body">
                    <p><b>{albumList[i].album_name}</b></p>
                    {albumList[i].artist_name}
                </div>
              </div>
      }

    return (<div>
      <div className="card" style={{
          width: "18rem", float: "left"
        }}>
        <img className="card-img-top" src="http://via.placeholder.com/100x100" alt="Card image cap"/>
        <div className="card-body">
          <h5 className="card-title">Album Mood</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <Link to={"/album_mood"} className="btn btn-primary">GO!</Link>
        </div>
      </div>
      <div className="card" style={{
          width: "18rem", float: "left"
        }}>
        <img className="card-img-top" src="http://via.placeholder.com/100x100" alt="Card image cap"/>
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
        {albumArray[0]}
        {albumArray[1]}
        {albumArray[2]}
        {albumArray[3]}
        {albumArray[4]}
        {albumArray[5]}
    </div>)
  }

  return (<div>
    <Nav token={props.token}/>
    <Route path='/' exact={true} render={AppLinks}/>
    <Route path='/album_mood' exact={true} render={() => <AlbumMood channel={props.channel} token={props.token}/>}/>
    <Route path='/track_analysis' exact={true} render={() => <TrackAnalysis channel={props.channel} token={props.token}/>}/>
  </div>)
}

let Main = connect((state) => state)((props) => {

    let user = window.user_id

    console.log("user_list")
    console.log(props.user_list)



  function LandingPage() {
    let page = null

    if (user != 0) {
      page = <Site channel={props.channel} token={props.token} album_list={props.album_list}/>
    } else {
      page = <div id="login">
        <a href="/authorize" className='btn btn-success'>Log In with Spotify</a>
      </div>
    }

    return page
  }

  return (<Router><LandingPage/></Router>)
})
