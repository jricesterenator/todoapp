'use strict';

angular.module('todoAppApp')
  .directive('taskEdit', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/task/task-edit.html',
      scope: {
        task: '='
      },
      link: function() {
      }
    };
  });