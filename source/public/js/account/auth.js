(function () {
  'use strict';

  function authService($http, $q, UsersResource) {
    return {
      signup: function(user) {
        var deferred = $q.defer();

        var user = new UsersResource(user);
        user.$save().then(function() {
          deferred.resolve();
        }, function(response) {
          deferred.reject(response);
        });

        return deferred.promise;
      },
      //update: function(user) {
      //  var deferred = $q.defer();
      //
      //  var updatedUser = new UsersResource(user);
      //  updatedUser._id = identity.currentUser._id;
      //  updatedUser.$update().then(function() {
      //    identity.currentUser = user;
      //    deferred.resolve();
      //  }, function(response) {
      //    deferred.reject(response);
      //  });
      //
      //  return deferred.promise;
      //},
      login: function(user){
        var deferred = $q.defer();

        $http.post('/login', user).success(function(response) {
          if (response.success) {
            var user = new UsersResource();
            angular.extend(user, response.user);
            deferred.resolve(true);
          }
          else {
            deferred.resolve(false);
          }
        });

        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();

        $http.post('/logout').success(function() {
          deferred.resolve();
        });

        return deferred.promise;
      }
    }
  }

  angular
    .module('app.services')
    .factory('auth', ['$http', '$q', 'UsersResource', authService]);
}());
