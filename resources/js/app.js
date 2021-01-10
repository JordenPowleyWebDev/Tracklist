import React from 'react';
import ReactGA from 'react-ga';
import ReactDOM from "react-dom";
import TrackList from "./data/tracklist.json"
import { format } from 'date-fns'
import Page from "./components/Page";

window.$ = window.jQuery = require('jquery');
window._ = require('lodash');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded:         false,
            last_updated:   null,
            playlists:      null,
        };
    }

    componentDidMount() {
        let tracks      = TrackList.tracks;
        let lastUpdated = format(Date.parse(TrackList.export_date), 'dd/M/yyyy');
        let playlists   = TrackList.playlists;

        for (let i = 0; i < playlists.length; i++) {
            if (playlists[i].name === "All Tracks") {
                playlists[i].tracks = Object.values(tracks);
            } else {
                playlists[i].tracks = playlists[i].tracks.map((element, index) => {
                    return tracks[element];
                });
            }
        }

        this.setState({
            loaded:         true,
            last_updated:   lastUpdated,
            playlists:      playlists,
        });

        ReactGA.initialize('UA-128341357-3');
    }

    renderLoading() {
        return (
            <div className="loading h1 no-select">Loading...</div>
        );
    }

    render() {
        const { loaded, last_updated, playlists } = this.state;

        if (!loaded) {
            return this.renderLoading();
        }

        return (
            <Page
                playlists={playlists}
                last_updated={last_updated}
            />
        );
    }
}

const app = document.getElementById('app');
if (app) {
    ReactDOM.render(<App />, app);
}
