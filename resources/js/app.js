import React from 'react';
import ReactDOM from "react-dom";
import TrackList from "./data/tracklist.json"
import { format } from 'date-fns'
import Page from "./components/Page";

window.$ = window.jQuery = require('jquery');

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded:         false,
            last_updated:   null,
            tracks:         null,
            playlists:      null,
        };
    }

    componentDidMount() {
        let tracks      = TrackList.tracks;
        let lastUpdated = format(Date.parse(TrackList.export_date), 'dd/M/yyyy');
        let playlists   = TrackList.playlists;

        for (let i = 0; i < playlists.length; i++) {
            playlists[i].tracks = playlists[i].tracks.map((element, index) => {
                return tracks[element];
            });
        }

        this.setState({
            loaded:         true,
            last_updated:   lastUpdated,
            tracks:         tracks,
            playlists:      playlists,
        });
    }

    renderLoading() {
        return (
            <div className="loading h1 no-select">Loading...</div>
        );
    }

    render() {
        const { loaded, last_updated, tracks, playlists } = this.state;

        if (!loaded) {
            return this.renderLoading();
        }

        return (
            <Page
                tracks={tracks}
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
