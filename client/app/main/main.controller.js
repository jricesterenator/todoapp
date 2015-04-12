'use strict';

angular.module('todoAppApp')
  .controller('MainCtrl', function ($scope, $http, $resource, Task) {

    function load() {
      $scope.tasks = Task.query();
    }

    $scope.save = function(taskToSave) {
      taskToSave.data.updated = new Date();
      
      if(angular.isDefined(taskToSave._id)) {
        taskToSave.$update();
      } else {
        taskToSave.data.created = new Date();
        taskToSave.$save();
      }

      $scope.newTask();
      load();
    };

    $scope.delete = function(taskToDelete) {
      taskToDelete.$delete();
      load();
    };

    $scope.edit = function(taskToEdit) {
      $scope.task = taskToEdit;
    };

    $scope.newTask = function() {
      $scope.task = new Task();
    };

    //----------------
    $scope.tasks = [];
    $scope.newTask();
    load();

  })

.factory('Task', function($resource) {
  return $resource('/api/tasks/:taskId', {taskId:'@_id'}, {
    update: {
      method: 'PUT'
    }
  });
});
