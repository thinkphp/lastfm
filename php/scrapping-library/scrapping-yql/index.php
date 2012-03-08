<?php

  require_once('easy.cache.class.php');

  $username = "olivboy";

  $cache = new EasyCache(7);

  $url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.last.fm%2Fuser%2F".$username."%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40class%3D'clearit%20module%20modulelibrary'%5D%22&diagnostics=true";

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
      $xml = preg_replace("/href=\"\//",'href="http://last.fm/',$xml);
      curl_close($ch);
          if(empty($xml)) {
             return "timeout service"; 
          } else {
             return $xml;
          }
  } 

  function doit($url) {
     return get($url);
  }

  $profile = $cache->getData('lastfm_'.$username,$url,"doit");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>Scrapping user's Library last.fm using YQL</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
<style type="text/css">

#hd h1 {
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


h1,h2,h3,h4,h5,h6 {
    font-size:100%;
    font-weight:normal;
}

q:before,q:after {
    content:'';
}

abbr,acronym {
    border:0;
}

strong, .strong, b, h1, h2, h3, h4, h5, h6 {
    font-weight: bold;
}

.styledText li,
.bbcode li,
#faqContent li {
    margin-left: 2em;
}

/* Headers */
h1,
.h1 {
    font-size: 18px;
    color: #000;
    font-weight: bold;
    line-height: 1.2em;
}

.l-970 h1,
.l-970 .h1 {
    font-size: 24px;
    margin-bottom: 15px;
}


h2,
.h2 {
    font-size: 14px;
    color: #D51007;
    font-weight: bold;
    line-height: 1.5em;
}

.l-970 h2,
.l-970 .h2 {
    font-size: 20px;
    line-height: 1.1;
    margin-bottom: 15px;
    color: #1b1b1b;
    padding-top: 10px;    
    border: 1px solid #ccc;
    border-width: 1px 0 0 0;
    border-style: dotted;          
}

.lfmBlack h2,
.lfmBlack .h2 {
    color: #000;
}

h2 img {
    vertical-align: text-bottom;
}

.l-970 h3,
.l-970 .h3 {
    font-size: 18px;
    line-height: 1.222222;
    font-weight: bold;    
    color: #D51007;
    padding-top: 10px;    
    border: 1px solid #ccc;
    border-width: 1px 0 0 0;
    border-style: dotted;    
    
    margin-bottom: 0; 
}

.l-970 h3 a,
.l-970 .h3 a {
    color: #D51007;    
}

.lfmBlack .l-970 .h3,
.lfmBlack .l-970 h3 a {
    color: #1b1b1b;
}

.h3-subtitle {
    font-size: 16px;
}


.l-970 h4,
.l-970 .h4 {
    font-size: 16px;
    line-height: 1.375;
}


h5,
.h5 {
    font-size: 11px;
    color: #000;
    font-weight: bold;
}


/* BASE CSS */

#page {
    color: #000;
    font-family: "Lucida Grande", Arial, Helvetica, Verdana, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: #1b1b1b;
    clear: both;
    position: relative;
}

/* links */

a {
    color: #0187c5;
    text-decoration: none;
}

a:active {
    outline: none;
}

a:hover {
    color: #0187c5;
    text-decoration: underline;
}

a.text {
    color: #000;
}

a.light {
    color: #696969;
}

a.inherit,
a.inherit:hover,
a.inherit:focus {
    color: inherit;
}

.lite {
   color: #666;
}

/* misc */

sub,
sup {
    font-size: 0.75em;
    line-height: 0.1;
}

.shoutCount {
    color: #696969;
}

#page .hint {
    color: #999;
}

.nowrap {
    white-space: nowrap;
}

small {
    font-size: 10px;
}



/* Hack: for ads that use a span to set height and width.
   Should override with inline style, but if they forget... */
.LastAd > span > span[style] {
    display: inline-block;
}

.LastAd,
.LastAd * {
    line-height: 0px;
    font-size: 1px;
    vertical-align: baseline;
}

