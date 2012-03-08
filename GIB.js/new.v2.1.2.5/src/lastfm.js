Function.prototype.bind = function(object) {

            var method = this;

            return function() {

                   return method.apply(object,arguments);
            };
};

var $ = GIB.util.Dom.$;

function LastFM(options) {

    //public data members

    this.username = 'thinkphp';

    this.outputid = null;

    this.badgeid = 'badge';

    this.badgeclass = 'lastfm';

    this.amount = 10;

    //fire events request
    req = function(){};

    //fire events complete||success
    success = function(){};

    //template output
    this.tpl = "<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>";

    //object for EventManager
    this.evt = new EventManager();

        if(typeof options == 'object') {

               if(typeof options.onRequest === 'function') {
                      req = options.onRequest;  
               } 
               if(typeof options.onSuccess === 'function') {
                      success = options.onSuccess;  
               } 

               if(typeof options.username !== 'undefined') {
                      this.username = options.username; 
               }

               if(typeof options.where !== 'undefined') {
                      this.outputid = options.where; 
               }

               this.badgeid = this.badgeid + (new Date().getTime());

               //add custom event onRequest
               this.evt.addListener('request', req);

               //add custom event onComplete
               this.evt.addListener('complete', success);

               this.callData();

        }//endif
};


 
   LastFM.prototype.callData = function() {

         if($(this.outputid)) {

             var self = this;

             this.evt.fireEvent('request');

             var user = this.username;

             window.seed = this.retrieveData.bind(this);

             var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json";
            
             GIB.util.Request.AJAX("GET",url,function(data){

                    this.retrieveData(eval('('+data+')'));

             }.bind(this));
         }
    };


    LastFM.prototype.retrieveData = function(dataset) {

             if(dataset.query.results !== null) {

                this.displayData(dataset);

             } else {

                this.handleError();
             }
    };

    LastFM.prototype.displayData = function(dataset) {

         this.evt.fireEvent('complete',[dataset]);

         var out = $(this.outputid);

         var items = dataset.query.results.item, 
             n = items.length, 
             output = '',
             ul = document.createElement('ul');

             ul.id = this.badgeid;
             ul.className = this.badgeclass; 

             for(var i=0;i<n;i++) {
                 output += template(this.tpl,items[i]);  
             }

             ul.innerHTML = output;

             out.appendChild(ul);

             $(this.outputid).getElementsByTagName("a")[0].focus();
    };
 
    LastFM.prototype.handleError = function() {

             $(this.outputid).innerHTML = '<div class="error">User Not Found.</div>' 
    };
