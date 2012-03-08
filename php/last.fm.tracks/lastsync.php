<?php

require_once('init.php');

date_default_timezone_set('GMT');

$data       = '';
$xml        = '';
$changed    = 0;
$newtracks  = 0;

$last_api = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&api_key='.$api.'&user='.$user.'&limit=100&page=1';

$fp = fopen($last_api,'rb');

    while(!feof($fp)) {
         $data .= fread($fp, 1024);
    }
    fclose($fp);

    $xml = new SimpleXMLElement($data);

    for($i=0,$j=sizeof($xml->recenttracks->track);$i<$j;$i++) {

         $artist = $xml->recenttracks->track[$i]->artist;
         $artistmbid = $xml->recenttracks->track[$i]->artist["mbid"];
         $mbid = $xml->recenttracks->track[$i]->mbid;
         $name = $xml->recenttracks->track[$i]->name;
         $streamable = $xml->recenttracks->track[$i]->streamable;
         $album = $xml->recenttracks->track[$i]->album;
         $albummbid = $xml->recenttracks->track[$i]->album["mbid"];
         $urltrack = $xml->recenttracks->track[$i]->url;
         list($urlartist) = explode("/_/", $xml->recenttracks->track[$i]->url);
         $urlartist = $urlartist;
         $imagesmall = $xml->recenttracks->track[$i]->image[0];
         $imagemedium = $xml->recenttracks->track[$i]->image[1];
         $imagelarge = $xml->recenttracks->track[$i]->image[2];
         $imageextralarge = $xml->recenttracks->track[$i]->image[3];
         $date = $xml->recenttracks->track[$i]->date[0];
         $dateuts = $xml->recenttracks->track[$i]->date["uts"];

         $SQL = sprintf( "INSERT IGNORE INTO `$table` "
                 ."(
                  `artist`, `artistmbid`, `mbid`,
                  `name`, `streamable`, `album`,
                  `albummbid`, `urltrack`, `urlartist`,
                  `imagesmall`, `imagemedium`, `imagelarge`,
                  `imageextralarge`, `datestring`, `dateuts`
                  )".
                   " VALUES ".
                   "(
                     '%s', '%s', '%s',
                     '%s', '%s', '%s',
                     '%s', '%s', '%s',
                     '%s', '%s', '%s',
                     '%s', '%s', '%s'
                    ); ",
                    mysql_real_escape_string($artist), mysql_real_escape_string($artistmbid), mysql_real_escape_string($mbid),
                    mysql_real_escape_string($name), mysql_real_escape_string($streamable), mysql_real_escape_string($album),
                    mysql_real_escape_string($albummbid), mysql_real_escape_string($urltrack), mysql_real_escape_string($urlartist),
                    mysql_real_escape_string($imagesmall), mysql_real_escape_string($imagemedium), mysql_real_escape_string($imagelarge),
                    mysql_real_escape_string($imageextralarge), mysql_real_escape_string($date), mysql_real_escape_string($dateuts)
          );           
                  
          do_query($SQL) or die();   
            
          if(mysql_affected_rows() == 1) {
             $changed = 1;
             $newtracks++; 
          } 

    }//endfor

    /* below is useful for debugging */
    if($changed > 0) {
      echo $newtracks++ . " tracks were added\n"; 
    } else {
      echo " No New Tracks Were Added\n"; 
    }
?>