elastiChat.controller('ChatInboxCtrl', function($rootScope, $state, $scope, MockService, SocketFactory, $sanitize,
	$stomp){
	$scope.toUser = $rootScope.toUser;

	MockService.getUserMessages({
		toUserId: $scope.toUser._id
	}).then(function(data){
		$scope.messages = data.messages;
		$scope.lastMessage = getLastArray($scope.messages);

		// document.getElementsByClassName("inbox-notif")[0].setAttribute("hidden", "true");
		if(data.unread != 0){
			var notif = document.getElementsByClassName("inbox-notif")[0];
			notif.removeAttribute("hidden");
			document.getElementById("inbox").style.backgroundColor = "orange";
		}
	});

	getLastArray = function(array){
		return array[array.length - 1];
	};

	$scope.enterChat = function(){
		$state.go('app.elasti-chat');
	};

	var socket = io.connect('localhost:3000');

	socket.emit('chat message', 'kontol');
  socket.on('chat message', function(msg){
  	console.log(msg);
  });
  SocketFactory.socketIO.on('init', function(data){
  	console.log(data);
  });

	SocketFactory.socketIO.emit('chat message', 'kontol');
  SocketFactory.socketIO.on('chat message', function(msg){
  	console.log(msg);
  });







  SocketFactory.stomp
  	.then(function(frame){
  			console.log('masuk ga anjing');
  		$stomp.subscribe('/topic/public', function(payload){
  			var Message = JSON.parse(payload.body);
  			console.log(message.sender);
  		}, {
  			'headers': 'babi luuuuuuuuuuuuuuuuuuu'
  		});

	    $stomp.send("/app/chat.addUser", 
	    	{},
	      JSON.stringify({sender: 'anjing babi', type: 'JOIN'})
	    );
  	}, function(error){
  		console.log(error);
  	});

});