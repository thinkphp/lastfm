Function.prototype.bind = function(object) {

            var method = this;

            return function() {

                   return method.apply(object,arguments);
            };
};

var $ = function( id ) { return cuba.grab( id )};

function LastFM(options) {

    //@public vars
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
    this.evt = cuba.util.CustomEvent;

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
               this.evt.addEvent('request', req);

               //add custom event onComplete
               this.evt.addEvent('complete', success);

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
            
             cuba.ajax("GET", url, function(data){

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

         //fire Event when completed
         this.evt.fireEvent('complete',[ dataset ]);

         var out = $(this.outputid);

         //grab item from server
         var items = dataset.query.results.item, 
 
             //compute the lenght
             n = items.length, 

             //define an output
             output = '',

             //create an element UL
             ul = document.createElement('ul');

             //set an id
             ul.id = this.badgeid;

             ul.className = this.badgeclass; 

             for(var i=0;i<n;i++) {

                 output += cuba.template(this.tpl,items[i]);  
             }

             ul.innerHTML = output;

             //empty container
             out.innerHTML = "";

             //then, append child to the container
             out.appendChild(ul);

             //end focus on the first link
             $(this.outputid).getElementsByTagName("a")[0].focus();
    };
 
    LastFM.prototype.handleError = function() {

             $(this.outputid).innerHTML = '<div class="error">User Not Found.</div>' 
    };

    HTMLElement.prototype.lastfm = function(options) { 

         var username = options.username || 'thinkphp',

             where = this.id; 

          new LastFM({username: username, where: where,

                           onRequest: function(data){

                                $(where).innerHTML = "<span class='loading'>Loading...</span>";
                           }
          });
    };
