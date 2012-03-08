<?php
      if(isset($_GET['user'])) {
        $user = $_GET['user'];  
      } else {
        $user = "yelf"; 
      }

      if(isset($_GET['type']) && $_GET['type'] == 1) {
        $type = "subscriber";
      } else {
        $type = "user"; 
      }


      $error = 'Error retrieving data! Please try again!';

      //set endpoint
      $root = 'http://query.yahooapis.com/v1/public/yql?q=';

      $profile = get_profile($user);

      //set statement YQL
      $yql = "select * from html where url='http://www.last.fm/user/" . $user . "' and xpath=\"//div[@id='recentTracks']\"";

      //set URL
      $url = $root . urlencode($yql) .'&diagnostics=false&format=xml';

      //get content in format XML
      $xml = get($url);

         //using regexp for the clean of the results
         $xml = preg_replace("/.*<results>|<\/results>.*/",'',$xml);

         $xml = preg_replace("/' '/",'',$xml);

         $xml = preg_replace("/<\?xml version=\"1\.0\" encoding=\"UTF-8\"\?>/",'',$xml);

         $xml = preg_replace("/<!--.*-->/",'',$xml);

         $xml = preg_replace("/href=\"\//",'href="http://last.fm/',$xml);  

         $xml = preg_replace("/<script[^>]*?>[\s\S]*?<\/script>/",'',$xml);  

         $xml = str_replace("–",'',$xml);  

      ///using cURL
      //@param url (String) retrieve URL
      //@return data
      function get($url) {

                 $ch = curl_init();

                 curl_setopt($ch,CURLOPT_URL,$url);

                 curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);

                 curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
 
                 $data = curl_exec($ch);

                 curl_close($ch);

                 if(empty($data)) {return $error;}

                            else {return $data;}
 
       }//end function get

       function get_profile($user) {

          global $type;

          //set endpoint
          $root = 'http://query.yahooapis.com/v1/public/yql?q=';

          $yql = "select * from html where url=\"http://www.last.fm/user/".$user."\" and xpath=\"//div[@class='clearit $type vcard']\""; 

          $url = $root . urlencode($yql) .'&diagnostics=false&format=xml';

          $xml = get($url);

          //using regexp for the clean of the results
          $xml = preg_replace("/.*<results>|<\/results>.*/",'',$xml);

          $xml = preg_replace("/' '/",'',$xml);

          $xml = preg_replace("/<\?xml version=\"1\.0\" encoding=\"UTF-8\"\?>/",'',$xml);
 
          $xml = preg_replace("/<!--.*-->/",'',$xml);

          $xml = preg_replace("/href=\"\//",'href="http://last.fm/',$xml);  

          $xml = preg_replace("/<script[^>]*?>[\s\S]*?<\/script>/",'',$xml);

          $pr = 'id="hcard-'.$user.'"';

          $xml = str_replace($pr,'id="userBadge"',$xml);  


         return $xml;   
       }
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>last.fm</title>
   <link rel="stylesheet" href="http://yui.yahooapis.com/2.8.0r4/build/reset-fonts-grids/reset-fonts-grids.css" type="text/css">
</head>
<body class="yui-skin-sam">
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1><b>|</b>last.fm</h1></div>
   <div id="bd" role="main">
	<div class="yui-g">

       <?php echo$profile; ?>

       <?php echo$xml; ?>

       <link rel="stylesheet" href="profile.css" type="text/css" />

	</div>

	</div>
   <div id="ft" role="contentinfo"><p>created by @<a href="http://twitter.com/thinkphp">thinkphp</a></p></div>
</div>
</body>
</html>


<style type="text/css">
    #hd h1 {
      font-weight:bold;
      font-size:80px;
      letter-spacing:-5px;
      color:#c09;
      margin-bottom:0;
      position:relative;
      left: 0px;
    }
    h1 b {
      color:#ccc;
    }
.heading {
 margin-top: 50px
}
#recentTracks {
clear: both;
}
h2.heading a{   
    border-top: 1px dotted #CCCCCC; 
    clear: both;
    color: #c09;
    font-size: 18px;
    line-height: 13px;
    margin: 3px 10px 2px;
    padding: 0;}

#recentTracks table {
    margin-bottom: 15px;
}

table.tracklist {
    clear: both;
    color: #696969;
    font-size: 11px;
    line-height: 1.18182em;
    width: 100%;
}
master.css (line 8230)
table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 100%;
}

table.tracklist td.imageCell {
    padding: 0;
}

table.tracklist td.imageSmall {
    padding: 5px;
    width: 34px;
}

table.tracklist th, table.tracklist td {
    border-bottom: 1px solid #CCCCCC;
    padding: 5px 10px;
}

table td.subjectCell a {
    color: #1B1B1B;
}
table td.subjectCell a:hover {
    color: #0187C5;
}

td.subjectCell div {
    height: 1.36364em;
    overflow: hidden;
    width: 100%;
}
td.subjectCell p {float: right}
table tr:hover {background: #ADC6E0;cursor: pointer}
table {border-collapse: collapse; margin-bottom: 2em;}
td, th {padding: 0.1em 1em;}
</style>