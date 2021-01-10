<?php

include "playlists.php";
include "tracks.php";

$filename = "./rekordbox.xml";
$output = "../resources/js/data/tracklist.json";

$fileContents = file_get_contents($filename) or die("Failed to open file: ".$filename);
$xml = simplexml_load_string($fileContents) or die("Error: Cannot create object");

$trackList = [];
$trackList["export_date"]   = date("Y-m-d H:i:s");
$trackList["playlists"]     = processPlaylists($xml);
$trackList["tracks"]        = processTracks($xml);

$trackList = json_encode($trackList);

if (file_exists($output)) {
    // Delete Existing Track List
    unlink($output);
}

file_put_contents($output, $trackList);

die();