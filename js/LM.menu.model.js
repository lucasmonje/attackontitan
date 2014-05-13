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
            currentIndex: 0,
            boundTop:0,
            slots: 10,
            lastList: []
        };

    _module = {
        setSelectedItem : function(itemMenuId) {
            if (_data.lastItemMenuIdSelected > -1) {
                var lastItemMenuSelected = _data.menu.map[_data.lastItemMenuIdSelected];
                lastItemMenuSelected.selected = false;
            }
            var itemMenuSelected = _data.menu.map[itemMenuId];
            itemMenuSelected.selected = true;

            _data.lastItemMenuIdSelected = itemMenuId;
        },
        setOpenedItem : function(itemMenuId) {
            var itemMenuOpened = _data.menu.map[itemMenuId];
            itemMenuOpened.opened = true;
        },
        increaseCurrentIndex : function() {
            if (_data.currentIndex < _data.lastList.length) {
                var lastItemMenuSelected = _data.lastList[_data.currentIndex];
                lastItemMenuSelected.selected = false;
                _data.currentIndex = _data.currentIndex + 1;
                var itemMenuSelected = _data.lastList[_data.currentIndex];
                itemMenuSelected.selected = true;
            }
        },
        decreaseCurrentIndex : function() {
            if (_data.currentIndex > 0) {
                var lastItemMenuSelected = _data.lastList[_data.currentIndex];
                lastItemMenuSelected.selected = false;
                _data.currentIndex = _data.currentIndex - 1;
                var itemMenuSelected = _data.lastList[_data.currentIndex];
                itemMenuSelected.selected = true;
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
            _data.lastList = list.slice(0);//copy list

            var result = null;
            if (list.length > _data.slots) {
                var currentSlot = _data.currentIndex + 1;
                if (currentSlot > _data.slots) {
                    _data.boundTop = currentSlot - _data.slots;
                } else if (currentSlot < _data.boundTop) {
                    _data.boundTop = currentSlot;
                }
                result = list.splice(_data.boundTop, _data.slots);
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