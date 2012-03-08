Ext.override(Ext.Element, {

    lastfm: function(username) {

            new Lastfm(username,this.id);
    }
});

function Lastfm(username,where){
  
              var options = {
                   username   : 'thinkphp',
                   where      : 'result',
                   badgeid    : 'badge',
                   badgeclass : 'lastfm',
                   amount     : 10  
               };

               options.username = username || options.username;
               options.where = where || options.where;

               //template for widget
               var tpl = "<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>",

               //define badge id output
               badgeid = options.badgeid + (+new Date().getTime()); 
 
               //called the method for action
               _callData(); 

               function _callData() {
                   
                      //define the username
                      var user = options.username;

                      Ext.Ajax.request({
                          url : 'proxy.php' , 
                          params : { user : user },
                          method: 'GET',
                          success: function ( result, request ) {
                             _retrieveData(eval('('+result.responseText+')'));
                          },
                          failure: function ( result, request) { 
                             _handleError();
                          } 
                      });
               };

               var _retrieveData = function(dataset) {

                     //if we have the results from service then display them.
                     if(dataset.query.results !== null) {
                         _displayData(dataset);
                     //otherwise error
                     } else {
                         this._handleError();
                     }
               };


               function _displayData(dataset) {

                     //get target container 
                     var out = Ext.get(options.where),

                         //get items
                         items = dataset.query.results.item, 

                         //get number of items
                         n = items.length, 

                         //create an element ul with id & class specified!!!
                         ul = Ext.DomHelper.append(out, {tag: 'ul', 
                                                         id: badgeid, 
                                                         cls: options.badgeclass});

                         //loop through items and build the output
                         var t = new Ext.Template(tpl);

                         for(var i=0;i<n;i++) {
                                 t.append(ul, items[i]); 
                         }

                };

               function _handleError() {
                         Ext.get(options.where).innerHTML = '<span><b>User Not Found</b></span>'; 
               };             
}
