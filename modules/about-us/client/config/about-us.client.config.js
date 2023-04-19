(function () {
  'use strict';

  angular
    .module('about-us')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'About us',
      state: 'about-us.default',
      //type: 'dropdown',
      roles: ['*'],
      position: 10,
    });

  }
}());
