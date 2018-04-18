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
	$stateParams, $cordovaGeolocation, LocalStorage, $ionicPopup, $ionicModal, MapService,
	PJPService){
  GlobalUtil.goBackPJPHandler();
  var request = {};  
  $scope.pjpId = LocalStorage.get('pjpId');

  MapService.getPosition()
  .then(function(location){
      request = {
				planid: $stateParams.planId,
				latitude: location.lat,
				longitude: location.long
		  };

			PJPService.getStoreList(request)
			.then(function success(response){
				$scope.storeList = response.data;
			}, function error(response){

			});
  });
	
  $scope.storeClick = function(params){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
	  if(params.storeCode == 'ALE14114'){
    	LoadingService.stop();
	    var alertPopup = $ionicPopup.alert({
	       title: 'Pemberitahuan',
	       template: 'Jarak Anda dengan lokasi lebih dari 5 meter.'
	    });
	  } else {
	  	$timeout(function(){
				LocalStorage.set('storeId', params.storeCode);
	    	LoadingService.stop();
				$state.go('app.catalog');
	    }, 1000);

	  }
  };

  $ionicModal.fromTemplateUrl('js/pjp/views/store.map.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.storeLocation = function(event){
  	event.stopPropagation();
  	$scope.modal.show();

  	MapService.getDirection('store-map', 'DRIVING')
  	.then(function(map){
  		$scope.map = map;
  	});
  };

  $scope.refreshLocation = function(){
	  LoadingService.start(GlobalConstant.loadingSpinner.ripple);
  	MapService.getDirection('store-map', 'DRIVING')
  	.then(function(map){
  		$scope.map = map;
  		$timeout(function(){
  			LoadingService.stop();
  		}, 500);
  	});
  };

  $scope.closeMap = function(){
  	$scope.modal.hide();
  };
});

pjpModule.controller('CatalogCtrl', function($scope, $state,  $timeout, GlobalUtil, LoadingService, GlobalConstant,
	$stateParams, LocalStorage,
	PJPService){
  GlobalUtil.goBackPJPHandler();
  $scope.breadcrumb = {};
  $scope.breadcrumb.pjpId = LocalStorage.get('pjpId');
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
  $scope.breadcrumb = {};
  $scope.breadcrumb.pjpId = LocalStorage.get('pjpId');

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
	$stateParams, LocalStorage, $ionicPopup,
	PJPService){
  var optionBox;

  $scope.showOption = function(){
    optionBox = $ionicPopup.alert({
      title: 'Pilih Opsi',
      templateUrl: 'templates/select.box.html',
      scope: $scope,
      okText: 'Cancel'
    });
    $scope.options = ["Ya", "Tidak"];
  };

  $scope.optionSelected = function(item){
    $scope.itemAvailable = item;
    optionBox.close();
  };

  $scope.getPicture = function(){
    $ionicPopup.alert({
      title: 'Ambil Gambar',
      templateUrl: 'templates/image.picker.html',
      okText: 'Cancel'
    });
  };
});