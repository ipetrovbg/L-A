(function () {
    var app = angular.module('LAApp');
    var navCtrl = function ($scope, $cookies, $location, $timeout, auth) {
        if ($cookies.get('email')) {
            $scope.user = $cookies.get('name');
            $scope.isAuthenticated = true;
        } else {
            $scope.isAuthenticated = false;
        }

        $scope.active = $location.url();

        $scope.logout = function () {
            
            $cookies.remove('name');
            $cookies.remove('email');
            $cookies.remove('ID');
            angular.element(document).find('.loading').show();
            auth.logout().then(function(response){
                $timeout(function () {
                 document.location.reload(true);
                }, 750);
            });
            
        };
    }
    app.controller('navCtrl', navCtrl);
}());