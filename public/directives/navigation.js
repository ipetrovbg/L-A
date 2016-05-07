(function(){

	var app = angular.module('LAApp');

	app.directive('navigation', function(){
		return{
			restrict: 'E',
			templateUrl: 'templates/navigation.html',
			controller: 'navCtrl'
		}
	});

}());