import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {Button, NavItem} from 'reactstrap'

let Login = connect(({login}) => {return {login};})((props) => {
    return (<div className="navbar-text">
        <a href='/authorize' className='btn btn-success'>Log In with Spotify</a>
    </div>);
});

let Session = connect(({token}) => {return {token};})((props) => {
    console.lot("Session Token", props.token);
    return <div className="navbar-text">
        <span>User goes here</span>
        <Form inline>
            <Button color="danger">Log Out</Button>
        </Form>
    </div>;
});

function Nav(props) {
    let session_info;

    if (props.token) {
        session_info = <Session token={props.token} />;
    }
    else {
        session_info = <Login />;
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
            { session_info }
        </span>
    </nav>);
}

function state_to_props(state) {
    return {
        token: state.token,
    };
}

export default connect(state_to_props)(Nav);
