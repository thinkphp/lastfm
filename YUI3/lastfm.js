YUI.add('basic-plugin', function(Y) {

        Y.namespace('Widgets').Lastfm = Y.Base.create("Lastfm", Y.Plugin.Base, [], {
            
            _handle : null,
            
            initializer : function() {

                  this._handle = this.get("host");

                var options = {
                     username  : 'thinkphp',
                     where     : 'result',
                     badgeid   : 'badge',
                     badgeclass: 'lastfm',
                     amount    : 10  
                },
              
                //template output 
                tpl = "<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>",
  
                //define badge id output
                badgeid = options.badgeid + (+new Date().getTime()); 

                options.where = this._handle.get('id');

                options.username = this._handle.getAttribute('class');

                Y.one("#"+options.where).set("innerHTML","Loading...");

                //called the method for action
                _callData();

             /*
              *
              * @private method
              *
              */
             function _callData() {
                      //define the username
                      var user = options.username, 

                          api  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json";

                      Y.jsonp(api + '&callback={callback}',handleJSONP);          
             };

             /*
              *
              * @private method
              *
              */
             function handleJSONP(data) {

                 _retrieveData(data);

             }//end function 


             /*
              *
              * @private method
              *
              */
             function _retrieveData(dataset) {

                     //if we have the results from service then display them.
                     if(dataset.query.results !== null) {

                         _displayData(dataset);

                     //otherwise error
                     } else {
                         _handleError();
                     }
               };

              /**
               *
               * @private method
               *
               */
               function _displayData(dataset) {

                     //get target container 
                     var out = Y.one("#"+options.where),

                         //get items
                         items = dataset.query.results.item, 

                         //get number of items
                         n = items.length, 

                         //init output is empty
                         output = '';

                         out.set("innerHTML","");

                         //create an element ul with id specified
                         var ul = Y.Node.create("<ul class='"+options.badgeclass+"' id='"+options.badgeid+"'></ul>");
                     
                         //loop through items and build the output
                         for(var i=0;i<n;i++) {
                             output += template(tpl,items[i]);
                         };

                         //flush output
                         ul.set("innerHTML", output);

                         //append to the container target
                         out.appendChild(ul);

                         //focus on the first anchor of container
                         var done = Y.one("#"+options.where+" a");

                         done.focus();  

               };

              /**
               *
               * @private method
               *
               */
               function _handleError() {
                         Y.one('#'+options.where).set('innerHTML','<span><b>User Not Found</b></span>'); 
               };

            },
            
            destructor : function() {

                this._handle.detach();                
                this._handle = null;
            }
        },
        {
            NS : "bp",
            ATTRS : {
                color : { value : "#00F" }
            }
        });

    }, "0.1", { requires : [ "base", "plugin", "node", "jsonp"] });
