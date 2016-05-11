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

        $scope.myFunction = function(e, d) {
             e.preventDefault();
            var max = 4;
            var min = 1;
            if (d == 1) {
                // $scope.mytime = "up";
                if (+currentScroll == max) {
                   
                    return false;
                } else {
                    switch (currentScroll) {
                        case 1:
                            newDate = newDate + (31535999999.9294);
                            // console.log('year');
                            break;
                        case 2:
                            newDate = newDate + (2591999999.99419);
                            // console.log('month');
                            break;
                        case 3:
                            newDate = newDate + (604800000);
                            // console.log('week');
                            break;
                        case 4:
                            newDate = newDate + (86400000);
                            // console.log('day');
                            break;
                    }
                    currentScroll = +currentScroll + (1);
                }
            } else if (d == -1) {
                // $scope.mytime = "down";
                if (+currentScroll == min) {
                    return false;
                } else {
                    currentScroll = currentScroll - (1);
                    switch (currentScroll) {
                        case 1:
                            newDate = newDate - (31535999999.9294);
                            // console.log('year');
                            break;
                        case 2:
                            newDate = newDate - (2591999999.99419);
                            // console.log('month');
                            break;
                        case 3:
                            newDate = newDate - (604800000);
                            // console.log('week');
                            break;
                        case 4:
                            newDate = newDate - (86400000);
                            // console.log('day');
                            break;
                    }
                }
            }
            var scrolled = new Date(newDate).getTime();
            var result = now - scrolled;
            // console.log(result);
            var weekno = $scope.currentTime.getWeek();
            // console.log(weekno);
            var m = $scope.currentTime.getMonth();
            // console.log(m);
            var y = $scope.currentTime.getFullYear();
            // console.log(y);
            var mytime = new Date(new Date(newDate).getTime());
            //     console.log(mytime);
            if (result == 0) {
                // today
                console.log(result);
                $scope.dateTime = [$scope.currentTime];
            } else if (result == 604800000) {
                // week
                var weekdate = getDateRangeOfWeek(weekno);
               console.log(getDateFromWeek(weekno, y));
               $scope.dateTime = getDateFromWeek(weekno, y);

            } else if (result == 3196800000) {
                // month
                console.log(getDaysInMonth(m, y));
                $scope.dateTime = getDaysInMonth(m, y);
            } else if (result = 34732800000) {
                // year
                console.log('year ' + y);
                $scope.dateTime = [y];
            }
            $scope.mytime = mytime;
        } 
        $scope.dateTime = [$scope.currentTime];
    };
    app.controller('timelineCtrl', timelineCtrl);
}());

/*get week number*/
Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

/*range by week number*/
function getDateRangeOfWeek(weekNo) {
    var d1 = new Date();
    numOfdaysPastSinceLastMonday = eval(d1.getDay() - 1);
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    var weekNoToday = d1.getWeek();
    var weeksInTheFuture = eval(weekNo - weekNoToday);
    d1.setDate(d1.getDate() + eval(7 * weeksInTheFuture));
    var rangeIsFrom = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    d1.setDate(d1.getDate() + 6);
    var rangeIsTo = eval(d1.getMonth() + 1) + "/" + d1.getDate() + "/" + d1.getFullYear();
    return rangeIsFrom + " to " + rangeIsTo;
};

/*all days in certan month*/
function getDaysInMonth(month, year) {
    // Since no month has fewer than 28 days
    var date = new Date(year, month, 1);
    var days = [];
    // console.log('month', month, 'date.getMonth()', date.getMonth())
    while (date.getMonth() === month) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
    return days;
}

/*all days in week */

function getDateFromWeek(week, year) {
    var date = [];
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    // console.log(days);
    for (var i = 0; i < days.length - 1; i++) {
        // console.log(days[i]);
         date.push(moment().day(days[i]).year(year).week(week).toDate());
    }
    date.push(moment().day("Sunday").year(year).week(week + 1).toDate());
    return date;
};