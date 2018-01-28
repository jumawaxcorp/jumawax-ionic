homeModule.controller('HomeCtrl', function($scope, $state, $timeout, GlobalUtil, LoadingService, GlobalConstant,
  PJPService){
  $scope.images = [];

  $scope.loadImages = function() {
      for(var i = 0; i < 10; i++) {
          $scope.images.push({id: i, src: "http://placehold.it/50x50"});
      }
  }

  $scope.menus = [
    {
      id: 1, 
      name: "Journey Plan",
      link: 'pjp',
      image: "img/store.jpg" 
    },
    {
      id: 2, 
      name: "Chat",
      link: 'chat',
      image: "img/chat.jpg"    
    },
    {
      id: 3, 
      name: "Report",
      link: 'report',
      image: "img/report.jpg"    
    }
  ];

  $scope.menuClicked = function(link){
    LoadingService.start(GlobalConstant.loadingSpinner.ripple);

    $timeout(function(){
      LoadingService.stop();
      $state.go(link);
    }, 1000);
  };
});