// Things to dos service used to communicate Things to dos REST endpoints
(function () {
  'use strict';

  angular
    .module('things-to-dos')
    .factory('ThingsToDosService', ThingsToDosService);

  ThingsToDosService.$inject = ['$resource'];

  function ThingsToDosService($resource) {
    return $resource('api/things-to-dos/:thingsToDoId', {
      thingsToDoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
