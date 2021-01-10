import React from 'react';

export default class Playlists extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
        }

        this.renderTile         = this.renderTile.bind(this);
        this.renderMobileList   = this.renderMobileList.bind(this);
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
                onClick={() => {
                    this.setState({menuOpen: false})
                    onChange(playlist.name)
                }}
                className={classes}
            >
                <div className={"no-select text-center text-lg-left"}>{playlist.name}</div>
            </div>
        );
    }

    renderList() {
        const { playlists } = this.props;

        return (
            <div className={"d-none d-lg-block"}>
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

    renderMobileList() {
        const { menuOpen } = this.state;
        const { selectedPlaylist, playlists } = this.props;

        return (
            <div className={"d-block d-lg-none pt-3 px-3"}>
                <div onClick={() => this.setState({menuOpen: !menuOpen})}
                     className={'w-100 p-2 border border-red-pink bg-red-pink text-white text-center cursor-pointer'}>
                    {selectedPlaylist}
                </div>
                <div className={menuOpen ? "playlist-menu p-3 open" : "playlist-menu p-3"}>
                    {playlists && playlists.map((element, index) => {
                        return this.renderTile(index, element);
                    })}
                </div>
            </div>
        );
    }

    render() {


        return (
            <div className={"h-100 d-flex flex-column playlist-container"}>
                {this.renderList()}
                {this.renderMobileList()}
            </div>
        );
    }
}