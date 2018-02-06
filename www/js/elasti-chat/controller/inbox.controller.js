elastiChat.controller('ChatInboxCtrl', function($rootScope, $state, $scope, MockService, SocketFactory, $sanitize){
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


































	var self = this;
	SocketFactory.on('connect', function(){
		SocketFactory.emit('add user', 'nickname');
	});

	SocketFactory.on('new message', function(data){
		addMessageToList(data.username, true, data.message);
	});

	self.sendMessage = function(){
		SocketFactory.emit('new message', self.message);
		addMessageToList($stateParams.nickname, true, self.message);
		SocketFactory.emit('stop typing');
		self.message = "";
	};

	function addMessageToList(username, style_type, message){
		username = $sanitize(username);
		var color = style_type ? getUsernameColor(username) : null;
		self.messages.push({content: $sanitize(message), style: style_type, username: username, color: color});
		$ionicScrollDelegate.scrollBottom();
	};

	SocketFactory.on('user joined', function(data){
		addMessageToList("", false, data.username + " joined");
		addMessageToList("", false, message_string(data.numUsers));
	});

	SocketFactory.on('user left', function(data){
		addMessageToList("", false, data.username + " left");
		addMessageToList("", false, message_string(data.numUsers));
	});

	function message_string(number_of_users){
		return number_of_users === 1 ? "there's 1 participant" : "there are " + number_of_users + " participants";
	};

	SocketFactory.on('typing', function(data){
		addChatTyping(data);
	});

	SocketFactory.on('stop typing', function(data){
		removeChatTyping(data.username);
	});

	function addChatTyping(data){
		addMessageToList(data.username, true, " is typing");
	};

	function removeChatTyping(username){
		self.messages = self.messsages.filter(function(element){
			return element.username != username || element.content != " is typing";
		});
	};

	function sendUpdateTyping(){
		if(connected){
			if(!typing){
				typing = true;
				SocketFactory.emit('typing');
			}
		};
		lastTypingTime = (new Date()).getTime();
		$timeout(function(){
			var typingTimer = (new Date()).getTime();
			var timeDiff = typingTimer - lastTypingTime;
			if(timeDiff >= TYPING_TIMER_LENGTH && typing){
				socket.emit('stop typing');
				typing = false;
			}
		}, TYPING_TIMER_LENGTH);
	};
});