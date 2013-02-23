;(function(context, name){

  var _template = function(tmp, ob) {

      return tmp.replace((RegExp("{([^{}]*)}","gi")), function(tag, prop){

             return ob[prop]
      })
  } 

  context[ name ] = _template

})(cui, "template");
