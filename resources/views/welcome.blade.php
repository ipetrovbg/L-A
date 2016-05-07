<!DOCTYPE html>
<html ng-app="LAApp">
    <head>
        <title>Laravel an AngularJS</title>
        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/style.css">
    </head>
    <body>
        <navigation></navigation>
        <!-- <div class="container"> -->
           <div ng-view></div>           
        <!-- </div> -->
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA3LPNwbfVuv8eO0oqNNjpskerGBudoytE"
    async defer></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/lodash/4.11.2/lodash.js"></script>
        <script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
        <script type="text/javascript" src="jquery.ba-throttle-debounce.js"></script>
        <script type="text/javascript" src="js/bootstrap.min.js"></script>
        <script type="text/javascript" src="angularjs.js"></script>
        <script src="angular-route.js"></script>
        <script src="angular-animate.min.js"></script>
        <script src="angular-cookies.min.js"></script>
        
        <script src="app.js"></script>
        <script src="js/default.js"></script>
        <script src="controllers/mainCtrl.js"></script>
        <script src="controllers/registerCtrl.js"></script>
        <script src="controllers/loginCtrl.js"></script>
        <script src="controllers/logoutCtrl.js"></script>
        <script src="controllers/aboutCtrl.js"></script>
        <script src="controllers/navCtrl.js"></script>
        <script src="controllers/dashboardCtrl.js"></script>
        <script src="directives/navigation.js"></script>
        <script src="directives/angular-simple-logger.js"></script>
        <script src="directives/angular-google-maps.js"></script>
        <script src="services/sha1.js"></script>
        <script src="services/auth.js"></script>
        <script src="services/locations.js"></script>
    </body>
</html>
