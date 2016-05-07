(function(){
	var app = angular.module('LAApp');

	var dashboardCtrl = function($scope, $location, $cookies, auth, locations){	

		if(!$cookies.get('email') || !$cookies.get('name') || !$cookies.get('ID')){
			$location.path('/');
		}

		// var locations = function(){

			locations.getUserLocations()
						.then(function(response){
							console.log(response);
						});
		// };

		// $scope.locations = locations;
		// locations();

		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
		

	};

	app.controller('dashboardCtrl', dashboardCtrl);

}());