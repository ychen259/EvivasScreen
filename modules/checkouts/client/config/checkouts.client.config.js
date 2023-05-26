(function () {
  'use strict';

  angular
    .module('checkouts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    /*menuService.addMenuItem('topbar', {
      title: 'Checkouts',
      state: 'checkouts.list',
      //type: 'dropdown',
      roles: ['*']
    });*/
  }
}());
