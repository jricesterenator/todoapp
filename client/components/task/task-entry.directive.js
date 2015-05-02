'use strict';

angular.module('todoAppApp')
  .directive('taskEntry', function ($compile, childTasksFilter, Selection) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'components/task/task-entry.html',
      scope: {
        task: '=',
        alltasks: '='
      },
      link: function(scope, element) {
        console.log(scope.task);
        console.log(scope.alltasks);

        scope.deleteTask = function(taskToDelete) {
          Selection.deleteTask(taskToDelete);
        };

        scope.editTask = function(taskToEdit) {
          Selection.editTask(taskToEdit);
        };

        if(angular.isDefined(scope.alltasks) && angular.isDefined(scope.task)) {     
          scope.childTasks = childTasksFilter(scope.alltasks, scope.task);
          console.log("FOUND CHILDREN:");
          console.log(scope.childTasks);
          if (angular.isArray(scope.childTasks)) {
            // var newElement = $compile('<ul><task-entry ng-repeat="subtask in alltasks | childTasks:task task=\'subtask\' alltasks=\'alltasks\'></task-entry></ul>');
            var newElement = $compile('<ul><task-entry ng-repeat="subtask in alltasks | childTasks:task" task="subtask" alltasks="alltasks"></task-entry></ul>');
            newElement(scope, function(cloned, scope) {
              element.append(cloned);
            });
          }
        }
      }
    };
  });