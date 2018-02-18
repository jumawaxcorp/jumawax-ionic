elastiChat.factory('SocketFactory', function($rootScope, $stomp){
  var socket = io.connect('localhost:4000');
  var socketIO = {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };

  var stomp = $stomp.connect('http://localhost:8090/ws');
  return {
    socketIO: socketIO,
    stomp: stomp
  };
});