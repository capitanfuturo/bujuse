'use strict';

angular.module('app').config(function($translateProvider) {
    //translation
    $translateProvider.translations('it', {
        ADD: 'Aggiungi',
        ADDRESS: 'Indirizzo',
        BAG: 'Borsa',
        BEL: 'Cintura',
        BIRTHDAY: 'Compleanno',
        BREAST: 'Torace',
        CANCEL: 'Annulla',
        CAP: 'Cappello',
        CATEGORY: 'Categoria',
        CHANGE_TO: 'Passa a',
        CONFIGURATION: 'Configurazione',
        CONFIRM_DELETE_ITEM: "Eliminare l'articolo selezionato?",
        CONFIRM_DELETE_SEASON: "Eliminare la stagione selezionata?",
        CONFIRM_SENT_ORDER: "Confermare la consegna dell'ordine? L'operazione scaricherà il magazzino.",
        CONTACTS: 'Contatti',
        CREATION_DATE: 'Data creazione',
        CSP: 'Capospalla',
        CUSTOMER: 'Cliente',
        CUSTOMER_SALES: 'Dettaglio vendite per cliente',
        CUSTOMERS: 'Clienti',
        CUSTOMERS_TOTAL_SALES: 'Totale vendite per cliente',
        DELETE: 'Elimina',
        DELIVERED: 'Consegnato',
        DELIVERY_DATE: 'Data consegna',
        DEPOSIT: 'Anticipo',
        DESCRIPTION: 'Descrizione',
        DETAIL: 'Dettaglio',
        READY: 'Pronto',
        DOWNLOAD: 'Scarico',
        EDIT: 'Modifica',
        EMAIL: 'Email',
        FABRIC: 'Tessuto',
        FEL: 'Felpa',
        FIVE_YEARS_SALES: 'Vendite 5 anni',
        FW: 'A/I',
        G_BF: 'Bimba',
        G_BM: 'Bimbo',
        G_BU: 'Bimbo unisex',
        G_F: 'Donna',
        G_M: 'Uomo',
        G_U: 'Unisex',
        GENDER: 'Sesso',
        GIL: 'Gilet',
        GON: 'Gonna',
        PHONE: 'Telefono',
        HIDE_DELIVERED: 'Nascondi consegnati',
        HIP: 'Fianchi',
        I: 'Carico',
        IS_LOAD_ORDER: 'Carico magazzino',
        ITEM: 'Articolo',
        ITEMS: 'Articoli',
        JAC: 'Giacca',
        LEG_LENGTH: 'Lung. gamba',
        LOGOUT: 'Logout',
        MODEL: 'Modello',
        MONTHLY_SALES: 'Vendite 30 giorni',
        MOVEMENT: 'Movimento',
        MOVEMENTS: 'Movimenti',
        NAME: 'Nome',
        NEW: 'Nuovo',
        NOTE: 'Note',
        O: 'Scarico',
        OK: 'Ok',
        ORDER: 'Ordine',
        ORDERS: 'Ordini',
        PAN: 'Pantalone',
        PASSWORD: 'Password',
        PRICE: 'Prezzo [€]',
        QUANTITY: 'Quantità',
        QUARTERLY_SALES: 'Vendite 90 giorni',
        REPORT: 'Report',
        S_1M: '1-2 mesi',
        S_3M: '3 mesi',
        S_6M: '6 mesi',
        S_9M: '9 mesi',
        S_12M: '12 mesi',
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
        S_X: 'Extra Small',
        SCI: 'Sciarpa',
        SEASONS: 'Stagioni',
        SEASON: 'Stagione',
        SHOULDER: 'Spalla',
        SHOW_DELIVERED: 'Mostra consegnati',
        SIGN_IN: 'Accedi',
        SIZE: 'Taglia',
        SIZES: 'Taglie',
        SS: 'P/E',
        STATE: 'Stato',
        STOCK: 'Giacenze',
        TARGET: 'Target',
        TARGET_PRICE: 'Prezzo target [€]',
        TYPE: 'Tipo',
        TOP: 'Top',
        TOTAL: 'Totale',
        TRI: 'Tricot',
        TUT: 'Tuta',
        UPLOAD: 'Carico',
        USERNAME: 'Nome utente',
        VES: 'Vestito',
        VIEW: 'Vista',
        VIEW_ALL: 'Tutto',
        VIEW_1MONTH: '30 Giorni',
        VIEW_3MONTH: '90 Giorni',
        VIEW_1WEEK: '7 Giorni',
        WAIST: 'Vita',
        WAREHOUSE: 'Magazzino',
        WAREHOUSES: 'Magazzini',
        WORKING: 'In lavorazione',
        YEAR: 'Anno',
        YEARLY_SALES: 'Vendite annuali',
    });
    $translateProvider.translations('en', {});

    //options
    $translateProvider.preferredLanguage('it');
    //$translateProvider.useSanitizeValueStrategy('escape');
});
