(function () {
  'use strict';

  angular
    .module('checkouts')
    .controller('CheckoutsListController', CheckoutsListController);

  CheckoutsListController.$inject = ['CheckoutsService'];

  function CheckoutsListController(CheckoutsService) {
    var vm = this;

    //vm.checkouts = CheckoutsService.query();
   // $scope.paypal = paypal;
  }
}());
