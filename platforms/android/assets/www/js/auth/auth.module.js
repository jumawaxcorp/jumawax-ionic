var authModule = angular.module('AuthModule', []);

authModule.config(function($stateProvider, $urlRouterProvider){
	$stateProvider

	.state('login', {
    url: '/login',
    templateUrl: 'js/auth/views/login.html',
    controller: 'LoginCtrl',
    data: {
      requireLogin: false
    }
  })

});
