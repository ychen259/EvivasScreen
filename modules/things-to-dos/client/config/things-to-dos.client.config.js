(function () {
  'use strict';

  angular
    .module('things-to-dos')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Products',
      state: 'things-to-dos.default',
      //type: 'dropdown',
      position: 11,
      roles: ['*']
    });


  }
}());
