<?php include_once("init.php"); date_default_timezone_set('Europe/Bucharest');?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
   <title>Last.fm Track</title>
   <link rel="stylesheet" href="reset.css" type="text/css">
   <link rel="stylesheet" href="base.css" type="text/css">
   <style type="text/css">
   body {margin: 30px;font-size: 11px;font-family: 'Lucida Grande', Verdana, Geneva, Lucida, Arial, Helvetica, sans-serif;color: #666;}
   h1 {float: left;font-size: 14px;margin: 4px 0;}
   h2 {float: right;font-size: 10px;font-weight: normal;margin: 4px 0;}
   table {width: 100%;border-spacing: 0;border-collapse: 0;clear: both;}
   table tr td {margin: 0;padding: 4px 8px;border-bottom: 1px #ccc solid;}
   table tr td.date {text-align: right;}
   table#tracks tr:hover td {background: #bfdff4;}
   a:link, a:visited, a:active, a:hover {color: #333;text-decoration: none;}
   a:active, a:hover {color: #66f;text-decoration: underline;}
   #hd h1 a{color: #D51007;font-size: 140%} 
</style>
   <script type="text/javascript" src="http://code.jquery.com/jquery-1.4.4.min.js"></script>
   <script type="text/javascript">
       $(document).ready(function(){
         $("tr:even").css('background-color','#ebebeb');
         $("tr:odd").css('background-color','#ffffff');
       });
   </script>
</head>
<body>
<div id="doc" class="yui-t7">
   <div id="hd" role="banner"><h1><a href="http://www.last.fm/user/thinkphp">Recently Listened Tracks</a></h1></div>
   <div id="bd" role="main">

<?php

   $rowperpage = 200;

   $pagenum = 1;

   if(isset($_GET['page'])) {
      $pagenum = $_GET['page'];  
   }

   $offset = ($pagenum - 1 ) * $rowperpage;

 
   /* how many tracks */ 

   $dbcount = get_count();

   if(isset($dbcount)) {
      foreach($dbcount as $row) {
          $thecount = $row["count"];
      } 
   }  


   $pagenumprev = $pagenum - 1;
   $pagenumnext = $pagenum + 1;

   if($pagenumprev < 1) {
      $pagenumprev = 1; 
   }
?>

<p style="float: left; clear: both">
<?php echo $thecount ?> tracks scrobbled.
</p>

<p style="float: right">
<a href="?page=<?php echo $pagenumprev ?>">&laquo; prev</a> |
<a href="?page=<?php echo $pagenumnext ?>">next &raquo;</a>
</p>

   <table id="tracks">
<?php
    
  
   $items = get_tracks($offset, $rowperpage);

   if(isset($items)) {
     foreach($items as $row) {
         echo "<tr>\n";
         echo "<td><a href=\"" . $row['urlartist'] . "\">" . substr($row['artist'], 0, 80) . "</a> - ";
         echo "<a href=\"" . $row['urltrack'] . "\">" . substr($row['name'], 0, 120) . "</a></td>\n";
         echo "<td class=\"date\">" . date("F j, Y, g:i a", (int) $row['dateuts']) . "</td>\n";
         echo "</tr>\n";
     } 
   } else {
     echo "<tr><td colspan=\"2\">Je suis desole, pas de tracks</td></tr>"; 
   } 
 
?>        
   </table>
<p style="float:left"> <?php echo$thecount; ?> tracks scrobbled</p>
<p style="float: right">
<a href="?page=<?php echo $pagenumprev ?>">&laquo; prev</a> |
<a href="?page=<?php echo $pagenumnext ?>">next &raquo;</a>
</p>
   </div>
   <div id="ft" role="contentinfo"><p>Written by @<a href="http://twitter.com/thinkphp">thinkphp</a> | download on <a href="https://github.com/thinkphp/last.fm.tracks">GitHub</a></p></div>
</div>
</body>
</html>