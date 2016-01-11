(function () {
  'use strict';

  function data($http, $q, notifier) {
    // TODO missing authorization service. How are we actually sending the headers???
    var headers = {};

    function get(url, params) {
      var defered = $q.defer();

      $http
        .get(url, {params: params, headers: headers})
        .then(function (response) {
          defered.resolve(response.data);
        }, function (err) {
          defered.reject(err);
        });

      return defered.promise;
    }

    function getById(url) {
      var defered = $q.defer();
      $http
        .get(url, {headers: headers})
        .then(function (response) {
          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          notifier.error(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function post(url, data) {
      var defered = $q.defer();

      $http
        .post(url, data, {headers: headers})
        .then(function (response) {
          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          notifier.error(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function put(url, data) {
      var defered = $q.defer();

      $http
        .put(url, data, {headers: headers})
        .then(function (response) {
          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          notifier.error(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function getErrorMessage(response) {

      console.log("in error");
      console.log(response);

      var error = response.data;
      if (error && error[Object.keys(error)[0]][0]) {
        error = error[Object.keys(error)[0]][0];
      }
      else {
        error = response.data.message;
      }

      return error;
    }

    return {
      get: get,
      getById: getById,
      post: post,
      put: put
    }
  }

  angular.module('app.services')
    .factory('data', ['$http', '$q', 'notifier', data]);
}());
