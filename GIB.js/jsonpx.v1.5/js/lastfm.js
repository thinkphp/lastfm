var lastfm = (function($){
    var endpoint, 
        GET = function(id){return document.getElementById(id);}, 
        user;
    function init() {
        user = 'olivboy';
        endpoint = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.last.fm%2Fuser%2F"+ user +"%22%20and%20xpath%3D%22%2F%2Fdiv[%40id%3D%27recentTracks%27]%22&format=xml&diagnostics=true&callback=lastfm.seed";
        $.Script(endpoint,function(){});
    };
    function seed(o) {
             var res = o.results[0].replace(/<script[^>]*?>[\s\S]*?<\/script>/gi,'');
                 res = res.replace(/href="/gi,'href="http://www.last.fm'); 
             GET('lastfm').innerHTML = res;
    }
    return {init: init,seed: seed};
})(GIB.util.Script);
GIB.util.Event.domReady(function(){lastfm.init();});
