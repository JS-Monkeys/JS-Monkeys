(function () {

  function ContestController(contests, notifier) {

    var vm = this;
    
    var toggled,
        toggledName;
    
    vm.toggle = function (problemName) { 
        vm['isActive' + toggled] = undefined;
        vm['isActive' + problemName] = true;
        toggled = problemName;
    }
  }

  angular.module('app.controllers')
    .controller('ContestController', ['contests', 'notifier', '$scope', ContestController]);
}());
