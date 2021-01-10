import React from 'react';
import * as ReactGA from "react-ga";

export default class Tracks extends React.Component {
    constructor(props) {
        super(props);

        this.renderTile     = this.renderTile.bind(this);
        this.handleClick    = this.handleClick.bind(this);
    }

    handleClick(track) {
        const { selectedPlaylist } = this.props;

        var success   = true,
            range     = document.createRange(),
            selection;

        const trackText = track.name+" - "+track.artist+" - ["+selectedPlaylist+"]";
        ReactGA.pageview("/track/"+track.artist+"/"+track.name, null, "Track request: "+trackText)

        // For IE.
        if (window.clipboardData) {
            window.clipboardData.setData("Text", trackText);
        } else {
            // Create a temporary element off screen.
            var tmpElem = $('<div>');
            tmpElem.css({
                position: "absolute",
                left:     "-1000px",
                top:      "-1000px",
            });

            // Add the input value to the temp element.
            tmpElem.text(trackText);
            $("body").append(tmpElem);

            // Select temp element.
            range.selectNodeContents(tmpElem.get(0));
            selection = window.getSelection ();
            selection.removeAllRanges ();
            selection.addRange (range);

            try {
                success = document.execCommand ("copy", false, null);
            } catch (e) {
                copyToClipboardFF(trackText);
            }

            if (success) {
                alert ("Track copied, paste in chat");

                // Remove temp element.
                tmpElem.remove();
            }
        }
    }


    renderTile(index, track) {
        const id = "track-"+track.id;

        return (
            <div
                key={track.id}
                onClick={() => this.handleClick(track)}
                className={"w-100 mb-2 p-3 border border-dark-blue cursor-pointer tile track"}
            >
                <div className="row m-0 p-0">
                    <div className="col-12 col-md-6 m-0 p-0 pr-md-2">
                        <div>{track.name}</div>
                    </div>
                    <div className="col-12 col-md-6 m-0 p-0 pl-md-2">
                        <div>{track.artist}</div>
                    </div>
                </div>
                <div className={"no-select"}><small>Added - {track.date_added}</small></div>
            </div>
        );
    }

    render() {
        const { tracks } = this.props;

        return (
            <div className={"d-flex flex-column p-3 track-container"}>
                <div className={"px-3 mb-3 text-dark-blue text-center no-select"}>
                    <small>Click a track to copy the details and paste in chat to make a request.</small>
                    <br />
                    <small>If I like it, I may play it</small>
                </div>
                {tracks && tracks.length > 0 && tracks.map((element, index) => {
                    return this.renderTile(index, element);
                })}
            </div>
        );
    }
}