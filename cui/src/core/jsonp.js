if(!cui.jsonp)

cui.jsonp = function(){
 
       //@private property to hold the url!
       var _URL = "";

       //@private property to save callback function
       var mycallback = function(){},

           //@private var to hold json callback NAME
           jsonCallbackName = null;

           //@private method
           function fetchjson () {

                 var id = new Date().getTime(),

                     doc = document,  

                     fn = 'callback_' + id;

                     _URL = _URL.replace('=?','=cui.' + fn),

                     s = doc.createElement('script');

                     s.setAttribute('type','text/javascript')

                     cui[ fn ] = evalJSON( mycallback )

                     s.setAttribute('src', _URL)

                     document.getElementsByTagName('head')[0].appendChild( s )
           };

           //@private method
           function evalJSON( callback ) {

              return function( data ) {

                        var validjson = false;
 
                 if( typeof data == 'string' ) {

                      validjson = JSON.parse( data )

                 } else if( typeof data == 'object' ) {

                      validjson = data

                 } else {

                      validjson = JSON.parse( JSON.stringify(data) )

                 }//endif

                 if( validjson ) {

                      callback( validjson )

                      if(window.console) console.log('VALID JSON')

                 } else {

                      if(window.console) oonsole.log('JSONP call returned invalid JSON or empty JSON') 

                 }//endif

             }//end function

           };//endevalJSON

          return function(url, callback, params, callbackname) {

                 _URL = url;

                 mycallback = callback;

                 jsonCallbackName = callbackname || 'callback';

                 if(params !== 'undefined' && typeof params == 'object'){

                    var query = '';

                     for(var key in params) {

                       if(params.hasOwnProperty(key)) {

                          query += encodeURIComponent(key) + '=' + encodeURIComponent(params[key]) + '&'
                       } 
                     }

                     if( query ) _URL += '?' + query  
                 }                
      
                 _URL += '&' + jsonCallbackName + '=?';                 

                 fetchjson();     
          }
}();
