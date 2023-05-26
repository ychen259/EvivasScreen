(function () {
  'use strict';

  angular
    .module('checkouts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    /*$stateProvider
      .state('checkouts', {
        abstract: true,
        url: '/checkouts',
        template: '<ui-view/>'
      })
      .state('checkouts.list', {
        url: '',
        templateUrl: 'modules/checkouts/client/views/list-checkouts.client.view.html',
        controller: 'CheckoutsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Checkouts List'
        }
      });*/
  }

  getCheckout.$inject = ['$stateParams', 'CheckoutsService'];

  function getCheckout($stateParams, CheckoutsService) {
    return CheckoutsService.get({
      checkoutId: $stateParams.checkoutId
    }).$promise;
  }

  newCheckout.$inject = ['CheckoutsService'];

  function newCheckout(CheckoutsService) {
    return new CheckoutsService();
  }
}());
