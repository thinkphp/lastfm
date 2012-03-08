var lastfm = (function($event,$$){
 
    //configuration
    var badgeid = 'lastfm',
        outputid = 'lastfmlist',

    //message to add to the link while loading
    loadingMessage = '(loading...)',

    //amount of tracks
    amount = 10, 

    //timeout dalay
    timeoutdalay = 1000,

    //store the link that was linked
    o = null,

    //template output
    tpl = "<li><a href='{link}'>{title}</a> <span>{pubDate}</span></li>";

    function init() {

        if(document.getElementById && document.createTextNode) {

                o = document.getElementById(badgeid);

                if(o && o.href) {

                   $event.addListener(o,'click',callData,false);
                }
        }   

    };

    function callData(evt) {

         if(!document.getElementById(outputid)) {
 
             lastfm.to = window.setTimeout("lastfm.failure()",timeoutdalay);

             var user = o.href.replace(/.*\//g,''); 

                 o.innerHTML = user + '\'s Recently Played Tracks';

             var msg = document.createElement('span');
 
                 msg.appendChild(document.createTextNode(loadingMessage));

                 o.appendChild(msg);

             var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json&diagnostics=true&callback=lastfm.retrieveData";

             $$.Script(url,function(){}); 

             $event.cancelClick(evt);
         }
    };

    function retrieveData(dataset) {

             window.clearInterval(lastfm.to);
             displayData(dataset);
    };

    function displayData(dataset) {

         var items = dataset.query.results.item, 
             n = items.length, 
             output = '';

         var ul = document.createElement('ul');
             ul.id = outputid;
             for(var i=0;i<n;i++) {
                 output += template(tpl,items[i]);  
             }
             ul.innerHTML = output;
             o.parentNode.insertBefore(ul,o.nextSibling);
             o.removeChild(o.lastChild);
             document.getElementById(outputid).getElementsByTagName("a")[0].focus();
    };
 
    function failure() {
             window.clearInterval(lastfm.to);
             window.location = o.getAttribute('href');             
    };
 
    return {init: init,retrieveData: retrieveData, failure: failure};
})(GIB.util.Event,GIB.util.Script);
