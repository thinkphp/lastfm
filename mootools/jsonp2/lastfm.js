   var Lastfm = new Class({

       options: {
           title: '',  
           limit: 5,
           header: true,
           artist: true,
           name: true,
           playcount: true,
           showerror: true,
           imagesize: 'medium',
           image: true,
           noimage: '',
           date: true,
           where: 'lastfm'  
       },

       Implements: [Options,Events],

       initialize: function(username, display, apikey, options) {

               var method = undefined;  

               this.setOptions(options);  

               if(display == 'lovetracks') {

                   method = 'user.getLovedTracks';
                   this.options.title = ''; 
               } else if(display == 'recenttracks') {

                   method = 'user.getRecentTracks';  
                   this.options.title = 'Recent Tracks'; 
               } else if(display == 'topalbums') {

                   method = 'user.getTopAlbums';
                   this.options.title = 'Top Albums'; 
               }  else if(display == 'topartists') {

                   method = 'user.getTopArtists';
                   this.options.title = 'Top Artists'; 
               }  else if(display == 'toptracks') {

                   method = 'user.getTopTracks';
                   this.options.title = '';
               }

               if(method == undefined) {
                   return
               }
               //create API Last.fm
               var api = 'http://ws.audioscrobbler.com/2.0/?method='+ method +'&user='+ username +'&api_key='+ apikey +'&limit='+ this.options.limit +'&format=json';

               //make request with AJAX 
                      new Request.JSONP({

                          url: api,

                          data: {format: 'json',
                                 diagnostics: false
                          },

                          onRequest: function(){

                                 if(window.console) {console.log('Requesting...');}
                                 this.fireEvent('request'); 

                          }.bind(this),

                          onComplete: function(data) {

                                 if(window.console) {console.log('Completed!');}

                                 this.fireEvent('complete'); 

                                 if(display == 'lovetracks') {

                                    this._callback(display,data.lovedtracks.track);
                                 } else if(display == 'recenttracks') {

                                    this._callback(display,data.recenttracks.track);
                                 } else if(display == 'topalbums') {

                                    this._callback(display,data.topalbums.album);
                                 }  else if(display == 'topartists') {

                                    this._callback(display,data.topartists.artist);
                                 }  else if(display == 'toptracks') {

                                    this._callback(display,data.toptracks.track);
                                 }

                          }.bind(this)
                      }).send();                   

       },

       _callback: function(display, data) {

              var html = '',
                  row = 'odd';
         
              //added header is required.
              if(this.options.header) {
                 html += '<div class="lastFMHeader">' + this.options.title + '</div>';  
              }

              //added feed container
              html += '<div class="lastFMBody ' + display + '">'; 

              if(data) {

                html += '<ul>';

                var n = data.length;
                if(n>this.options.limit) n = this.options.limit;

                for(var i=0;i<n;i++) {

                   //get individual object
                   var item = data[i];

                   html += '<li class="itemRow '+ row + '">';  

                   var name = item.name,
                       url = item.url,
                       artist = '',
                       imageurl = '',
                       playcount = null;    

                   if(display == 'lovetracks' || display == 'topalbums' || display == 'toptracks') {

                     artist = '<a href="'+ this._getSafeURL(item.artist.url) +'" title="More about '+ item.artist.name +' on Last.FM">'+ item.artist.name +'</a>';

                   } else if(display == 'topartists') {
 
                     artist = item.name; 

                   } else {

                     artist = item.artist['#text']; 
                   }

                   if(this.options.image) {

                      if(item.image) {

                         //get image index
                         if(this.options.imagesize == 'small') {

                             var imageindex = 0;  
                         } else if (this.options.imagesize == 'medium'){

                             var imageindex = 1;  
                         } else if(this.options.imagesize == 'large') {

                             var imageindex = 2;  
                         } else if(this.options.imagesize == 'extralarge') {

                             var imageindex = 3;  
                         }

                         imageurl = this._getSafeURL(item.image[imageindex]['#text']);
                      }

                      if(imageurl == '') {
                         imageurl = this.options.noimage;  
                      } 
                      if(imageurl != '') {
                         html += "<a href='"+ url +"' title='Listen to "+ item.name +"'><img src='"+imageurl+"' alt='"+ item.url +"' /></a>";
                      }
                   } 

				// Add name
				if (this.options.name) html += '<div class="itemName"><a href="'+ url +'" title="Listen to '+ item.name +' on Last.FM">'+ item.name +'</a></div>'

				// Add artist
				if (this.options.artist) html += '<div class="itemArtist">'+ artist +'</div>';

                        //add playcount
                        if (display == 'topalbums' || display == 'topartists' || display == 'toptracks') playcount = item.playcount;

				// Add play count
				if (this.options.playcount && playcount != null) html += '<div class="itemPlaycount">'+ playcount +' plays</div>'

                        if(item.date) {
                           var time = item.date['#text']; 
                           if(this.options.date) html += '<div class="time">'+ time +'</div>'
                        }

                   html += '</li>';

                   if(row == 'odd') {row = 'even';} else {row = 'odd';}                   

                }//endfor       
 
                html += '</ul>';

              } else {

                html += "<p>No tracks to display!</p>";
              }

              html += '</div>'; 
              this.css('lastfm.css'); 
              $(this.options.where).set('html',html); 
       },

       _getSafeURL: function(u) {

            var url = u;
            if(url != '' && url.substring(0,7) != 'http://') { 
                 url = 'http://' + u;
            }
           return url;
       },

       css: function(source) {

            var link = new Element('link',{
                rel: 'stylesheet',
                media: 'screen',
                type: 'text/css',
                href: source 
            });

          return link.inject(this.options.where,'after');  
       }
   }); 
