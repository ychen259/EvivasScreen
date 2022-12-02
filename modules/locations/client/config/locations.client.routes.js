(function () {
  'use strict';

  angular
    .module('locations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('locations', {
        abstract: true,
        url: '/locations',
        template: '<ui-view/>'
      })
      .state('locations.default', {
        url: '',
        templateUrl: 'modules/locations/client/views/locations.client.view.html',
        controller: 'LocationsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Location'
        }
      })

  }

  getLocation.$inject = ['$stateParams', 'LocationsService'];

  function getLocation($stateParams, LocationsService) {
    return LocationsService.get({
      locationId: $stateParams.locationId
    }).$promise;
  }

  newLocation.$inject = ['LocationsService'];

  function newLocation(LocationsService) {
    return new LocationsService();
  }
}());
