//show me love to the module pattern singleton
var lastfm = (function($event,$$){
 
    //configuration
    var input = 'username',

    username = 'thinkphp', 

    outputid = 'result',

    badgeid = 'badge',

    //amount of tracks
    amount = 10, 

    //timeout
    timeoutdelay = 1000,

    //get element by ID
    $ = function(id) {return document.getElementById(id);}, 

    //fire events request
    req = function(){},

    //fire events complete||success
    success = function(){},  

    //template output
    tpl = "<li><a href='{link}'>{title}</a> <span>{pubDate}</span></li>",

    //object for EventManager
    evt = new EventManager();

    function init(options) {

        if(typeof options == 'object') {

               if(typeof options.onRequest === 'function') {
                      req = options.onRequest;  
               } 
               if(typeof options.onSuccess === 'function') {
                      success = options.onSuccess;  
               } 

               if(typeof options.username !== 'undefined') {
                      username = options.username; 
               }

               if(typeof options.where !== 'undefined') {
                      outputid = options.where; 
               }

               badgeid = badgeid + (new Date().getTime());

               //add custom event onRequest
               evt.addListener('request', req);

               //add custom event onComplete
               evt.addListener('complete', success);

               callData();

        }//endif
    };

    function callData(event) {

         if($(outputid)) {

             evt.fireEvent('request');

             var user = username;

             var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json&diagnostics=true&callback=lastfm.retrieveData";

             $$.Script(url,function(){}); 
         }
    };

    function retrieveData(dataset) {

             if(dataset.query.results !== null) {

                displayData(dataset);

             } else {

                handleError();
             }
    };

    function displayData(dataset) {

         evt.fireEvent('complete',[dataset]);

         var out = $(outputid);

         var items = dataset.query.results.item, 
             n = items.length, 
             output = '',
             ul = document.createElement('ul');

             ul.id = badgeid;
             for(var i=0;i<n;i++) {
                 output += template(tpl,items[i]);  
             }

             ul.innerHTML = output;

             out.appendChild(ul);

             $(outputid).getElementsByTagName("a")[0].focus();
             
    };
 
    function handleError() {
             $(outputid).innerHTML = '<div class="error">User Not Found.</div>' 
    };

    return {init: init,
            retrieveData: retrieveData};

})(GIB.util.Event,GIB.util.Script);

var $=function(id){return document.getElementById(id);}
