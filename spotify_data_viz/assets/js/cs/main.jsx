import React from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import store from '../store'
import Nav from './nav'
import TrackAnalysis from './track_analysis'
import AlbumMood from './album_mood'
import Authorize from './authorize'

export default function main_init(root, store) {
    ReactDOM.render(
        <Provider store={store}>
            <Main state={store.getState()} />
        </Provider>,
        root
    );
}


let Main = connect((state) => state)((props) => {
    function AppLinks() {
        // TODO fix up the cards
        return (<div>
            <div className="card" style={{
                width: "18rem"
            }}>
                <img className="card-img-top" src="http://via.placeholder.com/100x100" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Album Mood</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to={"/album_mood"} className="btn btn-primary">GO!</Link>
                </div>
            </div>
            <div className="card" style={{
                width: "18rem"
            }}>
                <img className="card-img-top" src="http://via.placeholder.com/100x100" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">Track Analysis</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to={"/track_analysis"} className="btn btn-primary">GO!</Link>
                </div>
            </div>
        </div>);
    }

    return (<Router>
        <div>
            <Nav/>
            <Route path='/' exact={true} render={AppLinks}/>
            <Route path='/album_mood' exact={true} render={() => <AlbumMood/>}/>
            <Route path='/track_analysis' exact={true} render={() => <TrackAnalysis/>}/>
            <Route path='/authorize' exact={true} render={() => <Authorize/>}/>
        </div>
    </Router>);
}
