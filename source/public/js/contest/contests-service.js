(function () {
  'use strict';

  function contestsService($http, $q, data) {
    return {
      add: function (contest) {
        var deferred = $q.defer();

        data.post('/contests', contest).then(function (response) {

            console.log(response);

            deferred.resolve(response);

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
    .factory('contests', ['$http', '$q', 'data', contestsService]);
}());
