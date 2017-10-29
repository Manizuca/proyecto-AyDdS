var app = angular.module('decisions', ['timer', 'angular-simple-chat']);
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
    $scope.escenarios = [{title: "Escenario 1", description: "SUMMARY ESCENARIO 1"},
			{title: "Escenario 2", description: "SUMMARY ESCENARIO 2"},
			{title: "Escenario 3", description: "SUMMARY ESCENARIO 3"}];
    $scope.title = "TITULO DE LA SALA";
    $scope.timerColor = {};

    $scope.messages = [];

    $scope.me = {
        userId: 44645648,
        avatar: "/images/default_profile_normal.png",
        userName: 'Iop'
    };

    $scope.sendMessage = function (message) {
        console.log('sendMessage: ', message);
    };

    $scope.add5mins = function () {
        $scope.$broadcast('timer-add-seconds', 300);
        if ($scope.timerColor == 'end-timer') {
            $scope.startTimer();
        }
    };

    $scope.startTimer = function () {
        $scope.$broadcast('timer-start');
        $scope.timerColor = {};
    };

    $scope.resetTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-set-countdown', default_cd);
        $scope.timerColor = {};
    };

    $scope.stopTimer = function () {
        $scope.$broadcast('timer-stop');
        $scope.timerColor = {};
    };

    $scope.$on('timer-stopped', function (event, data) {
        $scope.timerColor = 'end-timer';
    });

    var unregister =  $scope.$watch('hhours', function() {
        unregister();
        $scope.resetTimer();
    });

    $scope.messages.push({avatar: "/images/default_profile_normal.png", date: 1509271054241, id: "sc1509271054245", text: "dsa", userName: "No-Iop"});
    $scope.messages.push({avatar: "/images/default_profile_normal.png", date: 1509271054240, id: "sc1509271054241", text: "dsa", userName: "No-Iop2"});
});
