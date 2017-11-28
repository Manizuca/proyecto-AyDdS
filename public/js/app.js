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
    //change to false to replace hardcoded data with requests
    var test = false;

    URL = $window.location.toString().replace(/\/$/, "");

    default_cd = 300;
    $scope.forms = {};
    $scope.formdata = [];

    $scope.title = "TITULO DE LA SALA";
    $scope.timerColor = {};

    $scope.objetives = ["Objetive 1", "Objetive 2", "Objetive 3"];
    $scope.escenarios = [];
    $scope.decisions = [];

    //add Objetive
    $scope.addObjetive = () => {
        $scope.objetives.push($scope.newObjetiveName);
    }

    //add Scenario
    $scope.addNewScene = () => {
        $http.post(URL + "/scene/new", {title: $scope.newSceneTitle, description: $scope.newSceneDesc })
            .then((response) => { $scope.escenarios.push(response.data); })
            .catch((error) => { console.log(error.statusText); });
    }

    //get Scenarios
    getAllScenarios = () => {
        if (test) {
            $scope.escenarios = [{ title: "Escenario 1", description: "SUMMARY ESCENARIO 1" },
            { title: "Escenario 2", description: "SUMMARY ESCENARIO 2" },
            { title: "Escenario 3", description: "SUMMARY ESCENARIO 3" }];
        } else {
            $http.get(URL + "/scenes")
                .then(function (response) {
                    $scope.escenarios = response.data;
                }).catch((error) => {
                    console.log('Error getting scenes \n' + error.statusText);
                });
        }
    }

    //get Decisions
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
            $http.get('/api/decisions')
                .then(function (response) {
                    $scope.decisions = response.data;
                }).catch((error) => {
                    console.log('Error getting decisions \n' + error.statusText);
                });
        }

    }

    dataFactory = (formdata) => {
        var selectedDecisions = [];
        for (i = 0; i < formdata.$$controls.length; i++) {
            if (formdata.$$controls[i].$viewValue != 0) {
                selectedDecisions.push({id: $scope.decisions[i].id, p: formdata.$$controls[i].$viewValue});
            }
        }
        return selectedDecisions;
    }

    //submit votes
    $scope.submitVote = (sceneIndex) => {
        $http.post(URL + "/scene/" + sceneIndex + "/vote", dataFactory($scope.forms[sceneIndex]))
            .then(function (response) {
                console.log(response);
            }).catch((error) => {
                console.log('Error posting votes \n' + error.statusText);
                console.log(error);
            });
    }

    getAllScenarios();
    getDecisions();

    $scope.regexpreplaceURL = (url) => {
        return url.substring(0, url.lastIndexOf("/")) + "/join" + url.substring(url.lastIndexOf("/"), url.length);
    }

    $scope.inviteURL = $scope.regexpreplaceURL(URL);

    $scope.socket = io();
    $scope.messages = [];

    $scope.me = {
        userId: 0,
        avatar: "/images/default_profile_normal.png",
        userName: 'Yo'
    };

    $scope.sendMessage = (message) => {
        $scope.socket.emit('chat message', message);
    };

    $scope.add5mins = () => {
        $scope.socket.emit('timer-add-seconds', 300);
        $scope.$broadcast('timer-add-seconds', 300);
        if ($scope.timerColor == 'end-timer') {
            $scope.startTimer();
        }
    };

    $scope.startTimer = () => {
        $scope.socket.emit('timer-start');
        $scope.$broadcast('timer-start');
        $scope.timerColor = {};
    };

    $scope.resetTimer = () => {
        $scope.socket.emit('timer-reset', default_cd);
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-set-countdown', default_cd);
        $scope.timerColor = {};
    };

    $scope.stopTimer = () => {
        $scope.socket.emit('timer-stop');
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

    $scope.socket.on('timer-add-seconds', (time) => {
        $scope.$broadcast('timer-add-seconds', 300);
        if ($scope.timerColor == 'end-timer') {
            $scope.startTimer();
        }
    });

    $scope.socket.on('timer-start', () => {
        $scope.$broadcast('timer-start');
        $scope.timerColor = {};
    });

    $scope.socket.on('timer-reset', (default_cd) => {
        $scope.$broadcast('timer-stop');
        $scope.$broadcast('timer-set-countdown', default_cd);
        $scope.timerColor = {};
    });

    $scope.socket.on('timer-stop', () => {
        $scope.$broadcast('timer-stop');
        $scope.timerColor = {};
    });
});
