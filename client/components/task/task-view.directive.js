'use strict';

angular.module('todoAppApp')
  .directive('taskView', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/task/task-view.html',
      scope: {
        alltasks: '=',
        tasks: '='
      },
      link: function(scope) {
        console.log("TASK VIEW");
        console.log(scope.tasks);
        console.log(scope.alltasks);
      }
    };
  });