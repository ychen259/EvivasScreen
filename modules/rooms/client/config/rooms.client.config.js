(function () {
  'use strict';

  angular
    .module('rooms')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
  /*  menuService.addMenuItem('topbar', {
      title: 'Rooms',
      state: 'rooms.default',
      //type: 'dropdown',
      position: 1,
      roles: ['*']
    });*/

  }
}());
