var Lastfm = Class.create({
  
    initialize: function(extra) {

        //config object
        this.settings = {
                   //set up username
                   username  : 'thinkphp',
                   //define the container where to inject the badge
                   where     : 'result',
                   //define badge ID
                   badgeid   : 'badge',
                   //define badge class
                   badgeclass: 'lastfm',
                   //define number of tracks
                   amount    : 10
        };
        //mixin options
        if(extra) {
           Object.extend(this.settings, extra); 
        };

        //template output 
        this.tpl = "<li><a href='#{link}'>#{title}</a> <div>#{pubDate}</div></li>";

        //define badge id output
        this.badgeid = this.settings.badgeid + (+new Date().getTime()); 
 
        //called the method for action
        this._callData(); 
    },

    _callData: function() {
                   
                      //get the actual username
                      var user = this.settings.username, 

                      //define API URL Endpoint
                      proxy = "proxy.php";

                      //make request
                      new Ajax.Request(proxy,{

                          method: 'get',

                          parameters: {user: user},

                          requestHeaders: {Accept: 'application/json'},

                          onSuccess: function(transport) {

                            this._retrieveData(transport.responseText.evalJSON(true));

                          }.bind(this)
                      });
                       
    },

    /**
     * @private method
     * @param Object JSON the data from service LastFM  
     */
    _retrieveData: function(dataset) {

                     //if we have the results from service then display them.
                     if(dataset.query.results !== null) {
                         //display and append the badge to the container
                         this._displayData(dataset);

                     //otherwise handle the error
                     } else {
                         this._handleError();
                     }
    },
    /**
     * @private method
     * @param Object JSON the data from service LastFM  
     */
    _displayData: function(dataset) {

                     //get target container
                     var out = $(this.settings.where),

                         //get items
                         items = dataset.query.results.item, 

                         //get number of items
                         n = items.length,

                         //init output is empty
                         output = '',

                         //create an element ul with id specified
                         ul = new Element('ul', {'id': this.badgeid, 'class': this.settings.badgeclass}),

                         myTemplate = new Template(this.tpl);
 
                         //loop through items and build the output
                         for(var i=0;i<n;i++) {

                             output += myTemplate.evaluate(items[i]);
                         }

                         //flush output
                         ul.innerHTML = output;

                         //append to the container target
                         out.appendChild(ul);
                         
                         //focus on the first anchor
                         $$("#"+this.settings.where+" a")[0].focus();

    },
    /**
     * @private method
     */
    _handleError: function() {
                         $(this.settings.where).set('html','<span><b>User Not Found</b></span>'); 
    }
});

Element.addMethods({

       lastfm: function(element,opts) {
                var where = element.id,
                    username = opts.username; 

                new Lastfm({username: username,
                            where: where
                });
        }
 
});