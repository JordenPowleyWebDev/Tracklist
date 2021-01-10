import React from 'react';

export default class Playlists extends React.Component {
    constructor(props) {
        super(props);

        this.renderTile = this.renderTile.bind(this);
    }

    renderTile(index, playlist) {
        const { selectedPlaylist, playlists, onChange } = this.props;

        let classes = "w-100 p-2 border-top border-left border-right border-light-blue cursor-pointer tile";

        if (playlists.length === (index + 1)) {
            classes += " border-bottom";
        }

        if (selectedPlaylist === playlist.name) {
            classes += " selected";
        }

        return (
            <div
                key={index}
                onClick={() => onChange(playlist.name)}
                className={classes}
            >
                <div className={"no-select"}>{playlist.name}</div>
            </div>
        );
    }

    render() {
        const { playlists } = this.props;

        return (
            <div className={"h-100 d-flex flex-column playlist-container"}>
                <div className={"logo-container d-flex justify-content-center"}>
                    <div className={"h5 mb-0 text-white text-center no-select d-flex justify-content-center align-items-center"}>JordenWithAnE</div>
                </div>
                <div className={"px-3 pb-3 d-block position-relative"}>
                    {playlists && playlists.map((element, index) => {
                        return this.renderTile(index, element);
                    })}
                </div>
            </div>
        );
    }
}