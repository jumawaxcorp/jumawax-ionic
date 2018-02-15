elastiChat.factory('SocketFactory', function(socketFactory, $rootScope){
  var socket = io.connect('localhost:3031');

  return {
  	on: function(eventName, callback){
  	  // socket.on(eventName, function(){
  	  // 	var args = arguments;
     //    $rootScope.$apply(function(){
     //      callback.apply(socket, args);
     //    });
  	  // });
      socket.on(eventName, callback);
  	},
  	emit: function(eventName, data, callback){
  	  // socket.emit(eventName, data, function(){
  	  // 	var args = arguments;
  	  // 	$rootScope.$apply(function(){
  	  // 		if(callback){
  	  // 		  callback.apply(socket, args);
  	  // 		}
  	  // 	});
  	  // });

      socket.emit(eventName, data);
  	}
  };
});