(function(){
	var app = angular.module('LAApp');
	var loginCtrl = function($scope, $location, $cookies, sha1, auth, $timeout){
		if($cookies.get('email')){
			$location.path('/');
		}

		$scope.doLogin = function(){
			angular.element(document).find('.loading').show();
			// console.log($scope.email);
			// console.log(sha1.encode($scope.pwd));
			auth.login($scope.email, sha1.encode($scope.pwd))
				.then(function(response){
					if(response.user != null){

						$cookies.put('email', response.user.email);
						$cookies.put('name', response.user.name);
						$cookies.put('ID', response.user.id);
						$cookies.put('img', response.user.img_path);
						angular.element(document).find('.loading').hide();
						angular.element(document).find('#error-register').text('');
						angular.element(document).find('#success-register').text("Successfully login");
                                                
						$timeout(function(){
							document.location.reload(true);
						}, 500);

						

					}else{
						angular.element(document).find('.loading').hide();
						angular.element(document).find('#success-register').text('');
						angular.element(document).find('#error-register').text("Login faild");
					}
				});
		}

	};
	app.controller('loginCtrl', loginCtrl);
}());