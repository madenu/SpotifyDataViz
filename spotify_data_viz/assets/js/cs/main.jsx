import React from 'react'
import ReactDOM from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Nav from './nav'
import TrackAnalysis from './track_analysis'
import AlbumMood from './album_mood'
import Site from './site'

export default function main_init(root, store, channel) {
  var token = {
    spotify_access_token: window.access_token,
    spotify_refresh_token: window.refresh_token,
    user_id: window.user_id
  }

  channel.join().receive("ok", resp => {
    console.log("Joined successfully", resp)
  }).receive("error", resp => {
    console.log("Unable to join", resp)
  })
  ReactDOM.render(<Provider store={store}>
    <Main channel={channel} token={token}/>
  </Provider>, root)
}


function Main(props) {
  function LandingPage() {
    let page = null
    if (props.token.user_id != 0) {
      page = <Site channel={props.channel} token={props.token}/>
    } else {
      page = <div id="login">
        <a href="/authorize" className='btn btn-success'>Log In with Spotify</a>
      </div>
    }
    return page
  }
  return (<Router><LandingPage/></Router>)
}
