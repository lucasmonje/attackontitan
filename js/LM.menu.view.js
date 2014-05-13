var LM = LM || {},
    jQuery = jQuery || {};

(function(namespaces, $, w, d) {
    var _module;
    var _MODULE_NAME = 'MenuView',
        _data = {
            menuContainer: null,
            menuContainerId: "",
            classNames: {
                itemMenuIdle: "itemMenuIdle",
                itemMenuSelected: "itemMenuSelected",
                itemMenuOpened: "itemMenuOpened",
                categoryMenuIdle: "categoryMenuIdle",
                categoryMenuSelected: "categoryMenuSelected",
                categoryMenuOpened: "categoryMenuOpened"
            }

        };

    _module = {
        updateMenu : function(itemsList) {


            $(_data.menuContainer).empty();

            for (var i = 0; i < itemsList.length; i++) {
                var itemMenu = itemsList[i];
                var itemView = d.createElement("div");
                $(itemView).addClass("button");

                itemView.id = itemMenu.itemMenuId;
                var className = "";
                if (itemMenu.isCategory) {
                    className = itemMenu.selected ? _data.classNames.categoryMenuSelected
                        : (itemMenu.opened ? _data.classNames.categoryMenuOpened: _data.classNames.categoryMenuIdle);
                } else {
                    className = itemMenu.selected ? _data.classNames.itemMenuSelected
                        : (itemMenu.opened ? _data.classNames.itemMenuOpened : _data.classNames.itemMenuIdle);
                }
                $(itemView).addClass(className);

                $(itemView).addClass('margin' + itemMenu.treeDepth);

                $(itemView).html(itemMenu.name +"</br>");
                document.getElementById(_data.menuContainerId).appendChild(itemView);
            }
        },
        setMenuContainer : function(menuContainer) {
            _data.menuContainer = menuContainer;
            _data.menuContainerId = $(menuContainer).attr("id");
        }
    };
    
    namespaces.local[_MODULE_NAME] = _module;
    
})({local: LM}, jQuery, window, document);