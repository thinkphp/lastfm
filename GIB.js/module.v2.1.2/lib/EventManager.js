var EventManager = function(){
    this._listeners = {};
};
EventManager.prototype.addListener = function(event,listener){
    if(typeof this._listeners[event] == 'undefined') {
       this._listeners[event] = [];  
    }
    this._listeners[event].push(listener);
};
EventManager.prototype.removeListener = function(event){

     if(this._listeners[event] instanceof Array) {
           var listeners = this._listeners[event],
               n = listeners.length;
               for(var i=0;i<n;i++) {
                   if(listeners[i] == event) {
                       listeners.splice(i,1);
                       break;  
                   } 
               }  
     } 
};
EventManager.prototype.fireEvent = function(){

     if(typeof arguments[0] == 'string') {
        event = {type: arguments[0],args: arguments}; 
     }  
     if(!event.type) {
        throw new Error("Missing Event");
     }

     if(this._listeners[event.type] instanceof Array) {
        var listeners = this._listeners[event.type],
            n = listeners.length;
            for(var i=0;i<n;i++) {
                listeners[i].call(this,event.args);
            }    
     }
};