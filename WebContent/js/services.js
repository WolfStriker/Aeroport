angular.module('app')

/**
 * Service des utilisateurs
 */
.factory('UserSrv', function($q){
  'use strict';
  var service = {
	/**
	 * getUserInfos
	 * Récupère les informations de l'utilisateur
	 * @return les informations concernant l'utilisateur
	 */
    getUserInfos: function(){
    	console.log("UserSrv : getUser");
    	return $q.when({id: 'admin', name: 'Administrator', avatar: 'img/empty-profile.jpg'});
    },
    
    /**
     * getUserIdentifiants
     * Récupère les identifiants de l'utilisateur
     * @return les identifiants
     */
    getUserIdentifiants: function(){
    	console.log("UserSrv : getUserIdentifiants");
    	return $q.when({login: 'admin', password: 'admin'});
    }
  };

  return service;
})

/**
 * Service opérant du les vols
 */
.factory('VolsSrv', function($q, $http){
  'use strict';
  var volsSrv = {
		  
	/**
	 * getVols
	 * Récupère la liste des vols
	 * @return la liste des vols
	 */
    getVols: function(){
    	console.log("VolsSrv : getVols");
    	var vols = [];
    	// appel au service java de récupation des vols
    	var promise = $http.get('vols.htm').then(function (response) {
            console.log(response);
            return response.data;
          });
    	
    	return promise;
    },
    
    /**
     * addVol
     * Ajoute un vol
     * @param le vol à ajouter
     * @return le vol ajouté
     */
    addVol: function(vol){
    	// appel au service java d'ajout d'un vol
    	var promise = $http.get('ajouterVol.htm', {params: {lieuDepart: vol.lieuDepart, lieuArrivee: vol.lieuArrivee, dateDepart: vol.dateDepart, dateArrivee: vol.dateArrivee, prix: vol.prix}}).then(function (response) {
            console.log(response);
            return response.data;
          });
    	
    	return promise;
    },
    
    /**
     * deleteVol
     * Supprime un vol
     * @param l'id du vol à supprimer
     * @return 
     */
    deleteVol: function(idVol){
    	// appel au service java de suppression d'un vol
    	var promise = $http({
  	      method: 'GET',
  	      url: 'supprimerVol.htm',
  	      params: {id: idVol}
  	    }).success(function(data, status, headers, config) {
  	      return data;
  	    });
      	
      	return promise;
    }
  };

  return volsSrv;
})

/**
 * Service opérant sur les hotels
 */
.factory('HotelsSrv', function($q, $http){
  'use strict';
  var hotelsSrv = {
		  
	/**
	 * getHotels
	 * Récupère la liste des hotels
	 * @return la liste des hotels
	 */
    getHotels: function(){
    	console.log("HotelsSrv : getHotels");
    	// appel au service java de récupération des vols
    	var promise = $http.get('hotels.htm').then(function (response) {
            console.log(response);
            return response.data;
          });
    	
    	return promise;
    },
    
    /**
     * addHotel
     * Ajoute un hotel
     * @param l'hotel à ajouter
     * @return l'hotel ajouté
     */
    addHotel: function(hotel){
    	// appel au service java d'ajout d'un hotel
    	var promise = $http({
	      method: 'GET',
	      url: 'ajouterHotel.htm',
	      params: {nom: hotel.nom, etoile: hotel.etoiles, prix: hotel.prix}
	    });
    	
    	return promise;
    },
    
    /**
     * deleteHotel
     * Supprime un hotel
     * @param l'id de l'hotel à supprimer
     * @return  l'hotel ajouté
     */
    deleteHotel: function(idHotel){
    	// appel au service java de suppression d'un hotel
    	var promise = $http({
  	      method: 'GET',
  	      url: 'supprimerHotel.htm',
  	      params: {id: idHotel}
  	    });
      	
      	return promise;
    }
  };

  return hotelsSrv;
})

/**
 * Service simulant un bus d'evenement
 */
.factory('LoginEventDispatcher', function($rootScope) {
	'use strict';
	
  	var loginEventDispatcher = {};

  	loginEventDispatcher.event = '';

  	loginEventDispatcher.dispatchEvent = function(_event) {
  		this.event = _event;
    	$rootScope.$broadcast(_event);
  	};

  	return loginEventDispatcher;
})
;