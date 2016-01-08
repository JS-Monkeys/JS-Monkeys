(function () {

  function UsersResourceService($resource) {
    var UsersResource = $resource('/api/users/:id', {_id:'@id'}, { update: {method: 'PUT', isArray: false}});

    UsersResource.prototype.isAdmin = function() {
      return this.roles && this.roles.indexOf('admin') > -1;
    };

    return UsersResource;
  }

  angular
    .module('app.services')
    .factory('UsersResource', ['$resource', UsersResourceService]);
}());
