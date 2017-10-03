// Based on angular-timer by siddii
// Copyright (c) 2013 Siddique Hameed
// License: MIT
angular.module('timer', [])
    .directive('timer', ['$compile', function ($compile) {
    return {
        controller: ['$scope', '$element', '$timeout', function ($scope, $element, $timeout) {
            $element.append($compile($element.contents())($scope));

            $scope.interval = 999;
            $scope.countdown = 0;
            $scope.timeoutId = null;
            $scope.isRunning = false;
            $scope.sseconds = 0;
            $scope.mminutes = 0;
            $scope.hhours = 0;

            $scope.$on('timer-start', function () {
                $scope.start();
            });

            $scope.$on('timer-resume', function () {
                $scope.resume();
            });

            $scope.$on('timer-stop', function () {
                $scope.stop();
            });

            $scope.$on('timer-set-countdown', function (e, cd) {
                if (!$scope.isRunning) {
                    resetTimeout();
                    $scope.isRunning = false;
                }

                $scope.countdown = cd;
                calculateTimeUnits();
            });

            function resetTimeout() {
                if ($scope.timeoutId) {
                    $timeout.cancel($scope.timeoutId);
                }
            }

            $scope.start = $element[0].start = function () {
                resetTimeout();
                tick();
                $scope.isRunning = true;
            };

            $scope.resume = $element[0].resume = function () {
                resetTimeout();
                $scope.countdown += 1;
                tick();
                $scope.isRunning = true;
            };

            $scope.stop = $element[0].stop = function () {
                resetTimeout();
                $scope.$emit('timer-stopped');
                $scope.isRunning = false;
            };

            $element.bind('$destroy', function () {
                resetTimeout();
                $scope.isRunning = false;
            });

            function calculateTimeUnits() {
                $scope.seconds = Math.floor($scope.countdown % 60);
                $scope.minutes = Math.floor((($scope.countdown / (60)) % 60));
                $scope.hours = Math.floor($scope.countdown / 3600);

                //add leading zero if number is smaller than 10
                $scope.sseconds = $scope.seconds < 10 ? '0' + $scope.seconds : $scope.seconds;
                $scope.mminutes = $scope.minutes < 10 ? '0' + $scope.minutes : $scope.minutes;
                $scope.hhours = $scope.hours < 10 ? '0' + $scope.hours : $scope.hours;
            }

            $scope.addSeconds = $element[0].addSeconds = function (extraSeconds) {
                $scope.countdown += extraSeconds;
                $scope.$digest();
                if (!$scope.isRunning) {
                    $scope.start();
                }
            };

            $scope.$on('timer-add-seconds', function (e, extraSeconds) {
                $timeout(function () {
                    $scope.addSeconds(extraSeconds);
                });
            });

            calculateTimeUnits();

            var tick = function () {
                if ($scope.countdown <= 0) {
                    $scope.stop();
                    $scope.countdown = 0;
                    calculateTimeUnits();
                    return;
                }
                calculateTimeUnits();

                $scope.timeoutId = $timeout(function () { tick() }, $scope.interval);
                $scope.countdown--;
            };
        }]
    };
}]);
