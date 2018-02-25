authModule.controller('LoginCtrl', function($scope, $state, LoadingService, GlobalUtil, GlobalConstant, AuthService, $rootScope,
  $ionicPopup, $timeout){
  var nextState = 'app.home',
      bypassErrorMsg = 'Link API atau koneksi bermasalah, login dengan bypass otentikasi!';
  
  var credentials = {};
  $scope.loginData = {};
  $scope.loginData.username = 'R.Kennedy';
  $scope.loginData.password = 'sayaagents';

	$scope.doLogin = function() {
    LoadingService.start(GlobalConstant.loadingSpinner.ripple);
    credentials.username = $scope.loginData.username;
    credentials.password = $scope.loginData.password;

    if($scope.loginData.apiLink != null){
      GlobalConstant.appProperties.serverAPI = 'http://' + $scope.loginData.apiLink;      
    }

    AuthService.login(credentials)
    .then(function success(response){
      loginSuccess(response);
    }, function error(response){
      bypassAuth();
    });
  };

  var loginSuccess = function(response){
    $timeout(function(){
      if(response.data.msg == 'Success'){
        GlobalUtil.assignCurrentUser(response.data);
        LoadingService.stop();
        $state.go(nextState);
      } else {
        LoadingService.stop();
        $ionicPopup.alert({
           title: 'Error',
           template: response.data.msg
        });
      }
    }, 1000);
  };

  var bypassAuth = function(){
    GlobalUtil.assignCurrentUser(credentials);
    LoadingService.stop();
    var alertPopup = $ionicPopup.alert({
       title: 'Error',
       template: bypassErrorMsg
    });

    $timeout(function(){
      alertPopup.close();
      $state.go(nextState);
    }, 1500);
  };
});