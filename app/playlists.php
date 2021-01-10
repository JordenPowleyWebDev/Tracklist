<?php

$playlists = [
    "Added This Week",
    "Added This Month",
    "Last 2 Months",
    "House",
    "House (Piano)",
    "House (Jackin')",
    "House (Unclassified)",
    "Dance",
    "Disco",
    "Disco House",
    "Jazzy House",
    "Deep House",
    "Deep House (Dark)",
    "Tropical House",
    "Tech House",
    "Tech House (Light)",
    "Tech House (Bass)",
    "Tech House (Dark)",
    "Techno",
    "Trance",
    "Breaks",
    "Trap House",
    "Dubstep",
    "Future House",
    "Drum And Bass",
    "Progressive House",
    "Big Room",
    "Lo-Fi",
    "80's Dance",
    "90's Dance",
    "90's Club",
    "00's Dance",
    "10's Dance",
    "Cheese",
    "Hip-Hop",
    "Grime",
    "Bassline",
    "Modern Pop",
    "Pop",
];

/**
 * processPlaylists()
 *
 * @param $xml
 * @return array
 */
function processPlaylists($xml)
{
    global $playlists;

    $processed = [];

    // Loop through thr root nodes
    foreach ($xml->PLAYLISTS->NODE as $rootNode) {
        // Loop through the sub nodes
        foreach ($rootNode->NODE as $subNode) {
            $nodeName = (string) $subNode->attributes()['Name'];

            if (in_array($nodeName, $playlists)) {
                $item = [
                    "name"      => $nodeName,
                    "tracks"    => []
                ];

                foreach ($subNode->TRACK as $track) {
                    array_push($item['tracks'], (string) $track->attributes()['Key']);
                }

                array_push($processed, $item);
            }
        }
    }

    return $processed;
}