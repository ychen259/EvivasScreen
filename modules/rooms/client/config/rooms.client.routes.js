(function () {
  'use strict';

  angular
    .module('rooms')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rooms', {
        abstract: true,
        url: '/rooms',
        template: '<ui-view/>'
      })
      .state('rooms.default', {
        url: '',
        templateUrl: 'modules/rooms/client/views/rooms.client.view.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rooms' 
        }
      });
  }

  getRoom.$inject = ['$stateParams', 'RoomsService'];

  function getRoom($stateParams, RoomsService) {
    return RoomsService.get({
      roomId: $stateParams.roomId
    }).$promise;
  }

  newRoom.$inject = ['RoomsService'];

  function newRoom(RoomsService) {
    return new RoomsService();
  }
}());
