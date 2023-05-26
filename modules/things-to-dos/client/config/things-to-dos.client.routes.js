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
      .state('things-to-dos.list', {
        url: '',
        templateUrl: '/modules/things-to-dos/client/views/list-product.client.view.html',
        controller: 'ThingsToDosController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Products'
        }
      })
      /*.state('things-to-dos.view', {
        url: '/projectorScreen',
        templateUrl: '/modules/things-to-dos/client/views/view-product.client.view.html',
        controller: 'ThingsToDosViewController',
        controllerAs: 'vm',
        params: {
          product_name: 'projectorScreen'
        },
        data: {
          pageTitle: 'Projector Screen'
        }
      })*/
      .state('things-to-dos.tab-tension', {
        url: '/tab-tensioned-projector-screen',
        templateUrl: '/modules/things-to-dos/client/views/view-product-tab-tensioned.client.view.html',
        controller: 'Tab-tension-Controller',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tab-Tensioned Projector Screen'
        }

      })
      .state('things-to-dos.floor-rising', {
        url: '/floor-rising-projector-screen',
        templateUrl: '/modules/things-to-dos/client/views/view-product-floor-rising.client.view.html',
        controller: 'Floor-rising-Controller',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Floor Rising Projector Screen'
        }
      })
      .state('things-to-dos.portable', {
        url: '/portable-Outdoor-projector-screen',
        templateUrl: '/modules/things-to-dos/client/views/view-product-portable.client.view.html',
        controller: 'Portable-Outdoor-Controller',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Portable Outdoor Projector Screen'
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
