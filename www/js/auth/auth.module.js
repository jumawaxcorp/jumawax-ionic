var authModule = angular.module('AuthModule', []);

authModule.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

	.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    data: {
      requireLogin: false
    }
  })

});
