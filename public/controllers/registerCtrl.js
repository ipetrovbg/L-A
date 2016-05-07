(function(){
	var app = angular.module('LAApp');
	var registerCtrl = function($scope, sha1, $cookies, $location, auth, $timeout){
		/*$cookies.put('username', $scope.username);
		$cookies.put('password', sha1.encode($scope.password));
		$location.path('/main');*/
		if($cookies.get('email')){
			$location.path('/');
		}
		
		$scope.doRegister = function(){

			angular.element(document).find('.loading').show();

			if(!auth.isEmail($scope.email)){

				angular.element(document).find('#success-register').text('');
				angular.element(document).find('#error-register').text("Invalid email address");
				return false;
			}			

				

			angular.element(document).find('.loading').show();

			auth.hasEmail($scope.email)
				.then(function(response){
					if(response.hasUser == 0){

						if(sha1.encode($scope.pwd) === sha1.encode($scope.pwdA)){				

						auth.registration($scope.email, sha1.encode($scope.pwd), $scope.name)
							.then(function(response){
								console.log(response);
								if(response.register){
									$cookies.put('email', $scope.email);
									$cookies.put('name', $scope.name);
									$cookies.put('ID', response.ID);
									// $location.path('/login');
									angular.element(document).find('.loading').hide();
									$timeout(function(){
										document.location.reload(true);
									}, 750);
									angular.element(document).find('#error-register').text('');
									angular.element(document).find('#success-register').text("Successfully registration");
								}else{

									angular.element(document).find('#success-register').text('');
									angular.element(document).find('#error-register').text("Registter faild. Please, try again");

								}
							});

							}else{

								angular.element(document).find('.loading').hide();
								angular.element(document).find('#success-register').text('');
								angular.element(document).find('#error-register').text("Passwords are not equal");
							}	
						

					}
					if(response.hasUser == 1){
						angular.element(document).find('.loading').hide();
						angular.element(document).find('#success-register').text('');
						angular.element(document).find('#error-register').text("Email already exist");
					}
				});
				
		}
	};
	app.controller('registerCtrl', registerCtrl);
}());