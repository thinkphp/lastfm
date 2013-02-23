<?php

require_once('config.thinkphp.php');

$db = mysql_connect(DB_HOST, DB_USER, DB_PASS) or die("Cannot connect to database. Check your configuration. MySQL says: " . mysql_error());

mysql_select_db(DB_DBNAME, $db) or die("Cannot select database. Check your configuration. MySQL says: " . mysql_error());

$table = DB_TABLE;

function do_query($sql, $live=0) {

     global $db;

       if($live) {
         return mysql_query($sql, $db);
      } else {
         $result = mysql_query($sql, $db);
         if(mysql_errno()) die("Cannot query database. MySQL says: ". mysql_error() . "");
        return $result;  
      }
}

function get_tracks($offset, $rowperpage) {

       global $table;
       $SQL = "SELECT id, artist, urlartist, name, urltrack, album, dateuts FROM $table ORDER BY dateuts DESC LIMIT $offset, $rowperpage";

       $result = do_query($SQL);

       $i = 0;

       while($row = mysql_fetch_array($result)) {

        $items[$i]['id'] = $row['id'];
        $items[$i]['artist'] = stripslashes($row['artist']);
        $items[$i]['urlartist'] = stripslashes($row['urlartist']);
        $items[$i]['name'] = stripslashes($row['name']);
        $items[$i]['urltrack'] = stripslashes($row['urltrack']);
        $items[$i]['album'] = stripslashes($row['album']);
        $items[$i]['dateuts'] = $row['dateuts'];
        $i++;
       }

return $items;
}

function get_count() {

    global $table; 

    $result = do_query("SELECT distinct (id) AS count from $table");

    $i = 0;

    while($row = mysql_fetch_array($result))  {
          $items[$i++]['count'] = $row['count'];
    }

   return $items;
}

?>