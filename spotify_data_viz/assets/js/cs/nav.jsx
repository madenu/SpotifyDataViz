import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {Button, NavItem} from 'reactstrap'

export default function Nav(props) {
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
      <NavItem>
        <NavLink to='/authorize' href='#' className='nav-link'>Log In</NavLink>
      </NavItem>
    </ul>
  </nav>)
}
