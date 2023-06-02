(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('OrderListController', OrderListController);

  OrderListController.$inject = ['$scope', '$filter', 'AdminService'];

  function OrderListController($scope, $filter, AdminService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;

    /*AdminService.query(function (data) {
      vm.users = data;
      vm.buildPager();
    });*/

    AdminService.getOrders()
      .then(function(response) {
        vm.users = response.data;
        vm.buildPager();
      });

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.users, {
        $: vm.search
      });
      vm.filterLength = vm.filteredItems.length;
      var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
      var end = begin + vm.itemsPerPage;
      vm.pagedItems = vm.filteredItems.slice(begin, end);
    }

    function pageChanged() {
      vm.figureOutItemsToDisplay();
    }
  }
}());
