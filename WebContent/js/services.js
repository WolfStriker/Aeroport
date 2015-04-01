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
    	
    	// appel au service
    	$http({
    	  method: 'GET',
    	  url: 'http://localhost:8080/Aeroport/vols.htm',
    	  headers: {'Content-Type': 'application/json'}
    	}).success(function (data) 
    	{
    		  console.log(data);
    		  vols = data;
    	});
    	
//    	vols.push({
//	    	villeDepart :	"Paris",
//	    	villeArrivee:	"Madrid",
//	    	dateDepart  :	"12/05/2016",
//	    	heureDepart : 	"10h30",
//	    	dateArrivee :	"12/05/2016",
//	    	heureArrivee: 	"10h31",
//	    	prix		  : "3"
//    	});
//    	
//    	vols.push({
//	    	villeDepart :	"Paris",
//	    	villeArrivee:	"Londre",
//	    	dateDepart  :	"13/06/2020",
//	    	heureDepart : 	"11h20",
//	    	dateArrivee :	"13/06/2020",
//	    	heureArrivee: 	"23h20",
//	    	prix		  : "445"
//    	});
    	
      return $q.when({vols: vols});
    },
    
    /**
     * Ajoute un vol
     * @param le vol à ajouter
     * @return l'id du vol ajouté
     */
    addVol: function(vol){
//      // appel au service d'ajout d'un vol
//      $http({
//          method: 'POST',
//          url: 'http://localhost:8080/Aeroport/api/addVol.html',
//          headers: {'Content-Type': 'application/json'},
//          data: vol
//  	  }).success(function (result) 
//  	  {
//      	  console.log(result);
//      });
    	return $q.when({id: 0});
    }
  };

  return volsSrv;
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
