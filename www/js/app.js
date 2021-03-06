// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', [
  'ionic', 'chart.js', 'ngCordova', 'ngStorage', 'ngAnimate',
  'AuthModule', 'HomeModule', 'PJPModule', 'ElastiChatModule',
  'LoginMod', 'PJPMod', 'ReportMod', 'ChatMod'
]);

app.run(function($ionicPlatform, $state, $rootScope, $location) {
  console.log($location.path());
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    var requireLogin = toState.data.requireLogin;

    if(requireLogin && typeof $rootScope.currentUser === 'undefined'){
      event.preventDefault();
      $state.go('login');
    }
  });


  // $ionicPlatform.registerBackButtonAction(function(e){
  //   if($location.path() === "/app/home" || $location.path() === "app/home"){
      
  //     alert('gerak brrooooooooooooooo');
      
  //   }
  // }, 101);

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    data: {
      requireLogin: true
    }
  })


  .state('app.report', {
    url: '/report',
    views: {
      'menuContent': {
        templateUrl: 'templates/report.html',
        controller: 'ReportCtrl'
      }
    }
  })  
  .state('app.chat', {
    url: '/chat',
    views: {
      'menuContent': {
        templateUrl: 'templates/chat.html',
        controller: 'ChatCtrl'
      }
    }
  })




  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});