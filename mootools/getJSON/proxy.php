<?php
$user = $_GET['user'];
$url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F".$user."%2Frecenttracks.rss%22&format=json";
     /* using cURL */
     function get($url) {
               $ch = curl_init();
               curl_setopt($ch,CURLOPT_URL,$url);
               curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
               curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
               $data = curl_exec($ch);
               curl_close($ch);  
               if(empty($data)) {
                  return 'Error retrieve data, please try again.';
               } else {return $data;}   

      }//end function get

echo (get($url));
?>