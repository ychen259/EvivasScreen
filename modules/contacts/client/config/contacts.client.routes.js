(function () {
  'use strict';

  angular
    .module('contacts')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('contacts', {
        abstract: true,
        url: '/contacts',
        template: '<ui-view/>'
      })
      .state('contacts.default', {
        url: '',
        templateUrl: 'modules/contacts/client/views/contact.client.view.html',
        controller: 'ContactsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contact'
        }
      });
  }

  getContact.$inject = ['$stateParams', 'ContactsService'];

  function getContact($stateParams, ContactsService) {
    return ContactsService.get({
      contactId: $stateParams.contactId
    }).$promise;
  }

  newContact.$inject = ['ContactsService'];

  function newContact(ContactsService) {
    return new ContactsService();
  }
}());
