authModule.service('AuthService', function($http, GlobalUtil){
	this.login = function(request){
		if(GlobalUtil.isEmptyObj(request)){
    	request = {
				username: 'R.Kennedy',
				password: 'sayaagents'
      };
    }

		return $http({
			url: 'http://localhost:7070/jumawax-web/user/login',
      method: "GET", 
      data: [],
      params: request
    });
	}
});