<?php

    class LastFM {

          const endpoint = 'http://ws.audioscrobbler.com/2.0/';
          private $apikey;
          private $user;
          private $secret;
          private $callback; 

          public function __construct($user,$apikey,$secret=NULL) {

                 $this->apikey = $apikey;
                 $this->user = $user;
                 $this->secret = $secret;
          }

          public function callback($url) {
                 $this->callback = $url;
          } 

          public function user($method,$params = array()) {

                 switch($method) {

                       case 'getRecentTracks':

                       $url = self::endpoint . '?method=user.' . $method . '&user='. $this->user . '&format=json&api_key='. $this->apikey;
                       $p = '';
                       if(!empty($params)) {
                          foreach($params as $key=>$value) {
                              $p .= '&'.$key.'='.urlencode($value); 
                              $url .= $p; 
                          }
                       }
                 }  

                 $json = file_get_contents($url);

              return json_decode($json, true);
          } 

          public function chart($method,$params = array()) {

                 $url = self::endpoint.'?method=chart.'.$method.'&format=json&api_key='.$this->apikey;

                 $p = '';
                 if(!empty($params)) {
                     foreach($params as $key=>$value) {                         
                         $p .= '&'.$key.'='.urlencode($value); 
                         $url .= $p; 
                     }
                 }

                $json = file_get_contents($url);

             return json_decode($json,true);

          }

          public function library($method,$params = array()) {

                 $url = self::endpoint.'?method=library.'.$method.'&user='.$this->user.'&format=json&api_key='.$this->apikey;

                 $p = '';
                 if(!empty($params)) {
                     foreach($params as $key=>$value) {                         
                         $p .= '&'.$key.'='.urlencode($value); 
                         $url .= $p; 
                     }
                 }

                 $json = file_get_contents($url);

               return json_decode($json,true);
          }

          public function artist($method,$params = array()) {

                 $url = self::endpoint . '?method=artist.' . $method . '&autocorrect=1&format=json&api_key='. $this->apikey;

                 $p = '';
                 if(!empty($params)) {
                     foreach($params as $key=>$value) {                         
                         $p .= '&'.$key.'='.urlencode($value); 
                         $url .= $p; 
                     }
                 }

                 $json = file_get_contents($url);

               return json_decode($json,true);
          }


          public function geo($method,$params = array()) {

                 switch($method) {

                        case 'getEvents':


                                  if(empty($params['location']) && empty($params['lat']) && empty($params['long'])) {
 
                                     $geo = simplexml_load_file('http://www.geoplugin.net/xml.gp?ip=188.25.125.141');
                                     $params['location'] = $geo->geoplugin_city;
                                  }  

                              $url = self::endpoint.'?method=geo.getEvents&format=json&api_key='.$this->apikey;
                              $p = '';
                              if(!empty($params)) {
                                  foreach($params as $key=>$value) {                         
                                     $p .= '&'.$key.'='.$value; 
                                    $url .= $p; 
                                  }
                              }

                              $json = file_get_contents($url);
                              break;

                        case 'getTopArtists':

                                  if(empty($params['country'])) {
 
                                     $geo = simplexml_load_file('http://www.geoplugin.net/xml.gp?ip=188.25.125.142');
                                     $params['country'] = $geo->geoplugin_countryName;
                                  }  

                              $url = self::endpoint.'?method=geo.getTopArtists&format=json&api_key='.$this->apikey;
                              $p = '';
                              if(!empty($params)) {
                                  foreach($params as $key=>$value) {                         
                                     $p .= '&'.$key.'='.$value; 
                                    $url .= $p; 
                                  }
                              }

                              $json = file_get_contents($url);
                              break;

                        break;

                        case 'getTopTracks':

                                  if(empty($params['country'])) {
 
                                     $geo = simplexml_load_file('http://www.geoplugin.net/xml.gp?ip=188.25.125.142');
                                     $params['country'] = $geo->geoplugin_countryName;
                                  }  

                              $url = self::endpoint.'?method=geo.gettoptracks&format=json&api_key='.$this->apikey;
                              $p = '';
                              if(!empty($params)) {
                                  foreach($params as $key=>$value) {                         
                                     $p .= '&'.$key.'='.$value; 
                                    $url .= $p; 
                                  }
                              }

                              $json = file_get_contents($url);
                              break;

                        break;

                        default: 

                        $json = json_encode(array("error"=>"This call is not yet supported"));      
                 }
             return json_decode($json,true);
          }

    }  

    $username = "thinkphp";

    $apikey = "2993c6e15c91a2890c2f11fa95673067";

    $lastfm = new LastFM($username,$apikey);


    //artist
    /**
       Params:
          1)artist(required) - the artist name
          2)autocorrect(optional)(0/1) - transform misspelled artist names into correct artist names, 
                                         returning the correct version instead.
          3)api_key(required) A Lastfm API key.
     */
    //$params = array("artist"=>"Prodigy");   

    //$lastfm->artist("getSimilar",$params);
    //$lastfm->artist("getInfo",$params);
    //$lastfm->artist("getTopFans",$params);


    //chart 
    //$params = array("limit"=>10);
    //$lastfm->chart("getTopTags",$params);
    //$lastfm->chart("getTopArtists",$params);


    //library
    /**
         Params:
         1) user(required) - the user whose library you want to fetch.
         2) artist (optional) - an artist which to filter tracks.
         3) limit (optional) - the number of results to fetch per page. defaults to 50
         4) page (optional)  - the page number you wish to scan to.
         5) api_key (required) - a lastfm api key. 
     */
    echo"<pre>";
    //print_r($lastfm->library("getTracks",array("user"=>"voidberg","limit"=>5)));
    echo"</pre>";


    //user
    /**
       Params:
          1) limit (optional) - the number of results to fetch per page.
          2) page  (optional) - the page number to fetch. Default to first page.
          3) to    (optional) - end timestamp of a range.
          4) from  (optional) - beginning timestamp of a range - only display scrobbles after this time (UTC timezone)
                                (in UNIX timestamp format integer of seconds since 00:00:00, January 1st at 1970 UTC)
          5)api_key(required) A Lastfm API key.
    */
    echo"<pre>";
    //print_r($lastfm->user("getRecentTracks",array("page"=>2)));
    echo"</pre>";

    /**
       Params:
          1) lat (optional)  - specifies a latitude value to retrieve events for (service returns nearby events by default)
          2) long (optional) - specifies a longitude value to retrieve events for (service returns nearby events by default)
          3) location (optional) - specifies a location to retrieve events.
          4) distance (optional) - finds events within a specified radius (in kilometers)
          5) limit (optional) - the number of results to fetch per page.
          6) page (optional) - the page number to fetch. Defaults to first page
          7) api_key (required) - A Last.fm API  KEY.
          8) country (required) - A country name, as defined by the ISO 3166-1 country names standard 
      
    */    
    //geo => getEvents => Get all events in a specific location by country or city name.
    //print_r($lastfm->geo("getEvents",array("location"=>"Bucharest")));

    //geo => getTopArtists => Get the most popular artists on lastfm by country
    echo"<pre>";  
    //print_r($lastfm->geo("getTopArtists",array("country"=>"romania")));
    echo"</pre>";  

    //geo => getTopTracks => Get the most popular tracks on lastfm by country
    echo"<pre>";  
    //print_r($lastfm->geo("getTopTrackds",array("country"=>"Spain")));
    echo"</pre>";  
 

?>