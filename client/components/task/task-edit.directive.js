'use strict';

angular.module('todoAppApp')
  .directive('taskEdit', function () {
    return {
      restrict: 'E',
      templateUrl: 'components/task/task-edit.html',
      scope: {
        task: '=',
        tasks: '='
      },
      link: function($scope) {

        $scope.open = function($event) {
          $event.preventDefault();
          $event.stopPropagation();

          $scope.opened = true;
        };

        /* Focus on title input when the task object changes (due to new task or editing) */
        $scope.$watch('task.value', function() {
          $('#titleText').focus();
        });

      }
    };
  })
  .filter('nonSelectedTasks', function() {
    return function(tasks, selectedTask) {
      if(angular.isUndefined(selectedTask._id)) {
        return tasks;
      } else {
        var out = [];
        angular.extend(out, tasks);
        _.remove(out, {_id: selectedTask._id});
        return out;
      }
    };
  })
  .filter('childTasks', function() {
    return function(tasks, parentTask) {
      if(angular.isUndefined(tasks)) {
        return tasks;
      }
      if(angular.isUndefined(parentTask)) {
        return tasks;
      }

      var out = [];

      for(var i=0; i<tasks.length; ++i) {
        var task = tasks[i];
        if(task.data.parent === parentTask._id) {
          out.push(task);
        }
      }
      return out;
    };
  })
  .filter('parentsOnly', function() {
    return function(tasks) {
      if(angular.isUndefined(tasks)) {
        return tasks;
      }
      
      var out = [];

      for(var i=0; i<tasks.length; ++i) {
        var task = tasks[i];
        if(angular.isUndefined(task.data.parent) || task.data.parent === null) {
          out.push(task);
        }
      }
      return out;
    };
  });