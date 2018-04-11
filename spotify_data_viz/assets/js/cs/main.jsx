

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function main_init(root) {
    ReactDOM.render(<Main />, root);
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    render() {
        return(
            <div>
                <div id="login">
                    <h1>First, log in to spotify</h1>
                    <a href="/authorize">Log in</a>
                </div>
            </div>
        );
    }
}

