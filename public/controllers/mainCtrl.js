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
        /*$(window).scroll($.debounce(250, function() {
            console.log('done');
        }));*/
        var myWhile = document.getElementById('while');

        function displaywheel(e) {
            var evt = window.event || e //equalize event object
            var delta = evt.detail ? evt.detail * (-120) : evt.wheelDelta //check for detail first so Opera uses that instead of wheelDelta
            var myImg = document.getElementById("while").getElementsByTagName('img')[0];
            var myWidth = myImg.getAttribute("width");
            var max = 680;
            var min = 200;
            /*document.getElementById("wheelvalue").innerHTML=delta*/ //delta returns +120 when wheel is scrolled up, -120 when down
            if (delta == -360) {
                // console.log('down');
                if (myWidth == min) {
                    return false;
                    evt.preventDefault();
                } else {
                    myImg.setAttribute("width", (myWidth - 20));
                }
            } else if (delta == 360) {
                // console.log('up');
                if (+myWidth == max) {
                    evt.preventDefault();
                    return false;
                } else {
                    var grow = +myWidth + (20);
                    myImg.setAttribute("width", grow);
                }
            }
            if (evt.preventDefault) //disable default wheel action of scrolling page
                evt.preventDefault()
            else return false
        }
        var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
        if (myWhile.attachEvent) //if IE (and Opera depending on user setting)
            myWhile.attachEvent("on" + mousewheelevt, displaywheel)
        else if (myWhile.addEventListener) //WC3 browsers
            myWhile.addEventListener(mousewheelevt, displaywheel, false);
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