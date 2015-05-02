'use strict';

angular.module('todoAppApp')
  .factory('Context', function($resource) {
    return $resource('/api/contexts/:name', {name: '@name'}, {
      update: {
        method: 'PUT'
      }
    });
  });
