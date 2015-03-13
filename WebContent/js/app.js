angular.module('teleAffichage', ['ionic'])

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // ajoute un nouveau projet
      return {
        title: projectTitle,
        tasks: []
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('MainCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  $scope.data = {
    showDelete: false,
    showOption: true
  };
  
  $scope.login = "admin";
  $scope.password = "admin";
  $scope.connected = false;
  
  $scope.edit = function(item) {
	  $scope.taskModal.show();
  };
  
  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.activeProject.tasks.splice(fromIndex, 1);
    $scope.activeProject.tasks.splice(toIndex, 0, item);
  };
  
  $scope.onItemDelete = function(item) {
    var i = 0;
    for(i; i<$scope.activeProject.tasks.length; i++)
    {	
    	if($scope.activeProject.tasks[i] === item)
    		$scope.activeProject.tasks.splice(i,1);
    }
    // sauvegarde
    Projects.save($scope.projects);
  };


  // craéation d'un projet
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  };


  // charge ou initialise les projets
  $scope.projects = Projects.all();

  // récupére le projet actif, le dernier chargé ou le premier de la liste
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Nouveau projet
  $scope.newProject = function() {
    var projectTitle = prompt('Nom de la catégorie');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  // Selection du projet
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  // Creation du modal de connexion
  $ionicModal.fromTemplateUrl('connexion.html', function(modal) {
	  $scope.connexionModal = modal;
  }, {
	  scope: $scope,
	  animation: 'slide-in-up',
	  focusFirstInput: true,
	  backdropClickToClose: false,
	  hardwareBackButtonClose: false
  });
  
  // Creation du modal d'ajout d'un vol
  $ionicModal.fromTemplateUrl('new-fly.html', function(modal) {
    $scope.taskModal = modal;
  }, {
	  scope: $scope,
	  animation: 'slide-in-up',
	  focusFirstInput: true,
	  backdropClickToClose: false,
	  hardwareBackButtonClose: false
  });


  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    
    var date = new Date(task.dateDepart);
    var _dateDepart = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    date = new Date(task.dateArrivee);
    var _dateArrivee = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    
    
    $scope.activeProject.tasks.push({
      villeDepart :	task.villeDepart,
      villeArrivee:	task.villeArrivee,
      dateDepart  :	_dateDepart,
      heureDepart : task.heureDepart,
      dateArrivee :	_dateArrivee,
      heureArrivee: task.heureArrive,
      prix		  : task.prix
    });
    $scope.taskModal.hide();

    Projects.save($scope.projects);

    task.title = "";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  }

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };


  // Creation du premier projet
  $timeout(function() {
    if($scope.projects.length == 0)
    {
    	createProject("Vols");
    	createProject("Hôtels");
    	$scope.activeProject = $scope.projects[0];
    }
    $scope.connexionModal.show();
  });

})

.controller('LoginCtrl', function($scope, $http, $state, $ionicPopup) {
	
	$scope.username = "admin";
	$scope.passwrd = "admin";
	$scope.connected = false;
	
	 $scope.connexion = function(identifiants) {
	    if(identifiants.login == $scope.login && identifiants.password == $scope.password)
	    {
	    	$scope.connected = true;
	    	$scope.connexionModal.hide();
	    }
	    else
	    {
	    	$ionicPopup.alert({
                title: 'Connexion impossible',
                template: 'Les identifiants saisis sont incorrects.'
            });
	    }
	  };
})

;