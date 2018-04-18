authModule.service('AuthService', function($http, GlobalUtil, GlobalConstant){
  this.login = function(request){

  	if(GlobalUtil.isEmptyObj(request)){
    	request = {
  			username: 'R.Kennedy',
  			password: 'sayaagents'
      };
    }

  	return $http({
  	  url: GlobalConstant.appProperties.serverAPI + '/user/loginmob',
      method: "GET", 
      data: [],
      params: request
    });
  };
});