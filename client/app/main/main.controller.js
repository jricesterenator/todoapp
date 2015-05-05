'use strict';

angular.module('todoAppApp')
  .controller('MainCtrl', function ($scope, $http, $resource, Task, Selection) {

    function load() {
      $scope.tasks = Task.query();
    }

    $scope.contextExists = function(value, index) {
      return angular.isDefined(value.data) && angular.isDefined(value.data.context);
    };

    $scope.save = function(taskToSave) {
      Selection.saveTask(taskToSave);
      //$scope.newTask();
      load();
    };

    $scope.deleteTask = function(taskToDelete) {
      Selection.deleteTask(taskToDelete);
      $scope.newTask();
      load();
    };

    $scope.edit = function(taskToEdit) {
      Selection.editTask(taskToEdit);
    };

    $scope.newTask = function() {
      Selection.newTask();
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
    $scope.task = Selection.selectionModel;
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

.factory('Selection', function(Task) {

  var service = {};

  service.selectionModel = {};
  service.originalData = {};

  service.restore = function() {
    if(angular.isDefined(this.selectionModel.value)) {
      if(this.originalData._id === this.selectionModel.value._id) {
        angular.copy(this.originalData, this.selectionModel.value);
      }
    }
  };

  service.backup = function(taskToBackup) {
    this.originalData = angular.copy(taskToBackup);
  };

  //Not sure this belongs here since it messes with the task saving
  service.deleteTask = function(taskToDelete) {
    taskToDelete.$delete({isArray:true});
  };

  //Not sure this belongs here since it messes with the task saving
  service.saveTask = function(taskToSave) {
    taskToSave.data.updated = new Date();
      
    if(angular.isDefined(taskToSave._id)) {
      taskToSave.$update();
    } else {
      taskToSave.data.created = new Date();
      taskToSave.$save();
    }

    this.backup(taskToSave);
  };

  service.newChildTask = function(parentTask) {
    this.newTask();

    //Set the new task's parent to be whatever was passed in
    if(angular.isUndefined(this.selectionModel.value.data)) {
      this.selectionModel.value.data = {};
    }
    this.selectionModel.value.data.parent = parentTask._id;
  };

  service.editTask = function(taskToEdit) {
    this.restore();
    this.backup(taskToEdit);
    this.selectionModel.value = taskToEdit;
  };

  service.newTask = function() {
    this.restore();
    this.selectionModel.value = new Task();
  };

  return service;

})
.filter('property', function(){
  function parseString(input) {
    return input.split('.');
  }

  function getValue(element, propertyArray){
    var value = element;

    _.forEach(propertyArray, function(property){
      if(angular.isDefined(value)) {
        value = value[property];
      }
    });

    return value;
  }

  return function (array, propertyString, target){
    var properties = parseString(propertyString);

    return _.filter(array, function(item){
      return getValue(item, properties) === target;
    });
  };
})
;
