(function () {
  'use strict';

  angular
    .module('about-us')
    .controller('AboutUsListController', AboutUsListController);

  AboutUsListController.$inject = ['AboutUsService'];

  function AboutUsListController(AboutUsService) {
    var vm = this;

    vm.aboutUs = AboutUsService.query();
  }
}());
