import React from 'react';

export default class Tracks extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick    = this.handleClick.bind(this);
        this.renderTile     = this.renderTile.bind(this);
    }

    handleClick(track) {

    }

    renderTile(index, track) {
        return (
            <div
                key={track.id}
                onClick={() => this.handleClick(track)}
                className={"w-100 mb-2 p-3 border border-dark-blue cursor-pointer tile track"}
            >
                <div className="row m-0 p-0">
                    <div className="col-12 col-md-6 m-0 p-0 pr-md-2">
                        <div className={"no-select"}>{track.name}</div>
                    </div>
                    <div className="col-12 col-md-6 m-0 p-0 pl-md-2">
                        <div className={"no-select"}>{track.artist}</div>
                    </div>
                </div>
                <div className={"no-select"}><small>Added - {track.date_added}</small></div>
            </div>
        );
    }

    render() {
        const { tracks } = this.props;

        return (
            <div className={"h-100 d-flex flex-column p-3"}>
                {tracks && tracks.length > 0 && tracks.map((element, index) => {
                    return this.renderTile(index, element);
                })}
            </div>
        );
    }
}