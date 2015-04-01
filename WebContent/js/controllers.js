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

.controller('HotelsCtrl', function($scope, $ionicModal, $ionicPopover){
  'use strict';

  
  $ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
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
	    
	    $scope.vols.push(vol);
	    
	    VolsSrv.addVol(vol).then(function(result){
			console.log("Ajout d'un vol OK");
			console.log("Id du vol :" + result.id);
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
