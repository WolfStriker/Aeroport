<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <title>Aeroport</title>

    <link href="lib/ionic/css/ionic.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">

    <!-- IF using Sass (run gulp sass first), then uncomment below and remove the CSS includes above
    <link href="css/ionic.app.css" rel="stylesheet">
    -->

    <!-- ionic/angularjs js -->
    <script src="lib/ionic/js/ionic.bundle.js"></script>

    <!-- cordova script
    <script src="cordova.js"></script>-->

    <!-- js de l'appli -->
    <script src="js/app.js"></script>

<script type="text/javascript" src="angular/angular1.2.28.min.js"></script>

<script type="text/javascript">
function ClientControl($scope,$http) {
	$scope.client = {};
	$scope.enregistrerClient = function () {
		//alert("creerClient");
	      $http({
	          method: 'POST',
	          url: 'enregistrerClient.htm',
	          headers: {'Content-Type': 'application/json'},
	          data:  $scope.client,
	        }).success(function (data) 
	          {
	        	//alert("nb clients "+data.length);
	        	$scope.erreurs = data;
	        	if (data.res == "SUCCESS") {
	     			//alert("success");
	     			$scope.mess = "Client " + $scope.client.nom + " enregistré";
	     			$scope.client.nom = "";
	     			$scope.client.prenom = "";
	     			$http({
	    	          method: 'GET',
	    	          url: 'listerClients.htm',
	    	          headers: {'Content-Type': 'application/json'},
	    	     	}).success(function (data) 
	    	        {
	    	        	//alert("nb clients "+data.length);
	    	        	$scope.listeClients = data;
	    	      	});

	        	}
	          });

	};
	
	
}
</script>


</head>
<body ng-app="teleAffichage" ng-controller="MainCtrl">
	  <ion-side-menus>
	
	    {% raw %}
		<!-- Center content -->
		<ion-side-menu-content>
			<ion-header-bar class="bar-positive">
				<button class="button button-icon" ng-click="toggleProjects()">
		      		<i class="icon ion-navicon"></i>
		    	</button>
		    	
			    <h1 class="title">Administration des pubs | {{activeProject.title}}</h1>
			    
			    <!-- Reorder button -->
			    <!--<button class="button button-icon icon ion-shuffle"
			    	ng-click="data.showDelete = false; data.showReorder = !data.showReorder">
		     </button>-->
			    
			    <!-- Delete button -->
			    <button class="button button-icon icon ion-minus-circled" 
          			ng-click="data.showDelete = !data.showDelete; data.showReorder = false">
      			</button>
			    
			    <!-- New Task button-->
			    <button class="button button-icon icon ion-plus-circled" ng-click="newTask()">
			    </button>
		  	</ion-header-bar>
		  	
		  	<!-- content -->
		  	<ion-content scroll="false">
			    <ion-list show-delete="data.showDelete" show-reorder="data.showReorder" show-option="date.showOption">
		      		<ion-item ng-repeat="task in activeProject.tasks" task="task" class="item-remove-animate">
			        	<b>{{task.villeDepart}} - {{task.villeArrivee}}</b> - {{task.dateDepart}} - {{task.prix}}€
			        	
			        	<ion-delete-button class="ion-minus-circled" ng-click="onItemDelete(task)"></ion-delete-button><!-- delete -->
			        	<ion-option-button class="ion-edit" ng-click="edit(task)"></ion-option-button><!-- edit -->
			     	</ion-item>
			    </ion-list>
		  	</ion-content>
		  	<!-- fin content -->
		  	
		</ion-side-menu-content>
			
	     <!-- Left menu -->
		  <ion-side-menu side="left">
		    <ion-header-bar class="bar-light">
		      <h1 class="title">Catégories</h1>
		      <!-- <button class="button button-icon ion-plus" ng-click="newProject()"></button>-->
		    </ion-header-bar>
		    <ion-content scroll="false">
		      <ion-list>
		        <ion-item ng-repeat="project in projects" ng-click="selectProject(project, $index)" ng-class="{active: activeProject == project}">
		          {{project.title}}
		        </ion-item>
		      </ion-list>
		    </ion-content>
		  </ion-side-menu>
        </ion-side-menus>



		
		<script id="connexion.html" type="text/ng-template">

			<div class="modal" ng-controller="LoginCtrl">
		
		    	<ion-header-bar class="bar-secondary">
		      		<h1 class="title">Connexion</h1>
		    	</ion-header-bar>
		
		    	<ion-content>
		      		<form ng-submit="connexion(identifiants)">
		        		<div class="list">

		          			<label class="item item-input">
		            			<input type="text" placeholder="Login" required ng-model="identifiants.login">
		          			</label>

				  			<label class="item item-input">
		            			<input type="password" placeholder="Mot de passe" required ng-model="identifiants.password">
		          			</label>

		          				<button class="button button-block button-positive">Connexion</button>
						</div>
		      		</form>
		    	</ion-content>
		  </div>
		</script>
		
		
		 <script id="new-fly.html" type="text/ng-template">

		  <div class="modal">
		
		    <!-- Modal header bar -->
		    <ion-header-bar class="bar-secondary">
		      <h1 class="title">Nouvelle publicité</h1>
		      <button class="button button-clear button-positive" ng-click="closeNewTask()">Annuler</button>
		    </ion-header-bar>
		
		    <!-- Modal content area -->
		    <ion-content>
		
		      <form ng-submit="createTask(task)">
		        <div class="list">

				  <label class="item item-input item-select">
    				<div class="input-label">
      					Ville de départ :
    				</div>
    				<select ng-model="task.villeDepart" requires>
      					<option selected>Paris</option>
      					<option>Londres</option>
      					<option>Madrid</option>
						<option>Lisbonne</option>
						<option>Copenhague</option>
						<option>Rome</option>
    				</select>
  				  </label>

				  <label class="item item-input item-select">
    				<div class="input-label">
      					Destination :
    				</div>
    				<select ng-model="task.villeArrivee" required>
      					<option>Paris</option>
      					<option selected>Londres</option>
      					<option>Madrid</option>
						<option>Lisbonne</option>
						<option>Copenhague</option>
						<option>Rome</option>
    				</select>
  				  </label>

				  <label class="item item-input">
					Date de départ : 
					<input type="date" ng-model="task.dateDepart" required>
				  </label>

				  <label class="item item-input">
					Heure de départ : 
					<input type="time" ng-model="task.heureDepart" required>
				  </label>

				  <label class="item item-input">
					Date d'arrivée :
					<input type="date" ng-model="task.dateArrivee" required>
				  </label>

				  <label class="item item-input">
					Heure d'arrivée : 
					<input type="time" ng-model="task.heureArrivee" required>
				  </label>

				  <label class="item item-input">
					Prix : 
		            <input type="text" placeholder="saisissez le prix du vol" ng-model="task.prix" required>
		          </label>
		        </div>
		        <div class="padding">
		          <button type="submit" class="button button-block button-positive">Ajouter Pub</button>
		        </div>
		      </form>
		
		    </ion-content>
		
		  </div>
		</script>
	</body>
  
</html>