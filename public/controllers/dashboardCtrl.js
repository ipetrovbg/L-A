(function(){
	var app = angular.module('LAApp');

	var dashboardCtrl = function($scope, $location, $cookies, auth, locations, FileUploader, $timeout){	

		if(!$cookies.get('email') || !$cookies.get('name') || !$cookies.get('ID')){
			$location.path('/');
		}

		// var locations = function(){

			locations.getUserLocations()
						.then(function(response){
							console.log(response);
						});
						console.log(base_url);
		// };
		// $scope.locations = locations;
		// locations();		
		$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };


		/* upload profile picture */
		$scope.uploader = new FileUploader({
            url: '/upload',
            headers: {
            	'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
                    // autoUpload:true,
	                alias:"file",
	                removeAfterUpload:true
	    }); 
	     $scope.uploader.onProgressItem = function(item, progress){
	     	// console.log(progress);
	     	$scope.progres = progress;
	     	$('.progress-bar').css({'width': progress + '%'});
	     	$('.sr-only').text(progress + '%');
	     };

		 $scope.uploader.onBeforeUploadItem = function(){
			angular.element(document).find('.loading').show();
		 };
	    /* on complete uploading */
	    $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
	         console.log(response);
	         console.log(fileItem);
	         $('#success-register').text('Successfully upload new profile image. You will be logouted!');
	         $('#success-register').slideDown();
	         $('#file-to-upload').val('');

	            angular.element(document).find('.loading').hide();
	            auth.logout().then(function(response){
	            	$cookies.remove('name');
		            $cookies.remove('email');
		            $cookies.remove('ID');
		            $cookies.remove('img');
	                $timeout(function () {
	                 document.location.reload(true);
	                }, 750);
	            });
	    };
	    /* /upload profile picture */
	    

	    /* on stop typing */
	    var inputChangedPromise;

		$scope.inputChanged = function(){
		    if(inputChangedPromise){
		        $timeout.cancel(inputChangedPromise);
		    }
		    inputChangedPromise = $timeout(taskToDo,1000);

		}
		
		function taskToDo(){
			console.log($scope.textVal);
		}
		/* /on stop typing */

	};

	app.controller('dashboardCtrl', dashboardCtrl);

}());