#LastAd_lowerleaderboard.active {
    padding: 15px;
    border-top: 1px solid #ebebeb;
    background: #fff;
}

#LastAd_lowerleaderboard {
    clear: both;
    zoom: 1;
}

#LastAd_leaderboard .wrapper,
#LastAd_lowerleaderboard .wrapper {
    width: 900px;
    margin: 0 auto;
    text-align: center;
}

#LastAd_skin a,
#LastAd_skin img {
    position: absolute;
}

#LastAd_lowermpu.active {
    clear: both;
    margin: 24px 0 0 0;
}

div.sic div.leaderboardCentre {
    padding: 0;
}

div.sic div.bottomRail {
    border-top: 1px solid #ccc;
    padding-top: 15px;
    clear: both;
}

div.sic div#LastAd_sky.active {
    float: right;
    display: inline;
    width: 160px;
    height: 600px;
}

#LastAd_sky.active .wrapper {
    width: 160px;
    height: 600px;
    overflow: hidden;
}

div.leaderboardCentre .wrapper,
div.bottomRail .wrapper {
    width: 728px;
    height: 90px;
    overflow: hidden;
    margin: 0 auto;
}

div.skylineRight {
    margin-left: -15px;
    padding-right: 160px;
    overflow: hidden;
}
div.skylineRight div.skyWrap {
    overflow: hidden;
    padding: 0 15px;
    zoom: 1;
}







div.sic #content .fullWidth {
    margin: 15px 0;
    clear: both;
}

#page .twoCols h2 {
    margin-left: 0;
}

.twoCols {
    overflow: hidden;
}

div.sic #content .leftColumn,
.twoCols .leftColumn {
    float: left;
    display: inline;
    overflow: hidden;
    width: 50%;
}
div.fiflufi #content {
    position: relative;
    clear: both;
    margin: -1px 0 0 110px;
    min-height: 300px;
    background: url(http://cdn.lst.fm/flatness/grids/fiflufi_right.5.png) right top repeat-y #fff;
    overflow: visible;
    border: 1px solid #ccc;
}


/*
    Default styles depending on place in the grid
*/

#page h2.heading {
    clear: both;
    margin: 10px -15px 2px;
    padding: 0;
    color: #D51007;
    font-size: 18px;
    line-height: 13px;
    border-top: 1px dotted #ccc;
}

.lfmBlack #page h2.heading {
    color: #1b1b1b;
}

.h2Wrapper {
    display: block;
    padding: 15px;
}

.h2Wrapper a {
    text-decoration: none;
    color: #D51007;
}

.lfmBlack #page .h2Wrapper a {
    color: #1b1b1b;
}


/* Recommended Stuff */

a.recommendedLink {
    color: #d51007;
    font-weight: bold;
    font-size: 12px;
}

a.recommendedLink .recommended_icon {
    margin: 0 4px -2px 0;
}




/* Large */

ul.artistsLarge {
    display: block;
    overflow: hidden;
    font-size: 11px;
    line-height: 1.181818em;
    margin-right: -15px;
}

ul.artistsLarge li {
    position: relative;
    float: left;
    display: inline;
    width: 132px;
    height: 155px;
    margin: 0 9px 0 0;
    overflow: hidden;
}

.pictureFrame {
    position: relative;
    display: block;
    width: 132px;
    height: 109px;
    overflow: hidden;
    cursor: pointer;
}

.pictureFrame .image {
    position: absolute;
    top: 2px;
    left: 3px;
    display: block;
    width: 126px;
    height: 100px;
    overflow: hidden;
}

.pictureFrame .image img.defaultImage {
    margin: -12px 0 0 0;
}

