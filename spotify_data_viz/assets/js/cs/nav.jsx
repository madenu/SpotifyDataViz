import React from 'react'
import {NavLink} from 'react-router-dom'
import {Form, Button, NavItem} from 'reactstrap'

export default function Nav(props) {

  let session_info
  if (props.token) {
    session_info = <div className="navbar-text">
      <Form inline>
        <Button href="/logout" color="danger">Log Out</Button>
      </Form>
    </div>

  } else {
    session_info = <div className="navbar-text">
      <p>
        <strong>ERROR</strong>
      </p>
    </div>
  }

  return (<nav className='navbar navbar-dark bg-dark navbar-expand'>
    <ul className='navbar-nav mr-auto'>
      <NavItem>
        <NavLink to='/' exact={true} activeClassName='active' className='nav-link'>Main</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to='/album_mood' exact={true} activeClassName='active' className='nav-link'>Album Mood</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to='/track_analysis' href='#' className='nav-link'>Track Analysis</NavLink>
      </NavItem>
    </ul>
    <span className="navbar-text">
      {session_info}
    </span>
  </nav>)
}
