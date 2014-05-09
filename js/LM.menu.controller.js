var LM = LM || {};

(function(namespaces) {
    var _module;
    var _MODULE_NAME = 'MenuController';

    _module = {
        onPressUp : function() {
            LM.MenuModel.decreaseCurrentIndex();
            var itemsList = LM.MenuModel.getItemsList();
        },
        onPressDown : function() {
            LM.MenuModel.increaseCurrentIndex();
            var itemsList = LM.MenuModel.getItemsList();
        },
        onPressLeft : function() {
        },
        onPressRight : function() {
        },
        onPressOK : function() {
        },
        onPressExit : function() {
        }
    };
    
    namespaces.local[_MODULE_NAME] = _module;

})({local: LM});