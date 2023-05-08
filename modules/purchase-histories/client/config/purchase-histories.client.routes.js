(function () {
  'use strict';

  angular
    .module('purchase-histories')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('purchase-histories', {
        abstract: true,
        url: '/purchase-histories',
        template: '<ui-view/>'
      })
      .state('purchase-histories.list', {
        url: '',
        templateUrl: 'modules/purchase-histories/client/views/list-purchase-histories.client.view.html',
        controller: 'PurchaseHistoriesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Purchase histories List'
        }
      })
      .state('purchase-histories.view', {
        url: '/:purchaseHistoryId',
        templateUrl: 'modules/purchase-histories/client/views/view-purchase-history.client.view.html',
        controller: 'PurchaseHistoriesController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Purchase history {{ purchase-historyResolve.name }}'
        }
      });
  }

  getPurchaseHistory.$inject = ['$stateParams', 'PurchaseHistoriesService'];

  function getPurchaseHistory($stateParams, PurchaseHistoriesService) {
    return PurchaseHistoriesService.get({
      purchaseHistoryId: $stateParams.purchaseHistoryId
    }).$promise;
  }

  newPurchaseHistory.$inject = ['PurchaseHistoriesService'];

  function newPurchaseHistory(PurchaseHistoriesService) {
    return new PurchaseHistoriesService();
  }
}());
