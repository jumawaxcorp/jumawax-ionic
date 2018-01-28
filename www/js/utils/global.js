app.service('LoadingService', function($ionicLoading){
	this.start = function(type){
			$ionicLoading.show({
			template: '<ion-spinner '+ type +' ></ion-spinner>',
      animation: 'fade-in',
	    maxWidth: 2000,
	    showDelay: 0
		});
	};

	this.stop = function(){
		$ionicLoading.hide();
	}
});

app.service('GlobalUtil', function($state, $rootScope, $ionicHistory){
	this.isEmptyObj = function(obj) {
	    for(var key in obj) {
	        if(obj.hasOwnProperty(key))
	            return false;
	    }
	    return true;
	};

	this.assignCurrentUser = function(user){
  	$rootScope.currentUser = user;
  };

  this.goBackPJPHandler = function(){
		$rootScope.$ionicGoBack = function(backCount) {
	    if($state.current.name == 'app.store'){      
	      $ionicHistory.nextViewOptions({
	        disableBack: true
	      });

	      $state.go('app.home');
	    } else {
	      $ionicHistory.goBack();
	    }
	  
	    // $ionicNavBarDelegate.showBackButton(false);
	    // $ionicHistory.nextViewOptions({
	    //   historyRoot: true
	    // });
	  }; 
  };
});

app.service('LocalStorage', function($window){	

	return {
		set: function(key, value){
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue){
		 	return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value){
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject(key){
			return JSON.parse($window.localStorage[key] || '{}');
		},
		remove: function(key){
			$window.localStorage.removeItem(key);
		},
		clear: function(){
			$window.localStorage.clear();
		}
	};
});