(function () {
  'use strict';

  var notifierService = function notifierService(toastr) {
    return {
      success: function (msg) {
        toastr.success(msg);
      },
      error: function (msg) {
        toastr.error(msg);
      }
    }
  };

  angular.module('app.services')
    .factory('notifier', ['toastr', notifierService]);

}());
