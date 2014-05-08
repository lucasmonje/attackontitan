var LM = LM || {};

(function(namespaces) {
    var _module;
    var _MODULE_NAME = 'Menu',
        _data = {
            menu: {
                keys:[],
                values:[],
                map:[],
                branches:[],
                count:0
            },
            itemsCapacity: 10
        };

    _module = {
        getItemsList : function() {
            var list = [];
            for (var itemMenu in _data.menu.branches) {
                if (list.length == _data.itemsCapacity) {
                    return list;
                }
                LM.Menu.updateItemList(list, itemMenu);
            }
            return list;
        },
        updateItemList : function(list, itemMenu) {
            list[list.length] = itemMenu;
            if (itemMenu.isCategory && itemMenu.isOpened) {
                LM.Menu.updateCategoryList(list, itemMenu);
            }
        },
        updateCategoryList : function(list, itemCategory) {
            for (var childItemId in itemCategory.childItemsIds) {
                if (list.length == _data.itemsCapacity) {
                    break;
                }
                var childItem = LM.Menu.getItemMenuById(childItemId);
                updateItemList(list, childItem);

            }
        },
        addItemMenu : function(itemMenuId, treeDepth, pageId, childItemsIds) {
            var page = LM.Config.getPage(pageId);
            var itemMenu = {
                itemMenuId: itemMenuId,
                treeDepth: treeDepth,
                pageId : pageId,
                childItemsIds : childItemsIds,
                page: page,
                name: page.name,
                isCategory: childItemsIds.length > 0,
                isSelected: false,
                isOpened: false
            };

            _data.menu.keys[_data.menu.count] = itemMenuId;
            _data.menu.values[_data.menu.count] = itemMenu;
            _data.menu.map[itemMenuId] = page;

            if (treeDepth == 0) {
                _data.menu.branches[_data.menu.branches.length] = itemMenu;
            }

            _data.menu.count++;
        },
        getItemMenuById : function(itemMenuId) {
            return _data.menu.map[itemMenuId];
        }
    };
    
    namespaces.local[_MODULE_NAME] = _module;
    
})(
        {
            local: LM
        }
);