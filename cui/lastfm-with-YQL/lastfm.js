var $ = function(id) { return cui.dom.select( id ) }

function LastFM(options) {

    //@public properties
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

    //object for CustomEvent
    this.evt = cui.CustomEvent;

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

         if($('#'+this.outputid )) {

             var self = this;

             this.evt.fireEvent('request');

             var user = this.username;

             this.q = 'select * from rss where url="http://ws.audioscrobbler.com/1.0/user/'+ user +'/recenttracks.rss"';
         }
    };

    LastFM.prototype.get = function(dataset) {

             cui.yql(this.q, function(data){

                  this.retrieveData( data )

             }.binding(this))
        
    };   

    LastFM.prototype.retrieveData = function(dataset) {

             if(dataset.query.results !== null) {

                this.displayData( dataset );

             } else {

                this.handleError();
             }
    };

    LastFM.prototype.displayData = function(dataset) {

         this.evt.fireEvent('complete', [ dataset ]);

         var out = $('#'+this.outputid);

         var items = dataset.query.results.item, 

             n = items.length, 

             output = '',

             ul = document.createElement('ul');

             ul.id = this.badgeid;

             ul.className = this.badgeclass; 

             for(var i=0;i<n;i++) {

                 output += cui.template(this.tpl,items[i]);  
             }

             ul.innerHTML = output

             out.innerHTML = ""

             out.appendChild( ul )

             $("#" + this.outputid).getElementsByTagName("a")[0].focus();
    };
 
    LastFM.prototype.handleError = function() {

             $(this.outputid).html('<div class="error">User Not Found.</div>') 
    };

