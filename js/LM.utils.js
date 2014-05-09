var LM = LM || {};

(function(namespaces) {
    var _MODULE_NAME = 'Utils';

    var _module = {
        debug : true,
        isConsoleEnabled : function(){
            return window.console !== undefined && !!console.log;
        },
		
        isNumber : function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },

        log : function(){
            if(LM.Utils.debug && LM.Utils.isConsoleEnabled()) console.log(arguments[0]);
        },

        info : function(){
            if(LM.Utils.debug && LM.Utils.isConsoleEnabled()) console.info(arguments[0]);
        },

        warn : function(){
            if(LM.Utils.debug && LM.Utils.isConsoleEnabled()) console.warn(arguments[0]);
        },

        error : function(){
            if(LM.Utils.debug && LM.Utils.isConsoleEnabled()) console.error(arguments[0]);
        },

        arrayContains : function(array, item) {
            var found = false;
            for(var i=0, len=array.length; i < len; i++) {
                if(array[i] == item) {
                    found = true;
                    break;
                }
            }
            return found;
        },
        
        convertToJson : function(str) {
            var toParse = str.replace(/"/g,'\'').replace(/=/g,':').replace(/ /g,'').replace(/{/g,'{"').replace(/:/g,'":"').replace(/,/g,'","').replace(/}/g,'"}').replace(/"{/g,'{').replace(/\}"/g,'}').replace(/""/g,'');
            var json = JSON.parse(toParse);
            return json;
        },
		
		cloneObject : function (obj) {
			if (null == obj || "object" != typeof obj) return obj;
			var copy = obj.constructor();
			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
			}
			return copy;
		}
    };

    namespaces.local[_MODULE_NAME] = _module;

})({local: LM});