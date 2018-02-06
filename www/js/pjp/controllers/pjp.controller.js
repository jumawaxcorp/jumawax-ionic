pjpModule.controller('PJPCtrl', function($scope, $state, $timeout, GlobalUtil, LoadingService, GlobalConstant,
	LocalStorage, 
	PJPService){
  GlobalUtil.goBackPJPHandler();

 	PJPService.getPJPList()
  .then(function success(response){
  	$scope.pjpList = response.data;
  }, function error(response){
  	LoadingService.stop();
  });

  $scope.pjpClick = function(params){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
	  LocalStorage.set('pjpId', params.planId)

  	$timeout(function(){
    	LoadingService.stop();
			$state.go('app.store', {planId: params.planId});
    }, 1000);
  };
});

pjpModule.controller('StoreCtrl', function($scope, $state,  $timeout, GlobalUtil, LoadingService, GlobalConstant,
	$stateParams, $cordovaGeolocation, LocalStorage,
	PJPService){
  GlobalUtil.goBackPJPHandler();
  var request;
  var posOptions = {timeout: 10000, enableHighAccuracy: false};

	$cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude

      request = {
				planid: $stateParams.planId,
				latitude: lat,
				longitude: long
		  };

			PJPService.getStoreList(request)
			.then(function success(response){
				$scope.storeList = response.data;
			}, function error(response){

			});
    }, function(err) {
      // error
  });

  $scope.storeClick = function(params){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
  	$timeout(function(){
			LocalStorage.set('storeId', params.storeCode);
    	LoadingService.stop();
			$state.go('app.catalog');
    }, 1000);
  };
});

pjpModule.controller('CatalogCtrl', function($scope, $state,  $timeout, GlobalUtil, LoadingService, GlobalConstant,
	$stateParams, LocalStorage,
	PJPService){
  GlobalUtil.goBackPJPHandler();

  var request = {

  };

	PJPService.getCatalogList(request)
	.then(function success(response){
		$scope.catalogList = response.data;
	}, function error(response){

	});

  $scope.catalogClick = function(params){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
  	$timeout(function(){
			LocalStorage.set('catalogId', params.catalogueId);

    	LoadingService.stop();
			$state.go('app.sku');
    }, 1000);
  };
});

pjpModule.controller('SKUCtrl', function($scope, $state,  $timeout, GlobalUtil, LoadingService, GlobalConstant,
	$stateParams, LocalStorage,
	PJPService){
  GlobalUtil.goBackPJPHandler();

  var request = {
	  storeId: LocalStorage.get('storeId'),
	  catalogueId: LocalStorage.get('catalogId'),
	  pjpId: LocalStorage.get('pjpId')
  };

	PJPService.getSKUList(request)
	.then(function success(response){
		$scope.skuList = response.data;
	}, function error(response){

	});

  $scope.skuClick = function(){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
  	$timeout(function(){
    	LoadingService.stop();
			$state.go('app.home');
    }, 1000);
  };
});

pjpModule.controller('PJPFormCtrl', function($scope, $state,  $timeout, GlobalUtil, LoadingService, GlobalConstant,
	$stateParams, LocalStorage,
	PJPService){

});