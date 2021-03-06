(function(){

	var locations = function($http){

		var getUserLocations = function () {
            return $http({
                url: 'http://localhost:8000/getUserLocations/',
                method: 'POST'
            }).then(function (response) {
                return response.data;
            })
        };
        var insertLocation = function (t, la, lo, c) {
            return $http({
                url: 'http://localhost:8000/insertLocation/',
                method: 'POST',
                params: {
                    t: t,
                    la: la,
                    lo:lo,
                    c:c
                }
            }).then(function (response) {
                return response.data;
            })
        };
		return {
            getUserLocations: getUserLocations,
			insertLocation: insertLocation
		}
	}

	var module = angular.module("LAApp");
    module.factory("locations", locations);
}());