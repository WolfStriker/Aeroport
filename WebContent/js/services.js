angular.module('app')

.factory('UserSrv', function($q){
  'use strict';
  var service = {
    getUser: function(){
    	console.log("UserSrv : getUser");
    	return $q.when({id: 'admin', name: 'Administrator', avatar: 'img/empty-profile.jpg'});
    }
  };

  return service;
})

.factory('VolsSrv', function($q, $http){
  'use strict';
  var volsSrv = {
		  
	/**
	 * Récupère la liste des vols
	 * @return la liste des vols
	 */
    getVols: function(){
    	console.log("VolsSrv : getVols");
    	var vols = [];
    	
    	var promise = $http.get('vols.htm').then(function (response) {
            console.log(response);
            return response.data;
          });
    	
    	return promise;
    },
    
    /**
     * Ajoute un vol
     * @param le vol à ajouter
     * @return le vol ajouté
     */
    addVol: function(vol){
    	
    	var promise = $http.get('ajouterVol.htm', {params: {lieuDepart: vol.lieuDepart, lieuArrivee: vol.lieuArrivee, dateDepart: vol.dateDepart, dateArrivee: vol.dateArrivee, prix: vol.prix}}).then(function (response) {
            console.log(response);
            return response.data;
          });
    	
//    	var promise = $http({
//	      method: 'GET',
//	      url: 'ajouterVol.htm',
//	      params: {lieuDepart: vol.lieuDepart, lieuArrivee: vol.lieuArrivee, dateDepart: vol.dateDepart, dateArrivee: vol.dateArrivee, prix: vol.prix}
//	    }).then(function (response) {
//            console.log(response);
//            return response.data;
//          });
    	
    	return promise;
    },
    
    /**
     * Supprime un vol
     * @param l'id du vol à supprimer
     * @return 
     */
    deleteVol: function(idVol){
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

.factory('HotelsSrv', function($q, $http){
  'use strict';
  var hotelsSrv = {
		  
	/**
	 * Récupère la liste des hotels
	 * @return la liste des hotels
	 */
    getHotels: function(){
    	console.log("HotelsSrv : getHotels");
    	
    	var promise = $http.get('hotels.htm').then(function (response) {
            console.log(response);
            return response.data;
          });
    	
    	return promise;
    },
    
    /**
     * Ajoute un hotel
     * @param l'hotel à ajouter
     * @return l'hotel ajouté
     */
    addHotel: function(hotel){
    	var promise = $http({
	      method: 'GET',
	      url: 'ajouterHotel.htm',
	      params: {nom: hotel.nom, etoile: hotel.etoiles, prix: hotel.prix}
	    });
    	
    	return promise;
    },
    
    /**
     * Supprime un hotel
     * @param l'id de l'hotel à supprimer
     * @return 
     */
    deleteHotel: function(idHotel){
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


//vols.push({
//villeDepart :	"Paris",
//villeArrivee:	"Madrid",
//dateDepart  :	"12/05/2016",
//heureDepart : 	"10h30",
//dateArrivee :	"12/05/2016",
//heureArrivee: 	"10h31",
//prix		  : "3"
//});
//
//vols.push({
//villeDepart :	"Paris",
//villeArrivee:	"Londre",
//dateDepart  :	"13/06/2020",
//heureDepart : 	"11h20",
//dateArrivee :	"13/06/2020",
//heureArrivee: 	"23h20",
//prix		  : "445"
//});

//// appel au service
//$http({
//method: 'GET',
//url: 'http://localhost:8080/Aeroport/api/test.htm',
//headers: {'Content-Type': 'application/json'}
//}).success(function (data) 
//{
//  console.log(data);
//  vols = data;
//  return $q.when({vols: data});
//});

//return $q.when({vols: vols});
