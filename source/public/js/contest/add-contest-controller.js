(function () {

  function  addContest(contests, notifier) {

    var vm = this;

    vm.add = function(contest) {
      console.log('here');
      contests.add(contest).then(function(res) {
        console.log(res);
        notifier.success(res);
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
