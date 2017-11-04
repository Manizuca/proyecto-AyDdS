var app = angular.module('decisions', ['timer', 'angular-simple-chat']);
app.factory('homeInterceptor', ($q, $window) => {
    return {
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

app.config(['$httpProvider', ($httpProvider) => {
    $httpProvider.interceptors.push('homeInterceptor');
}]);

app.controller('mainController', ($scope, $http, $timeout, $window, $location) => {
    var baseURL = "http://localhost:3000/api/";
    //change to false to replace hardcoded data with requests
    var test = true;

    default_cd = 300;
    $scope.forms = {};
    $scope.formdata = [];

    $scope.title = "TITULO DE LA SALA";
    $scope.timerColor = {};

    $scope.objetives = ["Objetive 1","Objetive 2","Objetive 3"];

    //get Scenarios
    getAllScenarios = () => {
        if (test) {
            $scope.escenarios = [{ title: "Escenario 1", description: "SUMMARY ESCENARIO 1" },
            { title: "Escenario 2", description: "SUMMARY ESCENARIO 2" },
            { title: "Escenario 3", description: "SUMMARY ESCENARIO 3" }];
        } else {
            $http.get(baseURL + 'scenarios')
                .then(function (response) {
                    $scope.escenarios = response.data;
                    console.log("GET scenarios successful with response: ", response);
                },
                function (error) {
                    console.log('Error getting scenarios \n' + response.json());
                });
        }
    }

    //getDecisions
    getDecisions = () => {
        if (test) {
            $scope.decisions = [{ name: "decision1", mecanism: "mecanism1", result: "result1" },
            { name: "decision2", mecanism: "mecanism2", result: "result2" },
            { name: "decision3", mecanism: "mecanism3", result: "result3" },
            { name: "decision4", mecanism: "mecanism4", result: "result4" },
            { name: "decision5", mecanism: "mecanism5", result: "result5" },
            { name: "decision6", mecanism: "mecanism6", result: "result6" },
            { name: "decision7", mecanism: "mecanism7", result: "result7" }];
        } else {
            $http.get(baseURL + 'decisions')
                .then(function (response) {
                    $scope.decisions = response.data;
                    console.log("GET decisions successful with response: ", response);
                },
                function (error) {
                    console.log('Error getting scenarios \n' + response.json());
                });
        }

    }

    dataFactory = (formdata) => {
        var selectedDecisions = [];
        for (i = 0; i < formdata.$$controls.length; i++) {
            if (formdata.$$controls[i].$viewValue) {
                selectedDecisions.push($scope.decisions[i]);
            }
        }
        return selectedDecisions;
    }

    //submit votes
    $scope.submitVote = (scenarioIndex) => {
        console.log("selectedDecisions: ", dataFactory($scope.forms[scenarioIndex]));
        $http.post(baseURL + 'vote', dataFactory($scope.forms[scenarioIndex]))
            .then(function (response) {
                $scope.escenarios = response.data;
                console.log("POST Votes successful with response: ", response);
            },
            function (error) {
                console.log('Error posting votes \n' + response.json());
            });
    }

    getAllScenarios();
    getDecisions();

    $scope.regexpreplaceURL = (URL) => {
        return URL.substring(0, URL.lastIndexOf("/")) + "/join" + URL.substring(URL.lastIndexOf("/"), URL.length);
    }

    $scope.inviteURL = $scope.regexpreplaceURL($window.location.toString());

    $scope.socket = io();
    $scope.messages = [];

    $scope.me = {
        userId: 44645648,
        avatar: "/images/default_profile_normal.png",
        userName: 'Yo'
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

    var unregister = $scope.$watch('hhours', () => {
        unregister();
        $scope.resetTimer();
    });

    $scope.messages.push({ avatar: "/images/default_profile_normal.png", date: 1509271054241, id: "sc1509271054245", text: "Hola", userName: "Juanito" });
    $scope.messages.push({ avatar: "/images/default_profile_normal.png", date: 1509271054240, id: "sc1509271054241", text: "Chao", userName: "María" });

    $scope.socket.on('chat message', (msg) => {
        $scope.messages.push(msg);
        $scope.$broadcast('simple-chat-message-posted');
    });
});
