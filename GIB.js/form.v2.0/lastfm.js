var lastfm = (function($event,$$){
 
    //configuration
    var input = 'username',
        outputid = 'result',
        badgeid = 'badge',

    //amount of tracks
    amount = 10, 

    //timeout
    timeoutdelay = 1000,

    //store the link that was linked
    o = null,

    //store the button
    f = 'f',

    $ = function(id) {return document.getElementById(id);}, 

    //template output
    tpl = "<li><a href='{link}'>{title}</a> <span>{pubDate}</span></li>";

    function init() {

        if($(input)) {
               o = $(input);
               f = $(f);
               $event.addListener(f,'submit',callData,false);
        }   

    };

    function callData(evt) {

         if(document.getElementById(outputid)) {

             $(outputid).innerHTML = "<span class='loading'>Loading...</span>";
      
             lastfm.to = window.setTimeout("lastfm.failure()",timeoutdelay);

             var user = o.value;

             var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json&diagnostics=true&callback=lastfm.retrieveData";

             $$.Script(url,function(){}); 

             $event.cancelClick(evt);
         }
    };

    function retrieveData(dataset) {

             window.clearInterval(lastfm.to);

             if(dataset.query.results !== null) {
                displayData(dataset);
             } else {handleError();}
    };

    function displayData(dataset) {

             $(outputid).innerHTML = "";
         var out = $(outputid);
             removeBadge();  
         var items = dataset.query.results.item, 
             n = items.length, 
             output = '';

         var ul = document.createElement('ul');
             ul.id = badgeid;
             for(var i=0;i<n;i++) {
                 output += template(tpl,items[i]);  
             }
             ul.innerHTML = output;
             out.appendChild(ul);
             $(outputid).getElementsByTagName("a")[0].focus();
    };
 
    function failure() {
             window.clearInterval(lastfm.to);
             window.location = o.getAttribute('href');             
    };

    function removeBadge() {
             if($(badgeid)) {
                $(badgeid).parentNode.removeChild($(badgeid));
             }
    };  
 
    function handleError() {
             $('result').innerHTML = '<div class="error">User Not Found.</div>' 
    };
    return {init: init,retrieveData: retrieveData, failure: failure};
})(GIB.util.Event,GIB.util.Script);
           GIB.util.Event.domReady(function(){
               lastfm.init(); 
           });          

