(function(){
	var app = angular.module('LAApp', ["ngRoute", "ngAnimate", "ngCookies", "uiGmapgoogle-maps"]);

app.config(['$routeProvider', function($routeProvider) {
	    $routeProvider.
	      when('/', {
	        templateUrl: 	'templates/main.html',
	        controller: 	'mainCtrl'
	      }).
	      when('/register', {
	        templateUrl: 	'templates/register.html',
	        controller: 	'registerCtrl'
	      }).
	      when('/login', {
	        templateUrl: 	'templates/login.html',
	        controller: 	'loginCtrl'
	      }).
	      when('/about', {
	        templateUrl: 	'templates/about.html',
	        controller: 	'aboutCtrl'
	      }).
	      when('/logout', {
	        controller: 	'logoutCtrl'
	      }).
	       when('/dashboard', {
	       	templateUrl: 	'templates/dashboard.html',
	        controller: 	'dashboardCtrl'
	      }).
	      otherwise({
	        redirectTo: '/'
	      });
  }]);

}());