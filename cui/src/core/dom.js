/**
 * @class dom
 * @static
 * @namespace cui
 */

if(!cui.dom)

cui.dom = {

    selectAll: function( selector ) {
 
            return Array.prototype.slice.call( (node||document).querySelectorAll( selector ) )
    },

    select: function( selector, node ) {
 
            return (node||document).querySelector( selector )
    },

    each: function(arr, fn) {

          var len = arr.length,

              index;

              for(index = 0; index < len; index++) {

                  fn.call(this, arr[ index ], index, arr)
              }

         return arr
    },

    some: function(arr, fn, scope) {
          
          for(var i = 0, j = arr.length; i < j; i++) {

              if( fn.call(scope, arr[i], i, arr) ) {

                  return true 
              }
          }  

        return false  
    },

    getStyle: document.defaultView && document.defaultView.getComputedStyle ? function(elem, property) {

               var value = null;

               if(property == 'float') { property = 'cssFloat';}      

               var computed = document.defaultView.getComputedStyle(elem, '') 

               value = computed[cui.lang.camelize(property)] 

             return elem.style[property] || value
        
        } : (ie && html.currentStyle) ? function(elem, property){

              property = this.camelize(property);

              property = property == 'float' ? 'styleFloat' : property;

              if(property == 'opacity') {

                 var val = 100;

                 try {

                   val = elem.filters['DXImageTransform.Microsoft.Alpha'].opacity;

                 } catch( e1 ) {

                   try{

                      val = elem.filters('alpha').opacity

                   }catch( e2 ) {

                   }
                 }
              }

              var value = elem.currentStyle ? elem.currentStyle[property] : null;

            return elem.style[property] || value
              
        } : function(elem, property){ 

            return elem.style[this.camelize[property]]
    },

    css: function(elem, v ) {
         
         elem.style.cssText = v 
    },

    attr: function(elem, a, v) {

          elem.setAttribute(a, v)
    },

    removeAttr: function( prop ) {

          elem.removeAttribute( prop )
    },

    html: function( elem, text ) {

          var specialTags = /select|fieldset|table|tbody|tfoot|td|tr|colgroup/i,

              method = text ? 

                       document.documentElement === null ? 

                                   'innerText':'innerHTML'

                                    :

                                   'innerHTML';
                         
                          elem[ method ] = text
    },

    is: function( node ) {
          
        return node && node.nodeName && node.nodeType == 1
    },


    /**
     *  Adds the specified class(es) to each of the set of matched elements.
     *  It's important to note that this method does not replace a class. It simply adds the class, appending it to any which
     *  may already be assigned to the elements.
     * 
     *  @param elem Object - the element for which add class
     *  @param c String - add specified class to the element
     *  @return (cuba) object
     */
    addClass: function(elem, c) {

          if('classList' in document.createElement('p')) {
            
                   elem.classList.add( c )  

          } else {

                   elem.className = cui.lang.trim(elem.className + ' ' + c)
          }

       return this
    },

    hasClass: function( el, c ) {

          if('classList' in document.createElement('p')) {

              return el.classList.contains( c )  

          } else {

              return this.classReg( c ).test(el.className)
          }

    },

    removeClass: function(elem, c ) {

         if('classList' in document.createElement('p')) {


                   elem.classList.remove( c )                                      

         } else {

                   elem.className = cui.lang.trim(elem.className + ' ' + c)
         }
    },

    classReg: function( c ) {

        return new RegExp('(^|\\s+)' + c +'(\\s+$)')
    }, 

    toggleClass: function(elem, c ) {


       this.hasClass(elem, c) ? this.removeClass(elem, c) : this.addClass(elem, c)
    }
};

HTMLElement.prototype.html = function( content ) {

            cui.dom.html(this, content);
};

HTMLElement.prototype.css = function( content ) {

            cui.dom.css(this, content)
};

Function.prototype.binding = function() {

         var args = Array.prototype.slice.call(arguments),

             object = args.shift(),

             fn = this;

         return function() {

                return fn.apply(object,args.concat(Array.prototype.slice.call(arguments)))
         } 
};
