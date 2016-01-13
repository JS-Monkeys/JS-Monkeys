(function () {

    function ContestController(contests, notifier, $http) {

        var vm = this,
            lock = false,
            toggled;

        vm.submissions = [];
        vm.canSubmit = true;

        vm.currentProblem = '';

        vm.toggle = function (i, name) {
            vm['isActive' + toggled] = undefined;
            vm['isActive' + i] = true;
            vm.toggledName = ': ' + name;
            toggled = i;

            vm.currentProblem = "/" + name;
        };

        vm.submit = function (contestName) {
            // TODO: refactor this terrible beast
            if (!lock) {
                lock = true;
                vm.canSubmit = false;

                $http.post('/contests/' + vm.toggledName.replace(': ', ''), { contest: contestName, code: vm.code })
                    .then(function (response) {
                        lock = false;
                        vm.canSubmit = true;

                        if (response.error) {
                            notifier.warning(response.error);
                            return;
                        }

                        var results = response.data.map(function (testResult) {
                            return !!testResult;
                        });
                        vm.submissions.push(results);

                    }, error => console.log(error));
            }
        }
    }

    angular.module('app.controllers')
        .controller('ContestController', ['contests', 'notifier', '$http', ContestController]);
} ());
