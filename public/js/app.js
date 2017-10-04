var app = angular.module('decisions', ['timer']);
app.factory('homeInterceptor', function($q, $window) {
  return  {
    'response': function(res) {
      if (typeof res.data == 'string' && res.data.indexOf('<a href="#">Home</a>') != -1) {
        $window.location.href = "/#!?error=denied";
        return $q.reject(res);
      } else {
        return res;
      }
    }
  }
});

app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('homeInterceptor');
}]); 

app.controller('mainController', ($scope, $http, $timeout, $window, $location) => {
    default_cd = 300;
    $scope.forms = { };
    $scope.formdata = [ ];
    $scope.timerColor = {};
    $scope.timerRunning = false;

    $scope.add5mins = function () {
        $scope.$broadcast('timer-add-seconds', 300);
        if ($scope.timerColor.color == 'end') {
            $scope.startTimer();
        }
    };

    $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerColor = {};
        $scope.timerRunning = true;
    };

    $scope.resetTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-set-countdown', default_cd);
        $scope.timerColor = {};
        $scope.timerRunning = false;
    };

    $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerColor = {};
        $scope.timerRunning = false;
    };

    $scope.$on('timer-stopped', function (event, data) {
        $scope.timerColor.color = 'end';
        $scope.timerRunning = false;
    });

    var unregister =  $scope.$watch('hhours', function() {
        unregister();
        $scope.resetTimer();
    });
});
