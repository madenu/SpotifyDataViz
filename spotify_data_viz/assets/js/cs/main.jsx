import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//import Nav from './nav';

export default function main_init(root, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Main state={store.getState()} />
        </Provider>,
        root
    );
}


let Main = connect((state) => state)((props) => {
    return(
        <Router>
            <div>
                <div id="login">
                    <h1>First, log in to spotify</h1>
                    <a href="/authorize" className="btn btn-success">Log in</a>
                </div>
            </div>
        </Router>
    );
});

