from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.api import urlfetch
import urllib2
import json
import logging
import cgi

LASTFM_API_URL = 'http://ws.audioscrobbler.com/2.0'

API_KEY = '2993c6e15c91a2890c2f11fa95673067'

def get_recent_tracks(user):

    values = {'url':LASTFM_API_URL,'method':'user.getrecenttracks','user': user,'api_key': API_KEY}

    url = "%(url)s/?method=%(method)s&user=%(user)s&api_key=%(api_key)s&format=json" % values

    try:
        response = urlfetch.fetch(url)
        resp = json.loads(response.content)
    except Exception, e:
        logging.warning('lastfm') 
        return None

    recent_tracks = resp['recenttracks']
    raw_tracks = recent_tracks['track']
    tracks = []
    for raw_track in raw_tracks:
        try:
           imgsrc = raw_track['image'][0]["#text"] 
           if imgsrc == "":
              imgsrc = "http://cdn.last.fm/flatness/catalogue/noimage/2/default_artist_small.png"
           track = {
                   'name': raw_track['name'],
                   'artist': raw_track['artist']['#text'],
                   'url': raw_track['url'],
                   'image_url': imgsrc
                   }
           tracks.append(track)
        except Exception, e:
            logging.warning('last.fm');

    return tracks

class MainPage(webapp.RequestHandler):

  def get(self):
    self.response.headers['Content-Type'] = 'text/html'
    self.response.out.write('<html><body><head><link rel="stylesheet" type="text/css" href="css/lastfm.css" /></head>')
    self.response.out.write("""
         <div id="doc" class="yui-t7">
           <div id="hd" role="banner"><h1><img src="css/logo.jpg"/></h1></div>
           <div id="bd" role="main">
           <div class="yui-g">
            <form action="/last" method="post">
              <div><label for="username">Enter User</label><input type="text" name="username" id="username"/>
                   <input type="submit" value="Get Recent Tracks from Last.fm"></div>
            </form>
           <div id="result"></div>
           </div>
           </div>
           <div id="ft"><p>Created by @<a href="http://twitter.com/thinkphp">thinkphp</a> download on <a href="http://github.com/thinkphp/mylastfm2">GitHub</a></p></div>
         </div>
        </body>
      </html>""")

class Controller(webapp.RequestHandler):

      def post(self):
        self.response.out.write('<html><head><link rel="stylesheet" type="text/css" href="css/lastfm.css" /></head><body><h1>Recently Listened Tracks:</h1>')
        self.response.out.write(cgi.escape(self.request.get('username')))
        user = cgi.escape(self.request.get('username'))
        tracks = get_recent_tracks(user)
        out = '<ul>'  
        for track in tracks:    
            out += '<li class="tweetBox"><img src="'+track['image_url']+'" /><a href="'+ track['url'] +'">'+track['artist']+' '+track['name']+'</a></li>'
        out += '</ul>'
        self.response.out.write(out)
        self.response.out.write('</body></html>')

application = webapp.WSGIApplication([
  ('/', MainPage),
  ('/last', Controller)
], debug=True)


def main():
    run_wsgi_app(application)

if __name__ == '__main__':
  main()



