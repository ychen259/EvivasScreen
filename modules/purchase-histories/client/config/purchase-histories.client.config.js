(function () {
  'use strict';

  angular
    .module('purchase-histories')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Purchase histories',
      state: 'purchase-histories',
      //type: 'dropdown',
      roles: ['*'],
      position: 4,
    });


  }
}());
