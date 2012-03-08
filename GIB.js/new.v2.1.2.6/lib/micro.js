!function(win){var template = function(tmp,o){ return tmp.replace((RegExp("{([^{}]*)}","gi")), function(tag,p){return o[p];});};win['template'] = template;}(this);
