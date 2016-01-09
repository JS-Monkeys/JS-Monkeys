(function () {
  'use strict';

  function contestsService($http, $q, UsersResource) {
    return {
      add: function (contest) {
        var deferred = $q.defer();

        $http.post('/contests/add', contest).then(function (response) {

            console.log(response);

            deferred.resolve(response.data);

          },
          function (error) {
            deferred.reject(error.message)
          });

        return deferred.promise;
      }
    }
  }

  angular
    .module('app.services')
    .factory('contests', ['$http', '$q', 'UsersResource', contestsService]);
}());
