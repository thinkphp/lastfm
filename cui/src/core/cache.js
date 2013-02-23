if(!cui.cache)

cui.cache = function() {

     //@private 
     var storage = window.localStorage,
         prefix  = 'cui.cache # ';

     //@public
     return {

      expiry: 60*60*1000,

      set: function( key, value, expiry ) {

          this.expiry = expiry || this.expiry || 1e5

          //get time now
          var time = new Date().getTime(),

              ob = JSON.stringify({ data: value, expiry: time });
 
              storage.setItem(prefix + key, ob)
          
        return [key, value]
      },

      get: function( key, callback ) {

          var key = prefix + key,
 
              curr = storage.getItem( key );

              if( curr ) {

                  var ob = JSON.parse( curr )

                  if( (new Date().getTime()) - ob.expiry < this.expiry ) {

                     return ob.data
 
                  } else {

                     return false
                  } 
              }
      },
     
      remove: function( key ) {

             var key = prefix + key;
          
             storage.removeItem( key )

        return key;
      }
   };
}();
