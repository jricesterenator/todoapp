'use strict';

angular.module('todoAppApp')
  .controller('MainCtrl', function ($scope, $http, $resource, Task, Context, Selection) {

    function load() {
      $scope.tasks = Task.query();
      $scope.contexts = Context.query();
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

    $scope.deleteTask = function(taskToDelete) {
      taskToDelete.$delete({isArray:true});
      $scope.newTask();
      load();
    };

    $scope.edit = function(taskToEdit) {
      Selection.editTask(taskToEdit);
      $scope.task = Selection.selectionModel;
      // $scope.task = taskToEdit;
    };

    $scope.newTask = function() {
      Selection.selectionModel.value = new Task();
      $scope.task = Selection.selectionModel;
      // $scope.task = new Task();

    };

    $scope.isOrphan = function(task2) {

      if(angular.isUndefined(task2.data.parent) || task2.data.parent === null) {
        return false;
      }

      if(angular.isUndefined($scope.tasks)) {
        return false;
      }

      var i;
      for(i=0; i<$scope.tasks.length; ++i) {
        if($scope.tasks[i]._id === task2.data.parent) {
          return false;
        }
      }
      return true;
    };

    //----------------
    $scope.tasks = [];
    $scope.contexts = [];
    $scope.newTask();
    load();

  })

.factory('Task', function($resource) {
  return $resource('/api/tasks/:taskId', {taskId:'@_id'}, {
    update: {
      method: 'PUT'
    }
  });
})

.factory('Selection', function() {

  var service = {};

  service.selectionModel = {};

  service.editTask = function(taskToEdit) {
    this.selectionModel.value = taskToEdit;
  };

  return service;

})
;
