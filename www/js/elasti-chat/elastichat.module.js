var elastiChat = angular.module('ElastiChatModule', ['ngCordova', 'ngAnimate', 'monospaced.elastic', 'angularMoment', 
  'ngSanitize', 'ngStomp']);

elastiChat.run(function($rootScope){
  $rootScope.$on('$stateChangeStart', function(event){
    $rootScope.user = {
      _id: '534b8fb2aa5e7afc1b23e69c',
      pic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      username: 'Marty'
    };
    $rootScope.toUser = {
      _id: '534b8e5aaa5e7afc1b23e69b',
      pic: 'http://www.nicholls.co/images/nicholls.jpg',
      username: 'Nicholls'
    };
  });
});

elastiChat.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

  .state('app.elasti-chat', {
    url: '/elasti-chat',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'js/elasti-chat/views/chat.html',
        controller: 'ElastiChatCtrl'
      }
    }
  })
  .state('app.inbox', {
    url: '/inbox',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'js/elasti-chat/views/inbox.html',
        controller: 'ChatInboxCtrl'
      }
    }
  });
});