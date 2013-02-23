     /**
          A method YQL client for this micro-framework;
          Yahoo! Query Language is an expressive SQL-like language that lets you query, filter, and join data across web services.
          With YQL, apps runs faster with fewer lines of codes and smaller network footprint.
          Yahoo! and other sites across the internet make much of their structured data available to developers, primarily through
          Web Services. To access and query these services, developers traditionally endure the pain and location the right URLs and 
          documentation to access and query each Web service.

          i.e: select * from twitter.usertimeline where id='YQL'

          console: http://developer.yahoo.com/yql/console/  

          @param query String - a YQL query;
          @param callback Function - a callback function that receives the result of the query;
          @param format String - the format of the result, by default 'json';
          @param diagnostics Boolean - true or false, by default to false;
          @return - return this, c`est-a-dire this object;
               
      */

if(!cui.yql) 

cui.yql = function(){

    var _query = null,
        _format = 'json',
        _diagnostics = false;
       
    function fetch( callback ) {

         var scriptEl = document.createElement("script"),

         endpoint = 'http://query.yahooapis.com/v1/public/yql?q=',

         env = '&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',

         encodedURL = encodeURIComponent( _query );

         id = 'YQL' + (+new Date()),

         src = endpoint + encodedURL + '&format='+ _format + '&callback=cui.' + id + '&diagnostics=' + _diagnostics + env;

         cui[ id ] = function( data ) {

              //for debug
              if(window.console) console.log( data )
 
              //invoke the callback function to execute
              callback( data ) 

              //delete from memory
              //delete cui[ id ]

              //delete script node
              document.body.removeChild( scriptEl )
         }

         //set type attribute
         scriptEl.setAttribute('type', 'text/javascript')

         //set src attribute
         scriptEl.setAttribute('src', src);

         //append to body DOM
         document.body.appendChild( scriptEl ) 
     };

     return function(query, callback, format, diagnostics) {

          _query = query;

          _format = format || 'json';

          _diagnostics = diagnostics || false;

          fetch( callback )
     };
}();