<?php

function extractAttribute($attributes, $key)
{
    return property_exists($attributes, $key) && !empty($attributes[$key]) ? (string) $attributes[$key] : "";
}

/**
 * processTracks()
 *
 * @param $xml
 * @return array
 */
function processTracks($xml)
{
    $tracks = [];

    foreach ($xml->COLLECTION->TRACK as $track) {
        /** @var array $attributes */
        $attributes = $track->attributes();

        $id         = extractAttribute($attributes, "TrackID");
        $artist     = extractAttribute($attributes, "Artist");
        $name       = extractAttribute($attributes, "Name");
        $album      = extractAttribute($attributes, "Album");
        $year       = extractAttribute($attributes, "Year");
        $dateAdded  = extractAttribute($attributes, "DateAdded");

        $tracks[$id] = [
            "id"            => $id,
            "artist"        => $artist,
            "name"          => $name,
            "album"         => $album,
            "year"          => $year,
            "date_added"    => $dateAdded,
        ];
    }

    return $tracks;
}