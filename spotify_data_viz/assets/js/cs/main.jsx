import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

export default function main_init(root) {
    ReactDOM.render(<Main />, root);
}


class Main extends React.Component {
    constructor(props) {
        super(props);
        const params = this.getHashParams();
        this.state = {
            loggedIn: params.access_token ? true : false,
            nowPlaying: {
                name: "Not Checked",
                image: ""
            }
        };
        if (params.access_token) {
            spotifyWebApi.setAccessToken(params.access_token)
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    }

    getNowPlaying() {
        spotifyWebApi.getMyCurrentPlaybackState()
            .then((response)=> {
                this.setState({
                    nowPlaying:{
                        name: response.item.name,
                        image: response.item.album.images[0].url
                    }
                })
            })
    }

    render() {
        return(
            <div>
                <div id="login">
                    <h1>First, log in to spotify</h1>
                    <a href="/login">Log in</a>
                </div>
                <div id="loggedin">
                    <div>
                    Now Playing: {this.state.nowPlaying.name }
                    </div>
                    <div>
                        <img src={this.state.nowPlaying.image } style={{width:100}} />
                    </div>
                    <button onClick={() => this.getNowPlaying()}>
                        Check Now Playing
                    </button>
                </div>
            </div>


        );
    }
}