(function () {
  'use strict';

  angular
    .module('services')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
   /* menuService.addMenuItem('topbar', {
      title: 'Services',
      state: 'services.default',
      //type: 'dropdown',
      position: 2,
      roles: ['*']
    });*/

  }
}());
