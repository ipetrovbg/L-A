(function(){
	var app = angular.module('LAApp');

	var aboutCtrl = function($scope, $routeParams, $location){
		console.log($routeParams);
	};
	app.controller('aboutCtrl', aboutCtrl);
	
}());