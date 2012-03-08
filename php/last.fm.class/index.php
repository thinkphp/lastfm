<?php

    require_once('lastfm.class.php');
    $username = "thinkphp";
    $apikey = "2993c6e15c91a2890c2f11fa95673067";

    $lastfm = new LastFM($username,$apikey);
    $results = $lastfm->user('getRecentTracks',array("limit"=>5));
    $tracks = $results['recenttracks'];

    //for debug
    //echo"<pre>";
    //print_r($tracks); 
    //echo"</pre>";   

    $data = $tracks['track'];
    $profile = createWidget($data);
    
    $username2 = "yelf";
    $results = $lastfm->user('getRecentTracks',array("limit"=>5,"user"=>$username2));
    $tracks = $results['recenttracks'];
    $data = $tracks['track']; 
    $profile2 = createWidget($data);

    function createWidget($data) {

    $profile = "<ul>";   

    $class = 'odd';

    foreach($data as $track) {
 
       $profile .= '<li class="itemRow '.$class.'">';

       $src = $track['image'][1]['#text'];

       if(($src) == "") $src = "http://thinkphp.ro/apps/lastfm/mootools/jsonp2/noimage.gif";

       $profile .= '<a href="'.$track['url'].'"><img src="'.$src.'" alt="" /></a>';
       
       $profile .= '<div class="itemName"><a href="'.$track['url'].'">'.$track['album']['#text'].'</a></div>';

       $profile .= '<div class="itemArtist">'.$track['artist']['#text'].'</div>';

       $profile .= "</li>" ;

       if($class == 'odd') $class = 'even'; else $class = 'odd';
    }

    $profile .= "</ul>";    

    return $profile; 
    }

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>Last.fm Widget using PHP</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
<style type="text/css">

h1,h2,h3,body { font-family:'gill sans','dejavu sans',verdana,sans-serif; }

    h1 {

      font-weight:bold;
      font-size:55px;
      letter-spacing:2px;
      color:#000;
      margin-bottom:0;
      position:relative;
    }
    h1 b {
      color:#ccc;
    }
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

</head>

<body class="yui-skin-sam">
<div id="doc2" class="yui-t1">
   <div id="hd" role="banner"><h1>Get Recent Tracks from User</h1></div>
   <div id="bd" role="main">
	<div id="yui-main">
	<div class="yui-b">
<div class="yui-g" style="margin-left: 300px">

<div class="lastFM">
<div class="lastFMHeader"><?php echo$username;?>'s Recently Listened Tracks</div>
<div id="result" class="lastFMBody recenttracks">
<?php echo$profile;?>
</div>
</div>



	</div>
</div>
	</div>
	<div class="yui-b">

<div class="lastFM">
<div class="lastFMHeader"><?php echo$username2;?>'s Recently Listened Tracks</div>
<div id="result" class="lastFMBody recenttracks">
<?php echo$profile2;?>
</div>
</div>

      </div>
	
	</div>
   <div id="ft" role="contentinfo"><p>created by <a href="http://thinkphp.ro/+">google+</a></p></div>
</div>
</body>
</body>
</html>
