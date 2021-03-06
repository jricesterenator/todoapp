'use strict';

angular.module('todoAppApp')
  .factory('Task', function($resource) {
    return $resource('/api/tasks/:taskId', {taskId:'@_id'}, {
      update: {
        method: 'PUT'
      }
    });
  });
