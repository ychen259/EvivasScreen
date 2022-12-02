(function () {
  'use strict';

  angular
    .module('locations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Location',
      state: 'locations.default',
      //type: 'dropdown',
      position: 5,
      roles: ['*']
    });



  }
}());
