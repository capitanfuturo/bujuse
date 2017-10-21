'use strict';

angular.module('app').config(function($translateProvider) {
    //translation
    $translateProvider.translations('it', {
        ADD: 'Aggiungi',
        BAG: 'Borsa',
        CAP: 'Cappello',
        CATEGORY: 'Categoria',
        CREATION_DATE: 'Data creazione',
        CSP: 'Capospalla',
        DELETE: 'Elimina',
        DESCRIPTION: 'Descrizione',
        DETAIL: 'Dettaglio',
        DOWNLOAD: 'Scarico',
        EDIT: 'Modifica',
        FEL: 'Felpa',
        G_BF: 'Bimba',
        G_BM: 'Bimbo',
        G_BU: 'Bimbo unisex',
        G_F: 'Donna',
        G_M: 'Uomo',
        G_U: 'Unisex',
        GENDER: 'Sesso',
        GIL: 'Gilet',
        GON: 'Gonna',
        ITEM: 'Articolo',
        MODEL: 'Modello',
        MOVEMENT: 'Movimento',
        NAME: 'Nome',
        PAN: 'Pantolone',
        PRICE: 'Prezzo',
        QUANTITY: 'Quantità',
        S_1: '1-2 anni',
        S_3: '3-4 anni',
        S_5: '1-2 anni',
        S_7: '7-8 anni',
        S_9: '0-10 anni',
        S_11: '11-12 anni',
        S_L: 'Large',
        S_M: 'Medium',
        S_S: 'Small',
        S_U: 'Unisize',
        SCI: 'Sciarpa',
        SIZE: 'Taglia',
        TYPE: 'Tipo',
        TOP: 'Top',
        TRI: 'Tricot',
        TUT: 'Tuta',
        UPLOAD: 'Carico',
        VES: 'Vestito',
        WAREHOUSE: 'Magazzino',
    });
    $translateProvider.translations('en', {});

    //options
    $translateProvider.preferredLanguage('it');
    //$translateProvider.useSanitizeValueStrategy('escape');
});
