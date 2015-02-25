app = angular.module('app', ['ngResource']);
angular.module('app').controller('testCtrl', function($scope, $resource, jobs) {
    $scope.jobs=$resource('/api/jobs').query();
    jobs.save({title: 'Waiter', description: 'You will serve the food'});
});