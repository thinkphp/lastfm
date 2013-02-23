/*
Copyright (c) 2013 Adrian Statescu. All rights reserved.
version: 1.0.2
MIT License
*/

/**
 *  The cui object is the single global object used by cui library.
 */

if(typeof cui == "undefined" || !cui) {
   /**
    *  The cui global namespace object. If cui is already defined, the, the existing cui object will not
    *  be overwritten so that defined namespaces are preserved.
    *  @class cui
    *  @static 
    */
    var cui = {};
}

/* current version */
cui.version = '@VERSION@';

/* attribute to store data */
cui.DATA_CUI = 'data-cui';     
   

/**
 *  Provides the language utilities used by the cui micro-library.
 */  

cui.lang = cui.lang || {};

(function() {

    var L = cui.lang,

        O_P = Object.prototype, 
 
        html_chars = {'&':'&amp','<':'&lt','>':'&gt','"':'&quot',"'":'&#x27','/':'&#x2F','`':'&#x60'},

        ARRAY_TOSTRING = '[object Array]',
        FUNCTION_TOSTRING = '[object Function]',
        OBJECT_TOSTRING = '[object Object]',
        NOTHING        = [],
        

        OB = {

             /**
              * Determines whether or not the provided object is an array.
              *
              * @method isArray
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isArray: function( ob ) {

                      return O_P.toString.apply( ob ) == ARRAY_TOSTRING;
             },


             /**
              * Determines whether or not the provided object is a boolean.
              *
              * @method isArray
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isBoolean: function( ob ) {

                      return typeof ob === 'boolean';
             },


             /**
              * Determines whether or not the provided object is a function.
              *
              * @method isFunction
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isFunction: function( ob ) {

                      return (typeof ob === 'function') || O_P.toString.apply( ob ) === FUNCTION_TOSTRING
             },


             /**
              * Determines whether or not the provided object is null.
              *
              * @method isNull
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isNull: function( ob ) {

                      return ob === null;
             },

             /**
              * Determines whether or not the provided object is a legal number.
              *
              * @method isNumber
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              * @since 1.0.0
              */
             isNumber: function( ob ) {

                      return typeof ob === 'number' && isFinite( ob )
             },


             /**
              * Determines whether or not the provided object of type object of function/
              *
              * @method isObject.
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              */
             isObject: function( ob ) {

                     return ( ob && (typeof ob === 'object') || L.isFunction( ob ) ) || false
             },


             /**
              * Determines whether or not the provided  object is a string.
              *
              * @method isString
              * @param (any)      - the object being tested
              * @return (boolean) - the result 
              * @static  
              * @since 1.0.0
              */
             isString: function( ob ) {

                       return typeof ob === 'string'
             },

             /**
              * Determines whether or not the provided object is undefined.
              *
              * @method isUndefined
              * @param  (any) ob - the object being tested. 
              * @return (Boolean: true/false)  - the result that tell me whether is or not undefined
              * @static  
              */
             isUndefined: function( ob ) {

                          return typeof ob === 'undefined'      
             },


             /**
              * A convenience method for detecting a legitimate non-null value. 
              * Returns false for null, NaN, undefined, and true for other values.
              *
              * @method isValue
              * @param  (any) ob  - the object being tested. 
              * @return (Boolean) - true if it is not null/undefined/NaN OR False
              * @static  
              */
             isValue: function( ob ) {

                      return L.isObject( ob ) || L.isString( ob ) || L.isNumber( ob ) || L.isBoolean( ob )
             },


             /**
              * Returns a copy of the specified string with special HTML characters escaped.
              *
              * @method escapeHTML
              * @param (String) html - String to escape.
              * @return (String)     - Escaped string
              * @static  
              * @since 1.0.0
              */
             escapeHTML: function( html ) {
 
                  return html.replace(/[&<>"'\/`]/g, function( match ){

                         return html_chars[ match ] 
                  });  
             },



             /**
              * Returns a string without any leading or trailing whitespace.
              * If the input is not a string, the input will be returned untouched.
              *
              * @method trim
              * @param (String) s    - the string to trim.
              * @return (String)     - the trimmed string.
              * @static  
              * @since 1.0.0
              */
             trim: function( s ) {

                 try{  

                   return String.prototype.trim ? s.trim() : s.replace(/(^\s*|\s*$)/g,'')    

                 }catch(e) {

                   return s; 
                 }
             },

             /**
              * Returns a string camelized.
              * If the input is not a string, the input will be returned untouched.
              *
              * @method camelize
              * @param (String) s    - the string to camelize.
              * @return (String)     - the camelized string.
              * @static  
              * @since 1.0.0
              */
             camelize: function( s ) {

                try{
 
                   return s.replace(/-(.)/g, function(m, m1){

                         return m1.toUpperCase();
                   })

                }catch(e) {

                   return s;
                }
             },

             /**
              * Inheritance by copying properties.
              *
              * @method augmentObject
              * @param (Object) child  - the child object, c`est-a-dire is the object to receive the augmentation.
              * @param (Object) parent - the parent object, c`est-a-dre is the object that supplies the properties to augment.
              * @return (Object) - inheritance by copying properties.
              * @static  
              */
             augmentObject: function(child, parent) {

                    if(!child || !parent) {

                        throw new Error("Failed, verify argumetns");
                    } 

                    var p, override = arguments[2]

                    for(p in parent) {

                        if(override || !(p in parent)) {

                            child[ p ] = parent[ p ]
                        }
                    }       
            
                return child;
             },

             /**
              * Inheritance by copying properties.
              *
              * @method mixins
              * @return (Object) - inheritance by copying properties.
              * @static  
              */
             mixins: function() {
 
                     var arg, prop, child = {};

                     for(arg = 0; arg < arguments.length; arg++) {

                         for(prop in arguments[ arg ]) {

                             child[ prop ] = arguments[ arg ][ prop ]
                         }
                     } 

                return child;
             } 
        };

        OB.augmentObject(L, OB, true)

        cui.lang = L; 
 
        cui.extend = OB.augmentObject;

        cui.mixins = OB.mixins;
})();


