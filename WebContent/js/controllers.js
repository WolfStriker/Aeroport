angular.module('app')

/**
 * TabsCtrl
 * Controller gérant la navigatio dans l'application
 */
.controller('TabsCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, LoginEventDispatcher){
  'use strict';
  
	// Creation du modal de deconnexion
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
  	
	/**
	 * showLoginModal
	 * Affiche la pop-up de connexion
	 */
  	var showLoginModal = function()
  	{
  		$scope.loginModal.show();
  	};
  	
  	/**
  	 * Ecoute sur l'évènement LOGOFF (déconnexion de l'utilisateur)
  	 */
  	$scope.$on('LOGOFF', function() {
  		console.log("Déconnexion !");
  		showLoginModal();
  	});
})

/**
 * HotelsCtrl
 * Controller gérant la page des hôtels
 */
.controller('HotelsCtrl', function($scope, $ionicModal, $ionicPopover, $timeout, HotelsSrv){
  'use strict';

  	// Creation du modal de deconnexion
  	$ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    scope: $scope,
  	}).then(function(popover) {
  		$scope.popover = popover;
  	});
  
  	/**
  	 * La liste des hôtels
  	 */
  	$scope.hotels = [];
  	
  	/**
  	 * Filtre de recherche sur la ville de l'hotel
  	 */
  	$scope.searchVille = '';

  	/**
  	 * showPub
  	 * Affiche l'écran des publicités
  	 */
	$scope.showPub = function(){
  		window.open("views/pub.html",'_blank');
  	};
  	
  	/**
  	 * getHotels
  	 * Récupère la liste des hôtels
  	 */
  	var getHotels = function(){
  		// appel au service de récupération des hôtels
  		HotelsSrv.getHotels().then(function(result){
			$scope.hotels = result;
		});
    };
    
    /**
     * createHotel
     * Crée d'un nouvel hôtel
     * @param l'hotel à ajouter
     */
	$scope.createHotel = function(hotel) {
		console.log("HotelsCtrl : createHotel");
		
	    if(!hotel) { return; }
    
	    var data = {
			nom 	:		hotel.nom,
			etoiles	:		hotel.etoiles,
			prix	:		hotel.prix,
			ville	:		hotel.ville
	    };
	    // appel au service de création d'un hotel
	    HotelsSrv.addHotel(data).then(function(result){
			getHotels();
		});
	    
	    // on cache le modal d'ajout de vol
	    $scope.newHotelModal.hide();
  	};
    
  	/**
  	 * newHotel
  	 * Handler de la demande de création d'hotel sur la vue
  	 */
    $scope.newHotel = function() {
    	// affiche la pop-up de création d'un hotel
    	$scope.newHotelModal.show();
  	};
  	
  	/**
  	 * closeNewHotel
  	 * Handler de la demande de suppression d'un hotel
  	 */
  	$scope.closeNewHotel = function() {
  		// cache la pop-up de création d'un hotel
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
  	
  	/**
  	 * onHotelDelete
  	 * Handler de la demande de suppression d'un hotel
  	 * @param l'hotel  à supprimer
  	 */
  	$scope.onHotelDelete = function(hotel) {
  		if(!hotel) { return; }
  		// récupération de l'id de l'hotel que l'on souhaite supprimer
  		var idHotel = hotel.id;
  		// appel au service de suppression d'un hotel
  		HotelsSrv.deleteHotel(idHotel).then(function(result){
  			// récupération des hôtels
  			getHotels();
		});
  		
		var i = 0;
		for(i; i<$scope.hotels.length; i++)
		{	
			// suppression de l'affichage de l'hotel dans la vue
			if($scope.hotels[i] === hotel)
				$scope.hotels.splice(i,1);
		}
	};
    
	/**
	 * doRefresh
	 * Handler de la demande de rafraichissement de la liste des hotels
	 */
    $scope.doRefresh = function(){
    	// récupère la liste des hotels
    	getHotels();
      	// stop l'animation de rafraichissement
      	$scope.$broadcast('scroll.refreshComplete');
  	};
    
  	
    $timeout(function() {
    	getHotels();
  	});
})

/**
 * VolsCtrl
 * Controller gérant la page des vols
 */
