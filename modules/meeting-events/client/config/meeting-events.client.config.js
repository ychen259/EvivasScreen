(function () {
  'use strict';

  angular
    .module('meeting-events')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    /*menuService.addMenuItem('topbar', {
      title: 'Meeting & events',
      state: 'meeting-events.default',
      //type: 'dropdown',
      position: 4,
      roles: ['*']
    });*/

  }
}());