.pictureFrame .overlay {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 132px;
    height: 109px;
    background: url(http://cdn.lst.fm/flatness/picture_frame.png) left top transparent;
}


.ie6 .pictureFrame .overlay {
    background: transparent;
    filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://cdn.lst.fm/flatness/picture_frame.png', sizingMethod='crop');
    cursor: pointer;
}

ul.artistsLarge span.track a {
    color: #696969;
}

ul.artistsLarge a {
    color: #000;
}

ul.artistsLarge a.plays {
    color: #0187c5;
    font-size: 10px;
    white-space: nowrap;
}

ul.artistsLarge a:hover {
    color: #0187c5;
}

ul.artistsLarge li a strong.withAdd {
    display: block;
    margin: 1px 0 0 3px;
    text-indent: 20px;
    line-height: 1.454545;
}
ul.artistsLarge a.playbutton {
    position: absolute;
    left: 105px;
    top: 81px;
}
ul.artistsLarge a.addbutton {
    position: absolute;
    left: 3px;
    top: 111px;
    width: 15px;
    height: 15px;
    background: url('http://cdn.lst.fm/flatness/global/icon_add_hover.gif') no-repeat 0 0;
}
ul.artistsLarge a:hover img.add_icon {
    display: none;
}

.visible ul.artistsLarge .loading span.image {
    background: url(http://cdn.lst.fm/flatness/spinner_big.gif) center no-repeat #fff;
}

ul.artistsLarge form {
    display: none;
}

ul.artistsLarge li p.info {
    color: #696969;
}

/* square */

ul.artistsSquare {
    margin: 0 0 7px 0;
}
ul.artistsSquare li {
    float: left;
    display: inline;
    width: 188px;
    margin: 6px 0 0 0;
    font-size: 11px;
    line-height: 1.181818;
}

ul.artistsSquare a {
    display: block;
    padding: 1px 0 0 45px;
    color: #0187c5;
}

ul.artistsSquare a img {
    padding: 1px;
    background: #fff;
    border: 1px solid #ccc;
}

ul.artistsSquare a.highlight img {
    border-color: #0187c5;
}

ul.artistsSquare strong {
    color: #000;
}
ul.artistsSquare a:hover strong {
    color: #0187c5;
}
ul.artistsSquare img {
    display: inline;
    float: left;
    margin: -1px 0 0 -45px;
}

/* medium */

ul.artistsMedium {
    display: block;
    overflow: hidden;
    font-size: 11px;
    line-height: 1.181818em;
    margin-right: -15px;
}

ul.artistsMedium li {
    position: relative;
    float: left;
    display: inline;
    width: 72px;
    height: 86px;
    margin: 0 9px 5px 0;
    overflow: hidden;
}

ul.artistsMedium a li {
    clear: both;
    display: block;
}

/* IE6/7 only - need to adjust the link placement to avoid text cropping */
.ie6 ul.artistsMedium a,
.ie7 ul.artistsMedium a { 
    position: relative;
    top: -3px;
}

/* medium, but then vertical (we should get rid of the default medium style alltogether...) */

ul.artistsMediumVertical li {
    clear: both;
    padding: 0 0 13px 78px;
}

ul.artistsMediumVertical li a.artist {
    color: #1b1b1b;
}

ul.artistsMediumVertical li a strong {
    display: block;
}

ul.artistsMediumVertical li a img {
    display: inline;
    float: left;
    margin: 0 0 0 -77px;
    padding: 1px;
    background: #fff;
    outline: 1px solid #ccc;
}

/* small */

ul.artistsSmall {
    margin: 1em 0;
}

ul.artistsSmall li {
    margin: 0 0 1em 0;
    padding: 0 0 0 79px;
    overflow: hidden;
}

ul.artistsSmall a {
    text-decoration: none;
}

ul.artistsSmall h4 {
    margin-left: -15px;
    border-top: solid 1px #ddd;
    padding-left: 15px;
    background: #eee;
}

ul.artistsSmall img {
    float: left;
    display: inline;
    margin: -1px 0 0 -79px;
}

ul.artistsSmall li strong {
    display: block;
    font-weight: bold;
}

ul.artistsSmall li div a {
    margin-right: 5px;
    padding-left: 14px;
    text-decoration: none;
}

ul.artistsSmall li div.media {
    margin-top: 5px;
}

ul.artistsSmall li div.media a.videos {
    background: url(http://cdn.lst.fm/flatness/video_small.gif) 0 2px no-repeat;
}

ul.artistsSmall li div.media a.tracks {
    background: url(http://cdn.lst.fm/flatness/track_small.gif) 0 2px no-repeat;
}

ul.artistsSmall li div.media a strong {
    display: none;
}

ul.artistsSmall li div.media a span {
    padding: 0 5px;
    background: #ddd;
    color: #333;
    font-size: 10px;
}

/* not really a list, but hey... */

p.artists {
    padding: 1em 0 0 0;
    clear: both;
    font-size: 11px;
    line-height: 1.181818;
}

p.artists a {
    color: #0187c5;
    text-decoration: none;
}

p.artists a.highlight {
    background: #0187c5;
    color: #fff;
}

/* artistsWithInfo */
ul.artistsWithInfo {
    clear: both;
}

ul.artistsWithInfo li {
    clear: both;
    display: block;
    position: relative;
    margin: 15px 0 0 0;
    padding: 0 0 15px 0;
    border-bottom: 1px solid #ccc;
    zoom: 1;
}

ul.artistsWithInfo li.last {
    border-bottom: none;
}

ul.artistsWithInfo li .pictureFrame {
    float: left;
    display: inline;
}

ul.artistsWithInfo li .playbutton {
    position: absolute;
}

ul.artistsWithInfo li a.artist,
ul.artistsWithInfo li a.track {
    color: #1b1b1b;
}

ul.artistsWithInfo li p.stats {
    color: #696969;
}

ul.artistsWithInfo li p.bio {
    margin: 1em 0;
}

/* artistsWithInfo large specific */

ul.artistsWithInfo li.large {
    padding-left: 145px;
}

ul.artistsWithInfo li.large .pictureFrame {
    margin-left: -145px;
}

ul.artistsWithInfo li.large .playbutton {
    left: 105px;
    top: 80px;
}

.ie6 #page .artistsWithInfo li.large .playbutton {
    margin-left: -145px;
}

ul.artistsWithInfo li.large a.artist strong {
    font-size: 16px;
    line-height: 1.181818em; 
}

ul.artistsWithInfo li.large p.stats {
    font-size: 11px;
}

/* artistsWithInfo medium specific */

ul.artistsWithInfo li.medium {
    padding-left: 80px;
}

ul.artistsWithInfo li.medium .pictureFrame {
    margin-left: -80px;
}

ul.artistsWithInfo li.medium .playbutton {
    position: static;
}

ul.artistsWithInfo li.medium p.stats {
    font-size: 11px;
}

/* Similarity match */

ul.artistsWithInfo div.matchmeter {
    float: right;
    display: block;
    right: 0px;
    top: 0px;
    width: 180px;
    background: #efefef;
    padding: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    font-size: 11px;
    line-height: 1.181818em;
}

ul.artistsWithInfo div.matchmeter strong {
    text-transform: uppercase;
}

ul.artistsWithInfo div.matchmeter span.bar {
    clear: both;
    display: block;
    width: 100%;
    height: 5px;
    margin: 3px 0 0 0;
    background: #ccc;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
}
ul.artistsWithInfo div.matchmeter span.bar span {
    display: block;
    height: 5px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
}

ul.artistsWithInfo div.matchmeter span.pc90 span {
    background: #ff0101;
}

ul.artistsWithInfo div.matchmeter span.pc70 span {
    background: #e9c102;
}

ul.artistsWithInfo div.matchmeter span.pc50 span {
    background: #05bd4c;
}

ul.artistsWithInfo div.matchmeter span.pc30 span {
    background: #453e45;
}

ul.artistsWithInfo div.matchmeter span.pc10 span {
    background: #9a9a9a;
}

/* Medium with featured */

ul.artistsMediumWithFeatured {
    padding-left: 267px;
}

ul.artistsMediumWithFeatured li {
    border-top: 1px solid #ccc;
}

ul.artistsMediumWithFeatured li .container {
    display: block;
    padding: 5px;
    padding-right: 73px;
    border-top: 1px solid #fff;
    font-size: 11px;
    line-height: 1.181818em;
    min-height: 64px;
}

ul.artistsMediumWithFeatured li img.artistImage {
    display: inline;
    float: right;
    margin-right: -73px;
}

ul.artistsMediumWithFeatured li strong.artist {
    display: block;
    font-size: 12px;
    line-height: 1.166667em;
    color: #1b1b1b;
}

ul.artistsMediumWithFeatured li a:hover {
    text-decoration: none;
}

ul.artistsMediumWithFeatured li a:hover strong.artist {
    color: #0187c5;
}

ul.artistsMediumWithFeatured li p.info {
    font-size: 11px;
    line-height: 1.181818em;
    color: #1b1b1b;
}
    

ul.artistsMediumWithFeatured li span.info {
    display: block;
    font-size: 11px;
    line-height: 1.181818em;
}

ul.artistsMediumWithFeatured li p.info {
    margin-top: 5px;
}

ul.artistsMediumWithFeatured li.first {
    display: inline;
    float: left;
    margin-left: -267px;
    border: 1px solid #ccc;
    padding: 1px;
    background: #fff;
}

ul.artistsMediumWithFeatured li.first a {
    display: block;
    position: relative;
    width: 252px;
    height: 189px;
    background-color: #000; /* CSS Defensiveness */
    background-repeat: no-repeat;
    background-position: center top;
}

ul.artistsMediumWithFeatured li.first p.info {
    display: block;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 252px;
    color: #fff;
    font-size: 11px;
    line-height: 1.272727em;
}

ul.artistsMediumWithFeatured li.first p.info * {
    padding: 3px 9px;
    display: inline;
    float: left;
    background: #000;
    opacity: 0.9;
    -moz-opacity: 0.9;
    filter:alpha(opacity=90);
}
        

ul.artistsMediumWithFeatured li.first p.info strong {
    font-size: 14px;
    line-height: 1.142857em;
    font-weight: bold;
    padding: 3px 9px;
}

ul.artistsMediumWithFeatured li.first p.info .extra {
    clear: left;
    padding-bottom: 5px;
}


ul.artistsMediumWithFeatured li.first a:hover p.info strong {
    color: #0187c5;
}


/* Mega with featured */

ul.artistsMegaWithFeatured {
    clear: both;
    display: block;
    border: 1px solid #ccc;
}

ul.artistsMegaWithFeatured li {
    display: block;
    float: left;
}

ul.artistsMegaWithFeatured li a {
    position: relative;
    display: block;
    width: 195px;
    height: 134px;
    border: 1px solid #fff;
    background-color: #ccc;
    background-repeat: no-repeat;
    background-position: center center;
}

ul.artistsMegaWithFeatured li.first a {
    width: 352px;
    height: 270px;
}

ul.artistsMegaWithFeatured li a:hover {
    text-decoration: none;
}

ul.artistsMegaWithFeatured li p.info {
    display: block;
    position: absolute;
    left: 0px;
    bottom: 0px;
    width: 100%;
    color: #fff;
    font-size: 11px;
    line-height: 1.181818em;
}

ul.artistsMegaWithFeatured li p.info * {
    padding: 3px 9px;
    display: inline;
    clear: left;
    float: left;
    background: #000;
    /* white-space: nowrap; */
    opacity: 0.9;
    -moz-opacity: 0.9;
    filter:alpha(opacity=90);
}



</style>

</head>
<body class="yui-skin-sam">
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1><b>|</b>Scrapping last.fm using YQL</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">


<?php

  echo$profile;

?>


	</div>

	</div>
</div>
   <div id="ft" role="contentinfo"><p>Created by @<a href="http://thinkphp.ro/@">thinkphp</a> &copy; 2012</p></div>
</body>
</html>

