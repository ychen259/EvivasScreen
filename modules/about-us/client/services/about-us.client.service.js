// About us service used to communicate About us REST endpoints
(function () {
  'use strict';

  angular
    .module('about-us')
    .factory('AboutUsService', AboutUsService);

  AboutUsService.$inject = ['$resource'];

  function AboutUsService($resource) {
    return $resource('api/about-us/:aboutUId', {
      aboutUId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
