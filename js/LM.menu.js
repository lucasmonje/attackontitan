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
            currentIndex : 0,
            itemsCapacity: 10,
            lastItemMenuIdSelected: -1,
            lastItemMenuIdOpened: -1
        };

    _module = {
        setSelectedItem : function(itemMenuId) {
            var lastItemMenuSelected = _data.menu.map[_data.lastItemMenuIdSelected];
            lastItemMenuSelected.selected = false;

            var itemMenuSelected = _data.menu.map[_data.itemMenuId];
            itemMenuSelected.selected = true;

            _data.lastItemMenuIdSelected = itemMenuId;
        },
        setOpenedItem: function(itemMenuId) {
            var itemMenuOpened = _data.menu.map[_data.itemMenuId];
            itemMenuOpened.selected = true;

            var lastItemMenuOpened = _data.menu.map[_data.lastItemMenuIdOpened];
            lastItemMenuOpened.selected = itemMenuOpened.parentItemId == _data.lastItemMenuIdOpened;
            _data.lastItemMenuIdOpened = itemMenuId;
        },
        setCurrentIndex : function(v) {
          _data.currentIndex = v;
        },
        getCurrentIndex : function() {
            return _data.currentIndex;
        },
        getItemsList : function() {
            var list = [];
            for (var itemMenu in _data.menu.branches) {
                LM.Menu.updateItemList(list, itemMenu);
            }
            var result = list.splice(_data.currentIndex, _data.itemsCapacity);
            return result;
        },
        updateItemList : function(list, itemMenu) {
            list[list.length] = itemMenu;
            if (itemMenu.isCategory && itemMenu.isOpened) {
                LM.Menu.updateCategoryList(list, itemMenu);
            }
        },
        updateCategoryList : function(list, itemCategory) {
            for (var childItemId in itemCategory.childItemsIds) {
                var childItem = LM.Menu.getItemMenuById(childItemId);
                updateItemList(list, childItem);
            }
        },
        addItemMenu : function(itemMenuId, treeDepth, pageId, parentItemId, childItemsIds) {
            var page = LM.Config.getPage(pageId);
            var itemMenu = {
                itemMenuId: itemMenuId,
                treeDepth: treeDepth,
                pageId : pageId,
                parentItemId: parentItemId,
                childItemsIds : childItemsIds,
                page: page,
                name: page.name,
                isCategory: childItemsIds.length > 0,
                selected: false,
                opened: false
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