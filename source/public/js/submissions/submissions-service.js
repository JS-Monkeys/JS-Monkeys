(function () {
  'use strict';

  function submissionsService($http, $q, data) {
    return {
      getByUserProblem: function (id) {
        var deferred = $q.defer();

        data.get('/submissions/' + id).then(function (response) {

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
    .factory('submissions', ['$http', '$q', 'data', submissionsService]);
}());
