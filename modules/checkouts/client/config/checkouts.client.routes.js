(function () {
  'use strict';

  angular
    .module('checkouts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('checkouts', {
        abstract: true,
        url: '/checkouts',
        template: '<ui-view/>'
      })
      .state('checkouts.form', {
        url: '',
        templateUrl: '/modules/checkouts/client/views/form-checkouts.client.view.html',
        controller: 'FormCheckoutsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Checkouts form'
        }
      })
      .state('checkouts.shipping_confirm', {
        url: '/shipping',
        templateUrl: '/modules/checkouts/client/views/shipping-address-confirm.client.view.html',
        controller: 'ShippingComfirmController',
        controllerAs: 'vm',
        params: {
          shippingInfo: ''
        },
        data: {
          pageTitle: 'Shipping Address'
        }
      });
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
