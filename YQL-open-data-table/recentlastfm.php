<?php
  if(isset($_GET['user'])) {
    $username = $_GET['user']; 
  } else { 
    $username = "yelf";
  }
?>
<style type="text/css">
.lastFM
{
	font-family: Arial, Helvetica, sans-serif;
	font-size: 90%;
	margin: 2em 3em;
	width: 280px;
	color: #666;
}
.lastFM a
{
	color: #444;
	text-decoration: none;
}
.lastFM a:hover
{
	color: #000;
	text-decoration: underline;
}
.lastFM a img { border: none; }
.lastFM img
{
	float: left;
	margin: 0 1em 0 0;
}

.lastFMHeader
{
	font-size: 1.2em;
	font-weight: bold;
	padding: 0.2em 0;
}



.lastFMBody { border: 1px solid #94C9FF;}
.lastFMBody ul
{
	margin: 0;
	padding: 0;
	list-style: none;
}
.lastFM .itemRow
{
	clear: left;
	margin: 0;
	padding: 0.4em; 
	height: 64px;
}
.lastFM .itemName a
{
	font-weight: bold;
}

.lastFM .odd { background-color: #94C9FF; }
.lastFM .even { background-color: #A1D9FF; }

.lastFM a img { border: none; }
.lastFM img {
	float: left;
	margin: 0 1em 0 0;
}

.lastFM .time {
font-style: oblique;
font-size: 11px;
font-height: bold
}

.lastFM ul li a img {width: 64px; height: 64px}
</style>
<?php

      //set endpoint
      $root = 'http://query.yahooapis.com/v1/public/yql?q=';

      //set statement YQL
      $yql = "use 'http://thinkphp.ro/apps/lastfm/YQL-open-data-table/recentlastfm.xml' as lastfm; select * from lastfm where username='".$username."' and api_key='2993c6e15c91a2890c2f11fa95673067'";

      //set URL
      $url = $root . urlencode($yql) .'&diagnostics=false&format=xml';

      function get($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $xml = curl_exec($ch);
        $xml = preg_replace("/\n|\t/","",$xml);
        $xml = preg_replace("/.*<results>|<\/results>.*/",'',$xml);
        $xml = preg_replace("/<\?xml version=\"1\.0\" encoding=\"UTF-8\"\?>/",'',$xml);
        $xml = preg_replace("/<!--.*-->/",'',$xml);
        $xml = preg_replace("/<result>|<\/result>/",'',$xml);
        $xml = preg_replace("/&lt;/",'<',$xml);
        $xml = preg_replace("/&gt;/",'>',$xml);
        curl_close($ch);
          if(empty($xml)) {
             return "timeout service"; 
          } else {
             return $xml;
          }
       } 
?>

<div class="lastFM">
<div class="lastFMHeader">Recent Tracks</div>
<div id="result" class="lastFMBody recenttracks">
<?php echo$profile = get($url);?>
</div>
</div>

