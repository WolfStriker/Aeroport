angular.module('app')

.controller('TabsCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, LoginEventDispatcher){
  'use strict';
  
	// Creation du modal de connexion
	$ionicModal.fromTemplateUrl('views/partials/login-modal.html', function(modal) {
		$scope.loginModal = modal;
  	}, {
		scope: $scope,
	  	animation: 'slide-in-up',
	  	focusFirstInput: true,
	  	backdropClickToClose: false,
	  	hardwareBackButtonClose: false
  	}).then(
  		function(){
  			showLoginModal();
  		});
  		
  	var showLoginModal = function()
  	{
  		$scope.loginModal.show();
  	};
  	
  	$scope.$on('LOGOFF', function() {
  		console.log("Déconnexion !");
  		$scope.loginModal.show();
  	});
})

.controller('HotelsCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, HotelsSrv){
  'use strict';

  
  $ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  
	$scope.hotels = [];

	$scope.showPub = function(){
  		window.open("views/pub.html",'_blank');
  	};
  	
  	var getHotels = function(){
  		HotelsSrv.getHotels().then(function(result){
			console.log("Résultat de la récupération des hotels : ");
			console.log(result);
			$scope.hotels = result;
		});
    };
    
	$scope.createHotel = function(hotel) {
		console.log("HotelsCtrl : createHotel");
		
	    if(!hotel) { return; }
    
	    var data = {
			nom 	:		hotel.nom,
			etoiles	:		hotel.etoiles,
			prix	:		hotel.prix
	    };
	    
	    HotelsSrv.addHotel(data).then(function(result){
			getHotels();
		});
	    
	 // on cache le modal d'ajout de vol
	    $scope.newHotelModal.hide();
  	};
    
    $scope.newHotel = function() {
    	$scope.newHotelModal.show();
  	};
  	
  	$scope.closeNewHotel = function() {
    	$scope.newHotelModal.hide();
  	};
  	
  	// Creation du modal d'ajout d'un hotel
  	$ionicModal.fromTemplateUrl('views/partials/new-hotel-modal.html', function(modal) {
    	$scope.newHotelModal = modal;
  	}, {
	  	scope: $scope,
	  	animation: 'slide-in-up',
	  	focusFirstInput: true,
	  	backdropClickToClose: false,
		hardwareBackButtonClose: false
  	});
  	
  	$scope.onHotelDelete = function(hotel) {
  		if(!hotel) { return; }
  		
  		var idHotel = hotel.id;
  		
  		HotelsSrv.deleteHotel(idHotel).then(function(result){
			getHotels();
		});
  		
		var i = 0;
		for(i; i<$scope.hotels.length; i++)
		{	
			if($scope.hotels[i] === hotel)
				$scope.hotels.splice(i,1);
		}
	};
    
    $scope.doRefresh = function(){
    	getHotels();
      	// Stop the ion-refresher from spinning
      	$scope.$broadcast('scroll.refreshComplete');
  	};
    
    $timeout(function() {
    	getHotels();
  	});

})

.controller('VolsCtrl', function($scope, $http,  $timeout, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, VolsSrv){
  'use strict';
  
  	$scope.data = {
    	showDelete: false,
    	showOption: true
  	};
  
  	$scope.vols = [];
  	
  	$scope.showPub = function(){
  		window.open("views/pub.html",'_blank');
  	};
  	
	var getVols = function(){
	  	VolsSrv.getVols().then(function(result){
			console.log("Résultat de la récupération des vols : ");
			console.log(result);
			$scope.vols = result;
		});
    };
    
	$scope.createVol = function(vol) {
		console.log("VolsCtrl : createVol");
		
	    if(!vol) { return; }
    
    	var date = new Date(vol.dateDepart);
    	var _dateDepart = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    	date = new Date(vol.dateArrivee);
    	var _dateArrivee = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
	    var data = {
			lieuDepart :	vol.villeDepart,
			lieuArrivee:	vol.villeArrivee,
			dateDepart  :	_dateDepart,
			dateArrivee :	_dateArrivee,
			prix		:	vol.prix
	    };
	    
	    VolsSrv.addVol(data).then(function(result){
			getVols();
		});
	    
	 // on cache le modal d'ajout de vol
	    $scope.newVolModal.hide();
  	};
    
    $scope.newVol = function() {
    	$scope.newVolModal.show();
  	};
  	
  	$scope.closeNewVol = function() {
    	$scope.newVolModal.hide();
  	};
  	
  	$scope.onVolDelete = function(vol) {
  		if(!vol) { return; }
  		
  		var idVol = vol.id;
  		
  		VolsSrv.deleteVol(idVol).then(function(result){
			getVols();
		});
  		
		var i = 0;
		for(i; i<$scope.vols.length; i++)
		{	
			if($scope.vols[i] === vol)
				$scope.vols.splice(i,1);
		}
	};
	
	$scope.editVol = function(vol) {
		$scope.editVolModal.show();
	};
  	
  	// Creation du modal d'ajout d'un vol
  	$ionicModal.fromTemplateUrl('views/partials/new-vol-modal.html', function(modal) {
    	$scope.newVolModal = modal;
  	}, {
	  	scope: $scope,
	  	animation: 'slide-in-up',
	  	focusFirstInput: true,
	  	backdropClickToClose: false,
		hardwareBackButtonClose: false
  	});
  	
	$ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover = popover;
  	});

    $scope.doRefresh = function(){
    	getVols();
      	// Stop the ion-refresher from spinning
      	$scope.$broadcast('scroll.refreshComplete');
  	};
  	
  	$timeout(function() {
  		getVols();
  	});
})

.controller('PubCtrl', function($scope) {
	

})

.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup, UserSrv, LoginEventDispatcher) {
	
	$scope.login = "admin";
	$scope.password = "admin";
	$scope.connected = false;
	
	$scope.connexion = function(identifiants) {
		if(identifiants.login == $scope.login && identifiants.password == $scope.password)
	    {
	    	$scope.connected = true;
	    	$scope.loginModal.hide();
	    	console.log("Authentification réussie.");
		}
		else
		{
			$ionicPopup.alert({
		        title: 'Connexion impossible',
				template: 'Les identifiants saisis sont incorrects.'
	        });
	    }
	};
	
	$scope.logoff = function()
	{
		$scope.connected = false;
		LoginEventDispatcher.dispatchEvent('LOGOFF');
	};
  
	UserSrv.getUser().then(function(user){
		$scope.user = user;
	});
})

;
