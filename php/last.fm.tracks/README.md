Last.fm.tracks is a Last.fm mirror.

It uses the Last.fm API to pull your data into a database on your server and then display it.

- config.php       - you'll need to enter your database configuration here.
- init.php         - several functions used in.
- tracks.php       - this is a public display, if you want to change how the output looks, mess with this file.
- table-tracks.sql - this is a file used to set up the MySQL database, created table with its data.
- lastsync.php     - this is a script that runs to pull the data from Last.fm and load it into MySQL. I run it from
                     cron twice per day, but it could be much better.
- .htaccess        - edit as needed.