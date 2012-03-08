var Lastfm = new Class({

               /*Implements*/
               Implements: [Events,Options],

               /*options*/
               options: {
                   username  : 'thinkphp',
                   where     : 'result',
                   badgeid   : 'badge',
                   badgeclass: 'lastfm',
                   amount    : 10  
               },

               /*costructor of class*/
               initialize: function(options) {
                       //mix the options
                       this.setOptions(options);

                       //template output 
                       this.tpl = "<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>";

                       //define badge id output
                       this.badgeid = this.options.badgeid + (+new Date().getTime()); 
 
                       //called the method for action
                       this._callData(); 
               },

               _callData: function() {
                   
                      //define the username
                      var user = this.options.username, 
                      srcurl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22";
                      //make request
                      new Request.JSONP({
                          url: srcurl,
                          data: {format: 'json',
                                 diagnostics: false
                          },
                          onRequest: function(){
                                 if(window.console) {console.log('Requesting...');}
                                 this.fireEvent('request'); 
                          }.bind(this),
                          onComplete: function(data) {
                                 if(window.console) {console.log('Completed!');}
                                 this._retrieveData(data);
                          }.bind(this)
                      }).send();                   
               },

               _retrieveData: function(dataset) {
                     //if we have the results from service then display them.
                     if(dataset.query.results !== null) {
                         this._displayData(dataset);
                     //otherwise error
                     } else {
                         this._handleError();
                     }
               },

               _displayData: function(dataset) {

                     //fire custom event complete
                     this.fireEvent('complete',[dataset]);
                     //get target container 
                     var out = $(this.options.where),
                         //get items
                         items = dataset.query.results.item, 
                         //get number of items
                         n = items.length, 
                         //init output is empty
                         output = '',
                         //create an element ul with id specified
                         ul = new Element('ul', {id: this.badgeid, class: this.options.badgeclass});
                         //loop through items and build the output
                         for(var i=0;i<n;i++) {
                             output += this.tpl.substitute(items[i]);
                         }
                         //flush output
                         ul.set('html',output);
                         //append to the container target
                         out.appendChild(ul);
                         //focus on the first anchor
                         $(this.options.where).getElements("a")[0].focus();

                },
               _handleError: function() {
                         $(this.options.where).set('html','<span><b>User Not Found</b></span>'); 
               }  
}); 

Element.implement({
        lastfm: function(opts) {
                var where = this.id,
                    username = opts.username; 
                new Lastfm({username: username,
                            where: where,
                            onRequest: function() { 
                                 $(where).set('text','Loading...'); 
                            },
                            onComplete: function() {
                                 $(where).set('text',''); 
                            }
                });
        }
});