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

.controller('VolsCtrl', function($scope, $http,  $timeout, $ionicModal, $ionicPopover, $ionicSideMenuDelegate){
  'use strict';
  
  	$scope.data = {
    	showDelete: false,
    	showOption: true
  	};
  
  	$scope.vols = [];
  
	var getVols = function(){
			// appel au service
	        /*$http({
	            method: 'POST',
	            url: 'http://localhost:8080/Aeroport/api/test',
	            headers: {'Content-Type': 'application/json'}
	    	  }).success(function (data) 
	    	  {
	        	  console.log(data);
	        });*/
	       
		$scope.vols.push({
			villeDepart :	"Paris",
			villeArrivee:	"Madrid",
			dateDepart  :	"12/05/2016",
			heureDepart : 	"10h30",
			dateArrivee :	"12/05/2016",
			heureArrivee: 	"10h31",
			prix		  : "3"
		});
		
		$scope.vols.push({
			villeDepart :	"Paris",
			villeArrivee:	"Londre",
			dateDepart  :	"13/06/2020",
			heureDepart : 	"11h20",
			dateArrivee :	"13/06/2020",
			heureArrivee: 	"23h20",
			prix		  : "445"
		});
        
    };
    
	$scope.createVol = function(vol) {
	    if(!vol) { return; }
    
    	var date = new Date(vol.dateDepart);
    	var _dateDepart = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    	date = new Date(vol.dateArrivee);
    	var _dateArrivee = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
	    // ajout des données
	    // ici en local, plus tard via l'API java
	    $scope.vols.push({
	    	villeDepart :	vol.villeDepart,
	    	villeArrivee:	vol.villeArrivee,
	    	dateDepart  :	_dateDepart,
	    	heureDepart : 	vol.heureDepart,
	    	dateArrivee :	_dateArrivee,
	    	heureArrivee: 	vol.heureArrive,
	    	prix		: 	vol.prix
	    });
	    
	    // on cache le modal d'ajout de vol
	    $scope.newVolModal.hide();
    
//    var data = {
//		  villeDepart :	vol.villeDepart,
//		  villeArrivee:	vol.villeArrivee,
//		  dateDepart  :	_dateDepart,
//		  heureDepart : vol.heureDepart,
//		  dateArrivee :	_dateArrivee,
//		  heureArrivee: vol.heureArrive,
//		  prix		  : vol.prix
//    };
//    
//    // appel au service d'enregistrement d'un vol
//    $http({
//        method: 'POST',
//        url: 'http://localhost:8080/Aeroport/api/addVol',
//        headers: {'Content-Type': 'application/json'},
//        data: data
//	  }).success(function (_data) 
//	  {
//    	  console.log(_data);
//		  console.log("Vol enregistré !")
//    });

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
		//$scope.editVolModal.show();
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
	
	 		// appel au service
			$http({
			    method: 'POST',
			    url: 'http://localhost:8080/Aeroport/api/test',
			    headers: {'Content-Type': 'application/json'}
			  }).success(function (data) 
			  {
				  console.log(data);
			});
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
