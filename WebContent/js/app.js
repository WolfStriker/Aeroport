angular.module('app', ['ionic'])

.config(function($stateProvider, $urlRouterProvider){
  'use strict';
  $stateProvider
  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'views/tabs.html',
    controller: 'TabsCtrl'
  })
  .state('tabs.vols', {
    url: '/vols',
    views: {
      'vols-tab': {
        templateUrl: 'views/vols.html',
        controller: 'VolsCtrl'
      }
    }
  })
  .state('tabs.hotels', {
    url: '/hotels',
    views: {
      'hotels-tab': {
        templateUrl: 'views/hotels.html',
        controller: 'HotelsCtrl'
      }
    }
  });
  
  $urlRouterProvider.otherwise('/tabs/vols');
})

.run(function($ionicPlatform) {
  'use strict';
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
