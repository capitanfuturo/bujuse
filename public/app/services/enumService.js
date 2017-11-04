'use strict';

angular.module('EnumService', []);

angular.module('EnumService').factory('ItemGenderService', function() {

    return {
        get: function() {
            return [{
                id: 'G_M',
                key: 'Uomo'
            }, {
                id: 'G_F',
                key: 'Donna'
            }, {
                id: 'G_U',
                key: 'Unisex'
            }, {
                id: 'G_BM',
                key: 'Bimbo'
            }, {
                id: 'G_BF',
                key: 'Bimba'
            }, {
                id: 'G_BU',
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
                },
                {
                    id: 'JAC',
                    key: 'Giacca'
                },
                {
                    id: 'BEL',
                    key: 'Cintura'
                }
            ];
        }
    }

});

angular.module('EnumService').factory('ItemSizeService', function() {

    return {
        get: function(gender) {
            if(!gender){
              return [{
                  id: 'S_1M',
                  key: '1-2 mesi'
              }, {
                  id: 'S_3M',
                  key: '3 mesi'
              }, {
                  id: 'S_6M',
                  key: '6 mesi'
              }, {
                  id: 'S_9M',
                  key: '9 mesi'
              }, {
                  id: 'S_12M',
                  key: '12 mesi'
              },{
                  id: 'S_1',
                  key: '1-2 anni'
              }, {
                  id: 'S_3',
                  key: '3-4 anni'
              }, {
                  id: 'S_5',
                  key: '5-6 anni'
              }, {
                  id: 'S_7',
                  key: '7-8 anni'
              }, {
                  id: 'S_9',
                  key: '9-10 anni'
              }, {
                  id: 'S_11',
                  key: '11-12 anni'
              },{
                  id: 'S_X',
                  key: 'Extra Small'
              },{
                  id: 'S_S',
                  key: 'Small'
              }, {
                  id: 'S_M',
                  key: 'Medium'
              }, {
                  id: 'S_L',
                  key: 'Large'
              }, {
                  id: 'S_U',
                  key: 'Unisize'
              }];
            }

            if (gender == 'G_BM' || gender == 'G_BF' || gender == 'G_BU') {
                return [{
                    id: 'S_1M',
                    key: '1-2 mesi'
                }, {
                    id: 'S_3M',
                    key: '3 mesi'
                }, {
                    id: 'S_6M',
                    key: '6 mesi'
                }, {
                    id: 'S_9M',
                    key: '9 mesi'
                }, {
                    id: 'S_12M',
                    key: '12 mesi'
                },{
                    id: 'S_1',
                    key: '1-2 anni'
                }, {
                    id: 'S_3',
                    key: '3-4 anni'
                }, {
                    id: 'S_5',
                    key: '5-6 anni'
                }, {
                    id: 'S_7',
                    key: '7-8 anni'
                }, {
                    id: 'S_9',
                    key: '9-10 anni'
                }, {
                    id: 'S_11',
                    key: '11-12 anni'
                }];
            } else {
                return [{
                    id: 'S_X',
                    key: 'Extra Small'
                },{
                    id: 'S_S',
                    key: 'Small'
                }, {
                    id: 'S_M',
                    key: 'Medium'
                }, {
                    id: 'S_L',
                    key: 'Large'
                }, {
                    id: 'S_U',
                    key: 'Unisize'
                }];
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
