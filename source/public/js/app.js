(function () {

  'use strict';

  function config() {

    var routeUserChecks = {
      adminRole: {
        authenticate: function(auth) {
          return auth.isAuthorizedForRole('admin');
        }
      },
      authenticated: {
        authenticate: function(auth) {
          return auth.isAuthenticated();
        }
      }
    };
  }

  function run($rootScope, $location) {

    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/');
      }
    })
  }

  angular.module('app.services', []);
  angular.module('app.directives', []);
  angular.module('app.filters', []);
  angular.module('app.controllers', ['app.services']);
  angular.module('app', ['ngResource', 'ngRoute', 'app.services', 'app.directives', 'app.filters', 'app.controllers'])
    .config([config])
    .run(['$rootScope', '$location', run])
    .value('toastr', toastr);
}());