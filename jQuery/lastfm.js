/**
 * Plugin: jquery.lastfm
 * 
 * Version: 1.0.0
 * (c) Copyright 2011, Adrian Statescu
 * 
 * Description: jQuery Plugin for recently listened tracks
 * 
 *
 **/

!function(win){var template = function(tmp,o){ return tmp.replace((RegExp("{([^{}]*)}","gi")), function(tag,p){return o[p];});};win['template'] = template;}(this);

(function($){

     $.fn.lastfm = function(options) {

          var defaults = {
                   username  : 'thinkphp',
                   where     : 'result',
                   badgeid   : 'badge',
                   badgeclass: 'lastfm',
                   amount    : 10,
                   tpl       : "<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>"
          };

          var options = $.extend(defaults, options);

          return this.each(function(i,e){

                 $e = $(e);

                 //define badge id output
                  options.badgeid = options.badgeid + (+new Date().getTime()); 
                  
                 //define the username
                  var user = options.username, 
                      api  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20rss%20where%20url%3D%22http%3A%2F%2Fws.audioscrobbler.com%2F1.0%2Fuser%2F" + user + "%2Frecenttracks.rss%22&format=json";
                    $.ajax({
				type: 'GET',
				url: api,
				dataType: 'json',
				success: function(data) {
                              if(data) {
                                 if(window.console) {console.log('Completed!');}
                                 _displayData(data,e);
                              }
                        }
                    });
          });

          function _displayData(dataset,e) {

                     var $e = $(e); 

                     var markup = options.tpl;

                     //get target container 
                     var out = (e),
                         //get items
                         items = dataset.query.results.item, 

                         //get number of items
                         n = items.length, 

                         //init output is empty
                         output = '',

                         //create an element ul with id specified
                         ul = $("<ul/>", {class: options.badgeclass, id: options.badgeid});

                         //loop through items and build the output
                         for(var i=0;i<n;i++) {

                             output += template(markup,items[i]);
                         }
                         //flush output
                         ul.html(output)


                         //append to the container target
                         $e.append(ul);
          };
     }

})(jQuery);

