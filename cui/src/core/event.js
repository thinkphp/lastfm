/**
 * The cui event facilities the creation of event-driven app in the browser.
 * Provides a flexible method of binding/unbinding an event handler to one or more elements.
 */

if( !cui.event ) {

     cui.event = function(){

         return {  

           bind: function(elem, evType, fn, useCapture) {

                  if(elem.addEventListener) {

                    return elem.addEventListener(evType, fn, useCapture)
  
                  } else if(elem.attachEvent) {
 
                        var _fn = function(){ fn.call(elem, window.event); }

                        var r = elem.attachEvent('on'+evType, _fn)

                        elem[ fn.toString() + evType ] = _fn
   
                     return r;

                  } else {

                     elem['on'+evType] = fn
                  }    
            },

            unbind: function(elem,evType,fn,useCapture) {

                  if(elem.addEventListener) {

                     return elem.removeEventListener(evType, fn, useCapture)

                  } else if(elem.detachEvent) {

                     return elem.detachEvent('on'+evType, elem[fn.toString() + evType])

                     elem[ fn.toString() + evType ] = null

                  } else {

                     elem[ 'on' + evType ] = function(){}
                  } 
            },    

            stopPropagation: function( e ) {

                  if(window.event) {

                     window.event.cancelBubble = true

                     window.event.returnValue = false 
                  }   

                  if(e.preventDefault && e.stopPropagation) {

                     e.preventDefault()

                     e.stopPropagation()  
                  }
            },

            getTarget: function( evt ) {

                  var target = window.event ? window.event.srcElement : evt ? evt.target : null  

                  while(target.nodeType != 1 && target.nodeName.toLowerCase() != 'body') {

                        target = target.parentNode
                  }  
 
                  if( !target ) return false

                  return target;
            }
      };
}()

}//endif

HTMLElement.prototype.Click = function( fn ) {

       cui.event.bind(this, 'click', fn, false)
} 