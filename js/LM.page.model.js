/** @namespace LM */
var LM = LM || {};

(function(namespaces) {
    var _module;
    var _MODULE_NAME = 'PageModel',
        _settings = {
			name:'',
			releaseDate:'',
			endDate:'',
			tags:'',
			owner:'',
			pages: {
				keys:[],
				values:[],
				map:[],
				count:0
			}
        };

    _module = {
        getName: function () {
            return _settings.name;
        },
        setName: function (v) {
            _settings.name = v;
        },
        getReleaseDate: function () {
            return _settings.releaseDate;
        },
        setReleaseDate: function (v) {
            _settings.releaseDate = v;
        },
        getEndDate: function () {
            return _settings.endDate;
        },
        setEndDate: function (v) {
            _settings.endDate = v;
        },
        getTags: function () {
            return _settings.tags;
        },
        setTags: function (v) {
            _settings.tags = v;
        },
        getOwner: function () {
            return _settings.owner;
        },
        setOwner: function (v) {
            _settings.owner = v;
        },
        getPage: function (pageId) {
            return _settings.pages.map[pageId];
        },
        getPagesKeys: function () {
            return _settings.pages.keys;
        },
        getPagesValues: function () {
            return _settings.pages.values;
        },
        addPage: function (id, title, subtitle, image, description) {
            var page = {
                id: id,
                title: title,
                subtitle: subtitle,
                image: image,
                description: description
            };
            _settings.pages.keys[_settings.pages.count] = id;
            _settings.pages.values[_settings.pages.count] = page;
            _settings.pages.map[id] = page;
            _settings.pages.count++;
        }
    };
    
    namespaces.local[_MODULE_NAME] = _module;

})({local: LM});