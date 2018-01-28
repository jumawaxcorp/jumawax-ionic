var homeModule = angular.module('HomeModule', []);

homeModule.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'js/home/views/home.html',
        controller: 'HomeCtrl'
      }
    }
  })
});