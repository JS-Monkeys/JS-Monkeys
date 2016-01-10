(function () {

    function TestsController(contests, notifier) {

        var vm = this;
        
        vm.toggleUpdateForm = function (testNumber) {
            vm.toggledUpdate = true;
            console.log('im angular and im stupid');
            vm.testName = testNumber;
            vm.toggledUpload = false;
        }
        
        vm.toggleUploadForm = function () {
          vm.toggledUpload = !vm.toggledUpload;
          if(vm.toggledUpdate) {
              vm.toggledUpdate = false;
          }
        };
    }

    angular.module('app.controllers')
        .controller('TestsController', ['contests', 'notifier', '$scope', TestsController]);
} ());
