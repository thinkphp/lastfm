<?php

  $profile = get("http://www.last.fm/user/thinkphp");
  $profile = preg_replace("/<div id=\"tasteCocktail\">.*/","",$profile);
  preg_match_all('/<ul class=" libraryItems artistsLarge ">(.*)<\/ul>/', $profile, $update);

  function get($url) {

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HEADER, 0);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $out = curl_exec($ch);
      $out = preg_replace("/\n|\t/","",$out);
      curl_close($ch);
          if(empty($out)) {
             return "timeout service"; 
          } else {
             return $out;
          }
  } 
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>Scrapping user's Library last.fm using PHP5</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
<style type="text/css">

h1 {
      font-weight:bold;
      font-size:80px;
      letter-spacing:-5px;
      color:#c09;
      margin-bottom:0;
      position:relative;
      left:00px;
    }
    h1 b {
      color:#ccc;
    }
ul.artistsLarge a.plays {
    color: #0187C5;
    font-size: 14px;
    white-space: nowrap;
    line-height: 17em;
}
ul.libraryItems {
    clear: both;
    height: 310px;
    padding-top: 10px;
    overflow: hidden;
    position: relative;
}
ul {
    list-style: none outside none;
}

ul.artistsLarge li {
    display: inline;
    float: left;
    height: 155px;
    margin: 0 9px 0 0;
    overflow: hidden;
    position: relative;
    width: 132px;
}

.overlay {
    background: url("http://cdn.lst.fm/flatness/picture_frame.png") repeat scroll left top transparent;
    display: block;
    height: 109px;
    left: 0;
    position: absolute;
    top: 0;
    width: 132px;
}

a.playbutton {display: none}

.pictureFrame .image {
    display: block;
    height: 100px;
    left: 3px;
    overflow: hidden;
    position: absolute;
    top: 2px;
    width: 126px;
}

ul.artistsLarge {
    font-size: 11px;
    line-height: 1.18182em;
}
ul {
    list-style: none outside none;
}
a {
    color: #0187C5;
    text-decoration: none;
}
a:active {
    outline: medium none;
}
a:hover {
    color: #0187C5;
    text-decoration: underline;
}
a.text {
    color: #000000;
}
a.light {
    color: #696969;
}
a.inherit, a.inherit:hover, a.inherit:focus {
    color: inherit;
}
strong.name {font-size: 15px;color: #000}
</style>

</head>
<body class="yui-skin-sam">
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1><b>|</b>Scrapping last.fm using PHP</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">
<?php
//  echo"<div id='' style='width: 500px;'>";
  echo($update[0][0]);
//  echo"</div>";
?>


	</div>

	</div>
   <div id="ft" role="contentinfo"><p>Created by @<a href="http://thinkphp.ro/@">thinkphp</a> &copy; 2010</p></div>
</div>
</body>
</html>

