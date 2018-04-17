import React from 'react';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {Form, Button, NavItem} from 'reactstrap'

let Login = connect(({login}) => {return {login};})((props) => {
    return (<div className="navbar-text">
        <p><strong>ERROR</strong></p>
    </div>);
});

let Session = connect((token) => token)((props) => {
    console.log("Session Props", props);
    return <div className="navbar-text">
        <Form inline>
            <span id="user">User goes here</span>
            <Button color="danger">Log Out</Button>
        </Form>
    </div>;
});

function Nav(props) {
    let session_info;

    console.log("Navbar props", props);
    if (props.token) {
        session_info = <Session />;
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
    console.log("state_to_props", state)
    return {
        token: state.user_token,
    };
}

export default connect(state_to_props)(Nav);
