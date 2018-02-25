app.service('GlobalUtil', function($state, $rootScope, $ionicHistory){
	this.isEmptyObj = function(obj) {
	    for(var key in obj) {
	        // if(obj.hasOwnProperty(key)){
	        if("undefined" !== typeof(obj[key])){
	            return false;
	        }
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

app.service('MapService', function($cordovaGeolocation){
	var mapService = {};
  var posOptions = {
  	timeout: 10000, 
  	enableHighAccuracy: true
  };

  function makeMarker(position, icon, title, map) {
      new google.maps.Marker({
          position: position,
          map: map,
          icon: icon,
          title: title
      });
  }

  var icons = {
      start: new google.maps.MarkerImage(
	      // URL
	      'http://maps.google.com/mapfiles/ms/micons/man.png',
	      // (width,height)
	      new google.maps.Size(44, 32),
	      // The origin point (x,y)
	      new google.maps.Point(0, 0),
	      // The anchor point (x,y)
	      new google.maps.Point(22, 32)),
      end: new google.maps.MarkerImage(
	      // URL
	      'http://maps.google.com/mapfiles/ms/micons/red-dot.png',
	      // (width,height)
	      new google.maps.Size(44, 32),
	      // The origin point (x,y)
	      new google.maps.Point(0, 0),
	      // The anchor point (x,y)
	      new google.maps.Point(22, 32))
  };

  mapService.getPosition = function(){
		return $cordovaGeolocation
  	.getCurrentPosition(posOptions)
  	.then(function(position){
      var lat  = position.coords.latitude;
      var long = position.coords.longitude;
      // var lat  = -6.2610343,
      // var long = 107.0581345,
      var location = {
	      lat: lat,
	      long: long,
	      latLong: new google.maps.LatLng(lat, long)
      };
    	return location;
  	});
  };

  mapService.getDirection = function(mapId, travelMode){
  	return mapService.getPosition()
  	.then(function(location){
	  	var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
    	var mapOptions = {
    		center: new google.maps.LatLng(location.lat, location.long),
    		zoom: 16,
    		mapTypeId: google.maps.MapTypeId.ROADMAP
    	};

    	var map = new google.maps.Map(document.getElementById(mapId), mapOptions);
    	var places = new google.maps.places.PlacesService(map);

      directionsDisplay.setMap(map);

      directionsService.route({
        origin: new google.maps.LatLng(location.lat, location.long),
        destination: 'Polsek Tambun',
        travelMode: travelMode
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);

          var leg = response.routes[0].legs[0];
          makeMarker(leg.start_location, icons.start, "title", map);
          makeMarker(leg.end_location, icons.end, 'title', map);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

      return map;
  	});
  };

	return mapService;
});



























