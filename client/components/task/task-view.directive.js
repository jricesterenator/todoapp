'use strict';

angular.module('todoAppApp')
  .directive('taskView', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/task/task-view.html',
      scope: {
        task: '='
      },
      link: function() {
      }
    };
  });