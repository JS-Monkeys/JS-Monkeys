(function () {

  function  addContest(contests, notifier) {

    var vm = this;

    vm.add = function(contest) {
      contests.add(contest).then(function(res) {
        window.location.href = "/contests/" + res.contest
      },
      function(err){
        notifier.error(err);
      })
    }
  }

  angular.module('app.controllers')
    .controller('AddContestController', ['contests', 'notifier', addContest]);
}());
