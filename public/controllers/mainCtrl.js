(function() {
    var app = angular.module('LAApp');
    var mainCtrl = function($scope, $location, $timeout, $cookies, $routeParams, auth, locations, $route) {
        $scope.user = $cookies.get('ID');
        $scope.isAuth = function() {
            auth.isAuth().then(function(response) {
                if (response.auth) {
                    console.log("You are logged in");
                } else {
                    console.log("You are not logged in");
                }
            });
        };

        

        $scope.markers = [];
        $scope.locations = [];
        $scope.coords = [];
        var getMainLocations = function() {
            locations.getUserLocations().then(function(response) {
                $scope.locations = response.locations;
                for (var i = 0; i < $scope.locations.length; i++) {
                    $scope.markers.push({
                        coords: {
                            latitude: $scope.locations[i].latitude,
                            longitude: $scope.locations[i].longitude
                        },
                        content: {
                            msg: $scope.locations[i].content,
                            title: $scope.locations[i].title
                        }
                    });
                }
                for (var j = 0; j < response.locations.length; j++) {
                    $scope.coords.push({
                        latitude: $scope.locations[j].latitude,
                        longitude: $scope.locations[j].longitude
                    });
                }
            });
        }
        $scope.findLocation = function() {
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': $scope.title
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    console.log(results[0]);
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        $scope.gmap = function() {
            angular.element(document).find('.loading').show();
            angular.element(document).find('#location-form').slideUp();
            geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': $scope.title
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    //
                    locations.insertLocation($scope.title, results[0].geometry.location.lat(), results[0].geometry.location.lng(), $scope.contentLocation).then(function(response) {
                        if (response.isInserted) {
                            angular.element(document).find('#error-register').text('');
                            angular.element(document).find('#success-register').text("Successfully added location");
                            getMainLocations();
                            // $route.reload();
                            $scope.title = null;
                            $scope.contentLocation = null;
                            angular.element(document).find('.loading').hide();
                            angular.element(document).find('#location-form').slideDown();
                            $timeout(function() {
                                angular.element(document).find('#success-register').text('');
                            }, 5000);
                        } else {
                            angular.element(document).find('#success-register').text('');
                            angular.element(document).find('#error-register').text("Location faild");
                            angular.element(document).find('.loading').hide();
                            angular.element(document).find('#location-form').slideDown();
                        }
                    });
                } else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        $scope.map = {
            center: {
                latitude: 43,
                longitude: 25
            },
            zoom: 7
        };
        getMainLocations();
    };
    app.controller('mainCtrl', mainCtrl);
}());