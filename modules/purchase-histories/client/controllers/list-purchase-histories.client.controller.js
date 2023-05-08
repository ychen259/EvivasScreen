(function () {
  'use strict';

  angular
    .module('purchase-histories')
    .controller('PurchaseHistoriesListController', PurchaseHistoriesListController);

  PurchaseHistoriesListController.$inject = ['PurchaseHistoriesService', '$scope'];

  function PurchaseHistoriesListController(PurchaseHistoriesService, $scope) {

    $scope.find = function(){
      PurchaseHistoriesService.getAll()
        .then(function(response) {
          $scope.purchaseHistories = response.data;
          console.log("get all data from database");
          console.log("first user: " + $scope.purchaseHistories[0].total);
          console.log("first udser: " + $scope.purchaseHistories[0].user.displayName);
        }, function(error) {
              console.log(error);
        });
        console.log("history: " + $scope.purchaseHistories);
    }

  }
}());
