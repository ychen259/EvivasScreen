// Dinings service used to communicate Dinings REST endpoints
(function () {
  'use strict';

  angular
    .module('dinings')
    .factory('DiningsService', DiningsService);

  DiningsService.$inject = ['$resource'];

  function DiningsService($resource) {
    return $resource('api/dinings/:diningId', {
      diningId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
