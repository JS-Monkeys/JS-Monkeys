(function () {
  function LoginController($scope, notifier, auth) {

    $scope.login = function (user) {

      console.log(user);
      auth.login(user).then(function (success) {

        if (success) {
          notifier.success('Successful login!');
          window.location.href = "/"
        }
        else {
          notifier.error('Username/Password combination is not valid!');
        }
      });
    };

    $scope.logout = function () {
      auth.logout().then(function () {
        notifier.success('Successful logout!');
        window.location.href = "/"
      })
    }
  }

  angular.module('app.controllers')
    .controller('LoginCtrl', ['$scope', 'notifier', 'auth', LoginController]);
}());