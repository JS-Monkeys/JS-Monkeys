(function () {

    function ContestController(contests, notifier, $http) {

        var vm = this,
            lock = false,
            toggled;
            
        vm.submissions = [];

        vm.toggle = function (i, name) {
            vm['isActive' + toggled] = undefined;
            vm['isActive' + i] = true;
            vm.toggledName = ': ' + name;
            toggled = i;
        }

        vm.submit = function (contestName) {
            // TODO: refactor this terrible beast
            if (!lock) {
                lock = true;
                $http.post('/contests/' + vm.toggledName.replace(': ', ''), { contest: contestName, code: vm.code })
                    .then(function (response) {
                        var results = response.data.map(function (testResult) { return !!testResult; });
                        console.log(results);
                        vm.submissions.push(results);
                        console.log(vm.submissions);
                        lock = false;
                    }, error => console.log(error));
            }
        }
    }

    angular.module('app.controllers')
        .controller('ContestController', ['contests', 'notifier', '$http', ContestController]);
} ());
