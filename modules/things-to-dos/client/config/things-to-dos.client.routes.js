(function () {
  'use strict';

  angular
    .module('things-to-dos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('things-to-dos', {
        abstract: true,
        url: '/products',
        template: '<ui-view/>'
      })
      .state('things-to-dos.default', {
        url: '',
        templateUrl: 'modules/things-to-dos/client/views/list-product.client.view.html',
        controller: 'ThingsToDosController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Products'
        }
      })
      .state('things-to-dos.view', {
        url: '/projectorScreen',
        templateUrl: 'modules/things-to-dos/client/views/view-product.client.view.html',
        controller: 'ThingsToDosController',
        controllerAs: 'vm',
        params: {
          product_name: 'projectorScreen'
        },
        data: {
          pageTitle: 'Projector Screen'
        }
      })
      ;
  }

  getThingsToDo.$inject = ['$stateParams', 'ThingsToDosService'];

  function getThingsToDo($stateParams, ThingsToDosService) {
    return ThingsToDosService.get({
      thingsToDoId: $stateParams.thingsToDoId
    }).$promise;
  }

  newThingsToDo.$inject = ['ThingsToDosService'];

  function newThingsToDo(ThingsToDosService) {
    return new ThingsToDosService();
  }
}());
