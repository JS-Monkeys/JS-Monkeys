(function () {

  function  signUpUser(auth, notifier) {

    var vm = this;

    vm.signup = function(user) {
      console.log('here');
      auth.signup(user).then(function() {
        notifier.success('Registration successful!');
        window.location.href = "/register-success"
      })
    }}

  angular.module('app.controllers')
    .controller('SignUpController', ['auth', 'notifier', signUpUser]);
}());
