var pjpModule = angular.module('PJPModule', ['ionic-modal-select']);

pjpModule.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
  .state('app.pjp', {
    url: '/pjp',
    views: {
      'menuContent': {
        templateUrl: 'js/pjp/views/pjp.html',
        controller: 'PJPCtrl'
      }
    }
  })
  .state('app.store', {
    url: '/store',
    params: {
    	planId: null
    },
    views: {
      'menuContent': {
        templateUrl: 'js/pjp/views/store.html',
        controller: 'StoreCtrl'
      }
    }
  })
  .state('app.catalog', {
    url: '/catalog',
    views: {
      'menuContent': {
        templateUrl: 'js/pjp/views/catalog.html',
        controller: 'CatalogCtrl'
      }
    }
  })
  .state('app.sku', {
    url: '/sku',
    views: {
      'menuContent': {
        templateUrl: 'js/pjp/views/sku.html',
        controller: 'SKUCtrl'
      }
    }
  })
  .state('app.pjp-form', {
    url: '/pjp-form',
    views: {
      'menuContent': {
        templateUrl: 'js/pjp/views/pjp-form.html',
        controller: 'PJPFormCtrl'
      }
    }
  });
});