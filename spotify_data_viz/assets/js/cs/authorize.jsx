import React from 'react';
import {connect} from 'react-redux'

// TODO fix route and behavior for authorize
export default function Authorize(props) {
  return (<div id="login">
    <h1>First, log in to spotify</h1>
    <a href="/authorize">Log in</a>
  </div>)
}
