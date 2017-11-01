var app = angular.module('decisions', ['timer', 'angular-simple-chat']);
app.factory('homeInterceptor', ($q, $window) => {
  return  {
    'response': (res) => {
      if (typeof res.data == 'string' && res.data.indexOf('<a href="#">Home</a>') != -1) {
        $window.location.href = "/#!?error=denied";
        return $q.reject(res);
      } else {
        return res;
      }
    }
  }
});

app.config(['$httpProvider',($httpProvider) => {
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

    $scope.regexprepĺaceURL = (URL) => {
      return URL.substring(0, URL.lastIndexOf("/")) + "/join" + URL.substring(URL.lastIndexOf("/"), URL.length);
    }

    $scope.inviteURL = $scope.regexprepĺaceURL($window.location.toString());

    $scope.socket = io();
    $scope.messages = [];

    $scope.me = {
        userId: 44645648,
        avatar: "/images/default_profile_normal.png",
        userName: 'Iop'
    };

    $scope.sendMessage = (message) => {
        $scope.socket.emit('chat message', message);
    };

    $scope.add5mins = () => {
        $scope.$broadcast('timer-add-seconds', 300);
        if ($scope.timerColor == 'end-timer') {
            $scope.startTimer();
        }
    };

    $scope.startTimer = () => {
        $scope.$broadcast('timer-start');
        $scope.timerColor = {};
    };

    $scope.resetTimer = () => {
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-set-countdown', default_cd);
        $scope.timerColor = {};
    };

    $scope.stopTimer = () => {
        $scope.$broadcast('timer-stop');
        $scope.timerColor = {};
    };

    $scope.$on('timer-stopped', (event, data) => {
        $scope.timerColor = 'end-timer';
    });

    var unregister =  $scope.$watch('hhours',() => {
        unregister();
        $scope.resetTimer();
    });

    $scope.messages.push({avatar: "/images/default_profile_normal.png", date: 1509271054241, id: "sc1509271054245", text: "dsa", userName: "No-Iop"});
    $scope.messages.push({avatar: "/images/default_profile_normal.png", date: 1509271054240, id: "sc1509271054241", text: "dsa", userName: "No-Iop2"});

    $scope.socket.on('chat message',(msg) => {
        $scope.messages.push(msg);
        $scope.$broadcast('simple-chat-message-posted');
    });
});
