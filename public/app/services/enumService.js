'use strict';

angular.module('EnumService', []);

angular.module('EnumService').factory('ItemGenderService', function() {

    return {
        get: function() {
            return [{
                id: 'M',
                key: 'Uomo'
            }, {
                id: 'F',
                key: 'Donna'
            }, {
                id: 'U',
                key: 'Unisex'
            }, {
                id: 'BM',
                key: 'Bimbo'
            }, {
                id: 'BF',
                key: 'Bimba'
            }, {
                id: 'BU',
                key: 'Bimbo unisex'
            }];
        }
    }

});

angular.module('EnumService').factory('ItemCategoryService', function() {

    return {
        get: function() {
            return [{
                    id: 'CSP',
                    key: 'Capospalla'
                },
                {
                    id: 'TOP',
                    key: 'Top'
                },
                {
                    id: 'VES',
                    key: 'Vestito'
                },
                {
                    id: 'PAN',
                    key: 'Pantalone'
                },
                {
                    id: 'TUT',
                    key: 'Tuta'
                },
                {
                    id: 'GON',
                    key: 'Gonna'
                },
                {
                    id: 'GIL',
                    key: 'Gilet'
                },
                {
                    id: 'FEL',
                    key: 'Felpa'
                },
                {
                    id: 'TRI',
                    key: 'Tricot'
                },
                {
                    id: 'CAP',
                    key: 'Cappello'
                },
                {
                    id: 'BAG',
                    key: 'Borsa'
                },
                {
                    id: 'SCI',
                    key: 'Sciarpa'
                }
            ];
        }
    }

});

angular.module('EnumService').factory('ItemSizeService', function() {

    return {
        get: function(gender) {
            if (gender == 'BM' || gender == 'BF' || gender == 'BU') {
                return ['1', '3', '5', '7', '9', '11'];
            } else {
                return ['S', 'M', 'L', 'U'];
            }
        }
    }
});

angular.module('EnumService').factory('OperationTypeService', function() {

    return {
        get: function() {
            return [{
                id: 'I',
                key: 'Carico'
            }, {
                id: 'O',
                key: 'Scarico'
            }];
        }
    }

});
