(function () {
  'use strict';

  angular
    .module('about-us')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('about-us', {
        abstract: true,
        url: '/about-us',
        template: '<ui-view/>'
      })
      .state('about-us.default', {
        url: '',
        templateUrl: 'modules/about-us/client/views/view-about-us.client.view.html',
        controller: 'AboutUsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'About us'
        }
      });
  }

  getAboutU.$inject = ['$stateParams', 'AboutUsService'];

  function getAboutU($stateParams, AboutUsService) {
    return AboutUsService.get({
      aboutUId: $stateParams.aboutUId
    }).$promise;
  }

  newAboutU.$inject = ['AboutUsService'];

  function newAboutU(AboutUsService) {
    return new AboutUsService();
  }
}());
