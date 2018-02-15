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
		join($scope.toUser.username);
		$state.go('app.elasti-chat');
	};









	$scope.newCustomers = [];
	$scope.currentCustomer = {};

	var join = function(name){
		SocketFactory.emit('add-customer', name);
	};
	SocketFactory.on('notification', function(data){
		$scope.$apply(function(){
			$scope.newCustomers.push(data.customer);
		});

	});
});