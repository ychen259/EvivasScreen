(function () {
  'use strict';

  angular
    .module('dinings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('dinings', {
        abstract: true,
        url: '/dinings',
        template: '<ui-view/>'
      })
      .state('dinings.default', {
        url: '',
        templateUrl: 'modules/dinings/client/views/dining.client.view.html',
        controller: 'DiningsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Dining'
        }
      });
  }

  getDining.$inject = ['$stateParams', 'DiningsService'];

  function getDining($stateParams, DiningsService) {
    return DiningsService.get({
      diningId: $stateParams.diningId
    }).$promise;
  }

  newDining.$inject = ['DiningsService'];

  function newDining(DiningsService) {
    return new DiningsService();
  }
}());
