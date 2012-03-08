<?php
  if(isset($_GET['user'])) {
    $username = $_GET['user']; 
  } else { 
    $username = "thinkphp";
  }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
<title><?php echo$username;?>'s Library</title>
<link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
<style type="text/css">
    body {
      font-size:24px;
      line-height:1.5;
      color:#333;
    }
    h1,h2,h3,body { font-family:'gill sans','dejavu sans',verdana,sans-serif; }

    h1 {
      margin-left: 29px; 
      font-weight:bold;
      font-size:80px;
      letter-spacing:-5px;
      color:#c09;
      margin-bottom:0;
      position:relative;
    }
    h1 b {
      color:#ccc;
    }
    #ft p {margin-left: 37px;}
    #ft p a{color: #393}
</style>
</head>

<body class="yui-skin-sam">
<div id="doc3" class="yui-t7">

   <div id="bd" role="main">
	<div class="yui-g">

<?php

  require_once('easy.cache.class.php');

  $apikey = '2993c6e15c91a2890c2f11fa95673067';

  $cache = new EasyCache(5);//I want to cache for five hours

  $api = 'http://ws.audioscrobbler.com/2.0/?method=user.getTopArtists&user='. $username .'&api_key='. $apikey .'&limit=9&format=json';

  $profile = $cache->getData("topartists_".$username,$api);

  $results = json_decode($profile,true);
  
  $artists = $results['topartists']['artist'];

  $str = ''; 

  foreach($artists as $artist) {

     $name = $artist['name']; 
     $src = $artist[image][4]['#text']; 
     $playcount = $artist['playcount']; 
     $url = $artist['url'];

  $str .= <<<artist
  
 <section>
    <ul>
      <li class="positioned interactive smooth threed" tabindex="0">
        <figure>
          <img src="{$src}" alt="Mittens the cat">
          <figcaption>
            <p>
              <strong>{$playcount} plays</strong><a href="{$url}">{$name}</a>
            </p>
          </figcaption>
        </figure>
      </li>
    </ul>
  </section>
artist;
          
  }

echo"<h1><b>|</b>$username's Library</h1>";
echo$str;
?>

  </div>
 </div>
<div id="ft"><p><a href="http://thinkphp.ro/+">google+</a></p></div>
</div>
<style type="text/css">

    section {
      float: left;
      height: 280px;
    }
    footer {
      clear: both;
    }
    .positioned {
      list-style: none;
      width: 300px;
      height: 200px;
      position:relative;
    }
    .positioned figcaption {
      position: absolute;
      background: rgba( 0, 0, 0, 0.7 );
      color: #fff;
      border-radius: 5px;
      left: 65px;
      bottom: 10px;
      width: 230px;
    }
    .positioned img {
      opacity:0.4;    
    }
    .positioned figcaption strong {
      display: block;
      color: #fff;
      font-weight: normal;
      font-size: 15px;
      padding: 5px 0;
    }
    .positioned figcaption p {
      display: block;
      color: white;
      padding: 5px;
    }
    .interactive {
      overflow: hidden;
    }
    .interactive img {
      opacity: 1;
    }
    .interactive figcaption {
      left: 300px;
    }  
    .interactive:hover img, .interactive:focus img {
      opacity: 0.4;
    }
    .interactive:hover figcaption, .interactive:focus figcaption {
      left: 75px;
    }
    .smooth img {
      -webkit-transition: all 1s;
      -moz-transition:    all 1s;
      -o-transition:      all 1s;
      -ms-transition:     all 1s;
      transition:         all 1s;
    }
    .smooth figcaption {
      -webkit-transition: all 1s;
      -moz-transition:    all 1s;
      -ms-transition:     all 1s;
      -o-transition:      all 1s;
      transition:         all 1s;
    }
    .threed {
      -webkit-perspective: 800px;
      -moz-perspective:    800px;
      -ms-perspective:     800px;
      -o-perspective:      800px;
      perspective:         800px;
    }
    .threed:hover img, .threed:focus img {
      -webkit-transform: rotateY( 50deg ) rotateX( 10deg )
                         translate3d( 80px, -20px, -100px );
      -moz-transform:    rotateY( 50deg ) rotateX( 10deg )
                         translate3d( 80px, -20px, -100px );
      -o-transform:      rotateY( 50deg ) rotateX( 10deg )
                         translate3d( 80px, -20px, -100px );
      -ms-transform:     rotateY( 50deg ) rotateX( 10deg )
                         translate3d( 80px, -20px, -100px );
      transform:         rotateY( 50deg ) rotateX( 10deg )
                         translate3d( 80px, -20px, -100px );
    }   
    figcaption p a {color: lime;font-size: 20px;text-decoration: none} 
    figcaption p a:hover {text-decoration: underline} 
</style>

</body>
</html>
