import React from 'react';
import Filters from "./Filters";
import Playlists from "./Playlists";
import Tracks from "./Tracks";
import * as ReactGA from "react-ga";

export default class Page extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: "",
            selectedPlaylist: "All Tracks",
        };

        this.getTracks      = this.getTracks.bind(this);
        this.filterTracks   = this.filterTracks.bind(this);
    }

    getTracks() {
        const { searchValue, selectedPlaylist } = this.state;
        const { playlists } = this.props;

        for (let i = 0; i < playlists.length; i++) {
            if (playlists[i].name === selectedPlaylist) {
                return playlists[i].tracks;
            }
        }
    }

    filterTracks(tracks) {
        const { searchValue } = this.state;

        return tracks.filter(function (track) {
            const name = track.name.toLowerCase();
            const artist = track.artist.toLowerCase();
            if (name.includes(searchValue.toLowerCase())) {
                return track;
            } else if (artist.includes(searchValue.toLowerCase())) {
                return track;
            }
        });
    }

    render() {
        const { searchValue, selectedPlaylist } = this.state;
        const { playlists } = this.props;

        let tracks = this.getTracks();
        tracks = this.filterTracks(tracks);


        return (
            <div className={"container-fluid m-0 p-0 main-container"}>
                <div className="left-container border-right border-white">
                    <Playlists
                        playlists={playlists}
                        selectedPlaylist={selectedPlaylist}
                        onChange={(name) => {
                            ReactGA.pageview("/playlist/"+name, null, "Playlist request: "+name)
                            this.setState({selectedPlaylist: name})
                        }}
                    />
                </div>
                <div className="right-container">
                    <Filters
                        searchValue={searchValue}
                        searchValueChange={(value) => this.setState({ searchValue: value })}
                    />
                    <Tracks
                        tracks={tracks}
                        selectedPlaylist={selectedPlaylist}
                    />
                </div>
            </div>
        );
    }
}