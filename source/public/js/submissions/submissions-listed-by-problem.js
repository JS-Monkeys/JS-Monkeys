(function () {

  function ContestController(submissions, notifier, $http) {

    var vm = this;

   // getByUserProblem

    vm.getCode = function(sub) {

      console.log(sub);

      submissions.getByUserProblem(sub)
        .then(function(code) {

        vm.CurrentSubmittion = code;

      },function(error){
          notifier.error(error);
        })
    }
  }

  angular.module('app.controllers')
    .controller('SubmissionController', ['submissions', 'notifier', '$http', ContestController]);
}());

