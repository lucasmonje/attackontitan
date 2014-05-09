var LM = LM || {};

(function(namespaces) {
    var _module;
    var _MODULE_NAME = 'MenuModel',
        _data = {
            menu: {
                keys:[],
                values:[],
                map:[],
                branches:[],
                count:0
            },
            lastItemMenuIdSelected: -1,
            lastItemMenuIdOpened: -1,
            currentIndex: 0,
            boundTop:0,
            boundBottom:10,
            slots: 10,
            listLength: 0
        };

    _module = {
        setSelectedItem : function(itemMenuId) {
            var lastItemMenuSelected = _data.menu.map[_data.lastItemMenuIdSelected];
            lastItemMenuSelected.selected = false;

            var itemMenuSelected = _data.menu.map[_data.itemMenuId];
            itemMenuSelected.selected = true;

            _data.lastItemMenuIdSelected = itemMenuId;
        },
        setOpenedItem : function(itemMenuId) {
            var itemMenuOpened = _data.menu.map[_data.itemMenuId];
            itemMenuOpened.selected = true;

            var lastItemMenuOpened = _data.menu.map[_data.lastItemMenuIdOpened];
            lastItemMenuOpened.selected = itemMenuOpened.parentItemId == _data.lastItemMenuIdOpened;
            _data.lastItemMenuIdOpened = itemMenuId;
        },
        increaseCurrentIndex : function() {
            if (_data.currentIndex < _data.listLength) {
                _data.currentIndex = _data.currentIndex + 1;
            }
        },
        decreaseCurrentIndex : function() {
            if (_data.currentIndex > 0) {
                _data.currentIndex = _data.currentIndex - 1;
            }
        },
        getCurrentIndex : function() {
            return _data.currentIndex;
        },
        getItemsList : function() {
            var list = [];

            for (var i = 0; i < _data.menu.branches.length; i++) {
                var itemMenu = _data.menu.branches[i];
                LM.MenuModel.updateItemList(list, itemMenu);
            }
            _data.listLength = list.length;

            var result = null;
            if (list.length > _data.slots) {
                if (_data.currentIndex > _data.boundBottom) {
                    _data.boundTop = _data.currentIndex - _data.slots;
                    _data.boundBottom = _data.currentIndex;
                } else if (_data.currentIndex < _data.boundTop) {
                    _data.boundTop = _data.currentIndex;
                    _data.boundBottom = _data.currentIndex + _data.slots;
                }
                result = list.splice(_data.boundTop, _data.boundBottom);
            } else {
                result = list;
            }

            return result;
        },
        updateItemList : function(list, itemMenu) {
            list[list.length] = itemMenu;
            if (itemMenu.isCategory && itemMenu.opened) {
                LM.MenuModel.updateCategoryList(list, itemMenu);
            }
        },
        updateCategoryList : function(list, itemCategory) {
            for (var i = 0; i < itemCategory.childItemsIds.length; i++) {
                var childItemId = itemCategory.childItemsIds[i];
                var childItem = LM.MenuModel.getItemMenuById(childItemId);
                LM.MenuModel.updateItemList(list, childItem);
            }
        },
        addItemMenu : function(itemMenuId, itemMenuName, treeDepth, pageId, parentItemId, childItemsIds) {
            var itemMenu = {
                itemMenuId: itemMenuId,
                treeDepth: treeDepth,
                pageId : pageId,
                parentItemId: parentItemId,
                childItemsIds : childItemsIds,
                name: itemMenuName,
                isCategory: childItemsIds != null ? childItemsIds.length > 0 : false,
                selected: false,
                opened: false
            };

            _data.menu.keys[_data.menu.count] = itemMenuId;
            _data.menu.values[_data.menu.count] = itemMenu;
            _data.menu.map[itemMenuId] = itemMenu;

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
    
})({local: LM});