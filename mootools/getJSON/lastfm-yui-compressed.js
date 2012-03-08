/*
---
description: This plugin will get the recent tracks from a last.fm account and it produces structured HTML with in-build CSS classes for styling.

authors:
- Adrian Statescu (http://thinkphp.ro)

license:
- MIT-style license

requires:
 core/1.4.1: '*'

provides: Lastfm
...
*/

var Lastfm=new Class({Implements:[Events,Options],options:{username:'thinkphp',where:'result',badgeid:'badge',badgeclass:'lastfm',amount:10},initialize:function(options){this.setOptions(options);this.tpl="<li><a href='{link}'>{title}</a> <div>{pubDate}</div></li>";this.badgeid=this.options.badgeid+(+new Date().getTime());this._callData()},_callData:function(){var user=this.options.username;new Request.JSON({url:'proxy.php',onRequest:function(){if(window.console){console.log('Requesting...')}this.fireEvent('request')}.bind(this),onSuccess:function(data){if(window.console){console.log('Completed!')}this._retrieveData(data)}.bind(this)}).get({user:user})},_retrieveData:function(dataset){if(dataset.query.results!==null){this._displayData(dataset)}else{this._handleError()}},_displayData:function(dataset){this.fireEvent('complete',[dataset]);var out=$(this.options.where),items=dataset.query.results.item,n=items.length,output='',ul=new Element('ul',{id:this.badgeid,class:this.options.badgeclass});for(var i=0;i<n;i++){output+=this.tpl.substitute(items[i])}ul.set('html',output);out.appendChild(ul);$(this.options.where).getElements("a")[0].focus()},_handleError:function(){$(this.options.where).set('html','<span><b>User Not Found</b></span>')}});Element.implement({lastfm:function(opts){var where=this.id,username=opts.username;new Lastfm({username:username,where:where,onRequest:function(){$(where).set('text','Loading...')},onComplete:function(){$(where).set('text','')}})}});