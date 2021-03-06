/*
---
description: Get the Top Artists or Recently Listened Tracks Last.fm.

license: MIT-style

authors:
- Adrian Statescu

requires:
- Dojo 1.6 Dijit Dojox
*/ 

           dojo.require('dijit.form.Button');
           dojo.require('dijit.Dialog');
           dojo.require('dijit.form.ValidationTextBox');
           dojo.require("dijit.form.CheckBox");
           dojo.require('dojo.io.script');

           dojo.addOnLoad(function(){

                var loadBtn = dijit.byId("loadBtn"),
                    //get the username to fetch top artists or recently listened tracks
                    userDialog = dijit.byId("userDialog"),
                    okBtn = dijit.byId("okBtn"),
                    userText = dijit.byId("userTxt"),
                    periods = {'7day': 'Last 7 days','3month': 'Last 3 months',
                               '6month': 'Last 6 months','12month': 'Last 12 months','overall': 'Overall'};

                    dojo.connect(loadBtn,"onClick", function(){
                         userDialog.show();
                    }); 

                    dojo.connect(dijit.byId("mycheck"), "onClick", function(){

                         if(this.attr("value") == "agreed") {
                                 dojo.query("input[type=radio]").forEach(function(radio){
                                      radio.disabled = 'disabled';
                                 });
                         } else {
                                 dojo.query("input[type=radio]").forEach(function(radio){
                                      radio.disabled = false;
                                 });
                         } 
                    });

                    function getRadioChecked() {
                         var radios = dojo.query("input[type='radio']"),
                             n = radios.length;
                             for(var i=0;i<n;i++) {
                                 if(radios[i].checked) {
                                    return radios[i].value; 
                                 } 
                             } 
                    }

                    dojo.connect(okBtn,"onClick", function(){

                             userDialog.hide();  

                             var out = dojo.byId("output");
                                 out.innerHTML = "Loading...";
                            
                             var checked = dijit.byId('mycheck').attr('value'),

                                 //method used
                                 method = checked ? "getrecenttracks" : "gettopartists",

                                 //you can stipulate a time period
                                 period = getRadioChecked();

                                 if(!checked) { dojo.byId("period").innerHTML = "Showing:" + periods[period];}
                                           else 
                                              { dojo.byId("period").innerHTML = "Recently Listened Tracks";} 

                             //make a request jsonp
                             dojo.io.script.get({

                                  url: 'http://ws.audioscrobbler.com/2.0/?method=user.'+method+'&format=json',

                                  content: {
                                     user: userText.getValue(),

                                     //the Last.fm API key
                                     api_key: 'b25b959554ed76058ac220b7b2e0a026',
                                     period: period,
                                     limit: 10 
                                  },

                                  callbackParamName: 'callback',

                                  timeout: 8000,

                                  load: function(resp) {

                                      switch(method) {
                                       
                                        case 'getrecenttracks': 

                                        resp = resp.recenttracks.track;
                                        out.innerHTML = '';


                                        dojo.forEach(resp, function(track){

                                             track = JSON.stringify(track);
                                             track = track.replace(/#text/gi,'text');
                                             track = JSON.parse(track);
 
                                             if(window.console) console.log(track);

                                             if(typeof track.date === 'object') {
                                                  var date = track.date.text; 
                                             } else { var date = '<b>Listening now</b>';}

                                             var content = '<a href="'+ track.url +'">' +
                                                            track.artist.text + '' + 
                                                            track.name + 
                                                            '</a> <span class="date">' + 
                                                            date + '</span>';

                                             var elem = dojo.create('div',{innerHTML: content, 'class': 'tweetBox'});

                                             var image = dojo.create('img',{src: track.image[1].text});

                                                 dojo.place(image,elem,'first');

                                                 dojo.place(elem,out,'last');                                              
                                        });
                                        break;

                                        case 'gettopartists': 

                                        console.log(resp);
                                        
                                        resp = resp.topartists.artist;
                                        out.innerHTML = '';

                                        dojo.forEach(resp, function(artist){

                                             artist = JSON.stringify(artist);
                                             artist = artist.replace(/#text/gi,'text');
                                             artist = JSON.parse(artist);

                                             var content = "<a href='"+artist.url+"'>" + artist.name +"</a>" + " <span><a href='#'>(" + artist.playcount+ " plays)</a></span>";

                                             var elem = dojo.create('div',{innerHTML: content, 'class': 'tweetBox'});

                                             var image = dojo.create('img',{src: artist.image[1].text});

                                                 dojo.place(image,elem,'first');

                                                 dojo.place(elem,out,'last');                                              
                                        });

                                        dojo.query(".tweetBox").style('width','480px')

                                        break;


                                        }//endswitch
                                  },
                                  error: function(e) {
                                         out.innerHTML = 'Error retrieving tracks: ' + e;
                                  },
                                  preventCache: true,
                                  handleAs: 'json'
                             });

                    });
  
                    //show the main form now that parsing and 
                    //event handling is setup
                    dojo.byId("main").style.display = '';
           }); 
