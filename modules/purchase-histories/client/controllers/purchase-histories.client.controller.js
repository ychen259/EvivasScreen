(function () {
  'use strict';

  // Purchase histories controller
  angular
    .module('purchase-histories')
    .controller('PurchaseHistoriesController', PurchaseHistoriesController);

  PurchaseHistoriesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'purchaseHistoryResolve'];

  function PurchaseHistoriesController ($scope, $state, $window, Authentication, purchaseHistory) {
    var vm = this;

    vm.authentication = Authentication;
    vm.purchaseHistory = purchaseHistory;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Purchase history
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.purchaseHistory.$remove($state.go('purchase-histories.list'));
      }
    }

    // Save Purchase history
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.purchaseHistoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.purchaseHistory._id) {
        vm.purchaseHistory.$update(successCallback, errorCallback);
      } else {
        vm.purchaseHistory.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('purchase-histories.view', {
          purchaseHistoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
