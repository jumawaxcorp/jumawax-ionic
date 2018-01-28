pjpModule.service('PJPService', function($http, $rootScope, GlobalConstant){
	console.log($rootScope.currentUser);

	this.getPJPList = function(){
		return $http({
			url: GlobalConstant.appProperties.serverAPI + '/journeyplan/list/jsonp/plan?username=R.Kennedy',
      method: "GET", 
      data: [],
      params: {}
    });
	};

	this.getStoreList = function(request){
		return $http({
			url: GlobalConstant.appProperties.serverAPI + '/journeyplan/list/jsonp/plan/store',
      method: "GET", 
      data: [],
      params: request
    });
	};

	this.getCatalogList = function(request){
		return $http({
			url: GlobalConstant.appProperties.serverAPI + '/product/list/jsonp/product/catalogue',
      method: "GET", 
      data: [],
      params: {}
    });
	};

	this.getSKUList = function(request){
		return $http({
			url: GlobalConstant.appProperties.serverAPI + '/product/list/jsonp/product/sku',
      method: "GET", 
      data: [],
      params: request
    });
	};
});