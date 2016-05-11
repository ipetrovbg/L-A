(function(){
	var app = angular.module('LAApp', ["ngRoute", "ngAnimate", "ngCookies", "uiGmapgoogle-maps", "monospaced.mousewheel", "ui.router", "angularFileUpload", "angular-loading-bar"]);

app.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'cfpLoadingBarProvider', 
	function($routeProvider, $stateProvider, $urlRouterProvider, $locationProvider, cfpLoadingBarProvider) {
    	cfpLoadingBarProvider.spinnerTemplate = '<div></div>';

	      $routeProvider.
	      when('/', {
	        templateUrl: 	'templates/main.html',
	        controller: 	'mainCtrl'
	      }).
	      when('/register', {
	        templateUrl: 	'templates/register.html',
	        navitem: false,
	        controller: 	'registerCtrl'
	      }).
	      when('/login', {
	        templateUrl: 	'templates/login.html',
	        navitem: false,
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
	        when('/timeline', {
	       	templateUrl: 	'templates/timeline.html',
	        controller: 	'timelineCtrl'
	      })
	        .otherwise({        redirectTo: '/'      });  
	      $locationProvider.html5Mode(true);
  }]);

}());