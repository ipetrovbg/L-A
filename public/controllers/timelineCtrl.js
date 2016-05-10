(function() {
    var app = angular.module('LAApp');
    var timelineCtrl = function($scope, $location, $cookies, auth, locations) {
        var currentScroll = 4;
        // /*now*/
        var myDate = new Date();
        var newDate = new Date(myDate).getTime();
        $scope.mytime = new Date(new Date(newDate).getTime());
        $scope.currentTime = new Date();
        var now = new Date().getTime();
        $scope.myFunction = function(e, d){
        	var max = 4;
            var min = 0;

        	if(d == 1){
        		// $scope.mytime = "up";
        		if (+currentScroll == max) {
                    e.preventDefault();
                    return false;
                }else{
                     
                    switch (currentScroll) {
                        case 1:
                            newDate = newDate + (31535999999.9294);
                            console.log('year');
                            break;
                        case 2:
                            newDate = newDate + (2591999999.99419);
                            console.log('month');
                            break;
                        case 3:
                            
                            newDate = newDate + (604800000);
                            console.log('week');
                            break;
                        case 4:                            
                            newDate = newDate + (86400000);
                            console.log('day');
                            break;
                    }
                    currentScroll = +currentScroll + (1);
                }
        	}else if(d == -1){
        		// $scope.mytime = "down";

        		if (+currentScroll == min) {
        			return false;
                    e.preventDefault();
        		}else{
        			currentScroll = currentScroll - (1);
        			switch (currentScroll) {
                        case 1:
                            newDate = newDate - (31535999999.9294);
                            console.log('year');
                            break;
                        case 2:
                            newDate = newDate - (2591999999.99419);
                            console.log('month');
                            break;
                        case 3:
                            newDate = newDate - (604800000);
                            console.log('week');
                            break;
                        case 4:
                            newDate = newDate - (86400000);
                            console.log('day');
                            break;
                    }
                    
        		}
        	}

        	
        	var scrolled = new Date(newDate).getTime();
        	var result =  now - scrolled;

        	console.log(result);
        	var mytime = new Date(new Date(newDate).getTime());
        //     console.log(mytime);
            $scope.mytime = mytime;


        }

        



    };
    app.controller('timelineCtrl', timelineCtrl);
}());