.controller('VolsCtrl', function($scope, $http,  $timeout, $ionicModal, $ionicPopover, $ionicSideMenuDelegate, VolsSrv){
  'use strict';
  
  	$scope.data = {
    	showDelete: false,
    	showOption: true
  	};
  	
  	/**
  	 * Filtre de recherche sur la ville de départ
  	 */
  	$scope.searchVilleDepart = '';
  	
  	/**
  	 * Filtre de recherche sur la ville destination
  	 */
  	$scope.searchVilleDestination = '';
  
  	/**
  	 * La liste des vols
  	 */
  	$scope.vols = [];
  	
  	/**
  	 * getVols
  	 * Récupère la liste des vols
  	 */
	var getVols = function(){
		// appel au service de récupération des vols
	  	VolsSrv.getVols().then(function(result){
			$scope.vols = result;
		});
    };
    
    /**
     * createVol
     * Ajoute un nouveau vol
     * @param le vol à ajouté
     */
	$scope.createVol = function(vol) {
		console.log("VolsCtrl : createVol");
		
	    if(!vol) { return; }
    
	    // formatage des dates
    	var date = new Date(vol.dateDepart);
    	var _dateDepart = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    	date = new Date(vol.dateArrivee);
    	var _dateArrivee = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    	// création du vol
	    var data = {
			lieuDepart :	vol.villeDepart,
			lieuArrivee:	vol.villeArrivee,
			dateDepart  :	_dateDepart,
			dateArrivee :	_dateArrivee,
			prix		:	vol.prix
	    };
	    
	    // appel au service d'ajout d'un vol
	    VolsSrv.addVol(data).then(function(result){
			getVols();
		});
	    
	    // on cache le modal d'ajout de vol
	    $scope.newVolModal.hide();
  	};
    
  	/**
  	 * newVol
  	 * Handler de la demande de création d'un nouveau vol
  	 */
    $scope.newVol = function() {
    	$scope.newVolModal.show();
  	};
  	
  	/**
  	 * closeNewVol
  	 * Handler de la demande de fermeture de la pop-up de création de vol
  	 */
  	$scope.closeNewVol = function() {
    	$scope.newVolModal.hide();
  	};
  	
  	/**
  	 * onVolDelete
  	 * Handler de la demande de suppression d'un vol
  	 * @param le bol à supprimer
  	 */
  	$scope.onVolDelete = function(vol) {
  		if(!vol) { return; }
  		// récupération de l'id du vol que l'on souhaite supprimer
  		var idVol = vol.id;
  		// appel au service de suppression d'un vol
  		VolsSrv.deleteVol(idVol).then(function(result){
  			// récupération des vols
			getVols();
		});
  		
		var i = 0;
		for(i; i<$scope.vols.length; i++)
		{	
			// suppression du vol dans l'affichage
			if($scope.vols[i] === vol)
				$scope.vols.splice(i,1);
		}
	};
	
	/**
	 * showPub
	 * Affiche la page des publicités
	 */
	$scope.showPub = function() {
		window.open("views/pub.html",'_blank');
	};
	
	/**
	 * showPubByVol
	 * Affiche la prévisualisation d'une pub pour un vol
	 * @param le vol dont on veut prévisualiser la pub
	 */
	$scope.showPubByVol = function(vol) {
		window.open("views/pub.html#?idVol="+vol.id,'_blank');
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
  	// Création du modal de déconnexion
	$ionicPopover.fromTemplateUrl('views/partials/menu-popover.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover = popover;
  	});

	/**
	 * doRefresh
	 * Handler de la demande de rafraichissement des vols
	 */
    $scope.doRefresh = function(){
    	// récupération des vols
    	getVols();
      	// stop l'animation de rafraichissement des vols
      	$scope.$broadcast('scroll.refreshComplete');
  	};
  	
  	$timeout(function() {
  		getVols();
  	});
})

/**
 * LoginCtrl
 * Controller gérant le login de l'administrateur
 */

.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup, UserSrv, LoginEventDispatcher) {


	$scope.login = "admin";
	$scope.password = "admin";
	$scope.connected = false;

	/**
	 * connexion
	 * Tente de connecter l'utilisateur
	 * @param identidiants Tableau contenant le login et password saisis par l'utilisateur
	 */	
	$scope.connexion = function(identifiants){ 
		// si les identifiants sont les bons{
		if(identifiants.login == $scope.login && identifiants.password == $scope.password)
	    {
			// l'utilisateur est connecté{
	    	$scope.connected = true
	    	// on cache la pop-up de connexion;
	    	$scope.loginModal.hide();
	    	console.log("Authentification réussie.");
	    }
		// sinon
		else
		{
			// affichage d'une pop-up d'erreur{
			$ionicPopup.alert({
		        title: 'Connexion impossible',
				template: 'Les identifiants saisis sont incorrects.'
	        });
	    }
	};

	/**
	 * logoff
	 * Déconnecte l'utilisateur courant
	 */	
	$scope.logoff = function()
	{
		$scope.connected = false
		// dispatch l'evenement de déconnexion sur le bus d'evenements;
		LoginEventDispatcher.dispatchEvent('LOGOFF');
	};
 
	// Appel au service de récupération des informations de l'utilisateur
	// nom, photo etc... 
	UserSrv.getUserInfos().then(function(user){
		$scope.user = user;
	});
	
	// Appel au service de récupération des identfiants de l'utilisateur
	UserSrv.getUserIdentifiants().then(function(result){
		$scope.login = result.login;
		$scope.password = result.password;
	});
})

;