var lastfm = (function($event,$$){
 
    //configuration
    var input = 'username',
        outputid = 'result',
        badgeid = 'badge',
        user = null, 

    //amount of tracks
    amount = 10, 

    //timeout
    timeoutdelay = 1000,

    //store the link that was linked
    o = null,

    //store the button
    f = 'f',

    $ = function(id) {return document.getElementById(id);}, 

    //fire events request
    req = function(){},

    //fire events complete||success
    success = function(){},  

    //template output
    tpl = "<li><a href='{link}'>{title}</a> <span>{pubDate}</span></li>";

    function init(options) {

        if($(input)) {
               o = $(input);
               f = $(f);
               if(typeof options.onRequest === 'function') {
                      req = options.onRequest;  
               } 
               if(typeof options.onSuccess === 'function') {
                      success = options.onSuccess;  
               } 
               $event.addListener(f,'submit',callData,false);
        }//endif
    };

    function callData(evt) {

         if(document.getElementById(outputid)) {

             //fireEvent custom event request
             req();

             lastfm.to = window.setTimeout("lastfm.failure()",timeoutdelay);

             user = o.value;

             var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json&diagnostics=true&callback=lastfm.retrieveData";

             $$.Script(url,function(){
                 //select * from html where url="http://www.last.fm/user/name" and xpath="//div[@class='clearit user vcard']";
                 var url2 = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.last.fm%2Fuser%2F"+ user +"%22%20and%20xpath%3D%22%2F%2Fdiv%5B%40class%3D'clearit%20user%20vcard'%5D%22&format=xml&diagnostics=true&callback=lastfm.profile";
                 $$.Script(url2, function(){});
             }); 

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

         //fireEvent custom event success complete and passed dataset from service
         success(dataset);

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

    function profile(p) {
console.log(p);
             var r = 'id="hcard-' + user + '"';
             var profile = p.results[0].replace(r,'id="userBadge"').replace(/href="\//gi,'href="http://www.last.fm/'); 
             $('profile').innerHTML = profile;
    }
    return {init: init,retrieveData: retrieveData, failure: failure, profile: profile};
})(GIB.util.Event,GIB.util.Script);

