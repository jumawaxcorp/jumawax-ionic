authModule.controller('LoginCtrl', function($scope, $state, LoadingService, GlobalUtil, GlobalConstant, AuthService, $rootScope, 
	$timeout){
  
  $scope.loginData = {};
  var credentials = {};

	$scope.doLogin = function() {
    LoadingService.start(GlobalConstant.loadingSpinner.ripple);
    credentials = $scope.loginData;

    AuthService.login(credentials)
    .then(function success(response){
	    $timeout(function(){
	    	GlobalUtil.assignCurrentUser(response.data);
	    	LoadingService.stop();
		    $state.go('app.home');
	    }, 1000);
    }, function error(response){
    	LoadingService.stop();
    });


  };
});