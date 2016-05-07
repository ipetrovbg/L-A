(function(){
	var app = angular.module('LAApp');
	var logoutCtrl = function($location, $cookies){
		$cookies.remove('name');
		$cookies.remove('email');
		window.setTimeout('location.reload()', 5000);
		// $location.path('/login');
	}
	app.controller('logoutCtrl', logoutCtrl);
}());