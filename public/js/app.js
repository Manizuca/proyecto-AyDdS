var app = angular.module('decisions', []);
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
});
