'use strict';

angular.module('app').config(function($translateProvider) {
    //translation
    $translateProvider.translations('it', {
        ADD: 'Aggiungi',
        CATEGORY: 'Categoria',
        CREATION_DATE: 'Data creazione',
        DELETE: 'Elimina',
        DESCRIPTION: 'Descrizione',
        DETAIL: 'Dettaglio',
        DOWNLOAD: 'Scarico',
        EDIT: 'Modifica',
        GENDER: 'Sesso',
        ITEM: 'Articolo',
        MODEL: 'Modello',
        MOVEMENT: 'Movimento',
        NAME: 'Nome',
        QUANTITY: 'Quantità',
        SIZE: 'Taglia',
        TYPE: 'Tipo',
        UPLOAD: 'Carico',
        WAREHOUSE: 'Magazzino'
    });
    $translateProvider.translations('en', {});

    //options
    $translateProvider.preferredLanguage('it');
    //$translateProvider.useSanitizeValueStrategy('escape');
});
