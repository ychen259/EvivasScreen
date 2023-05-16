(function () {
  'use strict';

  angular
    .module('purchase-histories')
    .controller('PurchaseHistoriesListController', PurchaseHistoriesListController);

  PurchaseHistoriesListController.$inject = ['PurchaseHistoriesService', '$scope', '$window', '$state'];

  function PurchaseHistoriesListController(PurchaseHistoriesService, $scope, $window, $state) {
    $scope.imgs = [$window.tabTensionImg,$window.tabTensionImg,$window.tabTensionImg, 
                  $window.floorRisingImg,$window.floorRisingImg,$window.floorRisingImg,
                  $window.mobileImg,$window.mobileImg,$window.mobileImg];
    $scope.titles = [$window.tabTension92Title,$window.tabTension100Title,$window.tabTension110Title, 
                  $window.floorRising92Title,$window.floorRising100Title,$window.floorRising110Title,
                  $window.mobile92Title,$window.mobile100Title,$window.mobile110Title];

    $scope.prices = [$window.tabTension92Price,$window.tabTension100Price,$window.tabTension110Price, 
                  $window.floorRising92Price,$window.floorRising100Price,$window.floorRising110Price,
                  $window.mobile92Price,$window.mobile100Price,$window.mobile110Price];
    //call this function at the beginning
    $scope.find = function(){ 
      PurchaseHistoriesService.getAll()
        .then(function(response) {
          $scope.purchaseHistories = response.data;

          /*formate date from 2023-05-09T04:10:44.899Z to May 9, 2023*/
          for(var i = 0; i < $scope.purchaseHistories.length; i++){

            //get month year and date
            var temp = $scope.purchaseHistories[i].created.split('T')[0]; // temp is value without time only contain day month year
            $scope.purchaseHistories[i].created = new Date(temp); //example: set it to 2023-05-01

            var year = $scope.purchaseHistories[i].created.getFullYear();
            var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
            var index = $scope.purchaseHistories[i].created.getMonth();
            var month = months[index];
            var date = $scope.purchaseHistories[i].created.getDate();

            $scope.purchaseHistories[i].created = month + ' ' + date + ', ' + year;

            //create purchaseHIstories array
            var tab_tensions = $scope.purchaseHistories[i].purchaseHistory.tab_tension;
            var floor_risings = $scope.purchaseHistories[i].purchaseHistory.floor_rising;
            var mobiles = $scope.purchaseHistories[i].purchaseHistory.mobile;

            $scope.purchaseHistories[i].items = [];
            $scope.purchaseHistories[i].items.push({'value': tab_tensions._92inch}); 
            $scope.purchaseHistories[i].items.push({'value': tab_tensions._100inch});
            $scope.purchaseHistories[i].items.push({'value': tab_tensions._110inch});
            $scope.purchaseHistories[i].items.push({'value': floor_risings._92inch});
            $scope.purchaseHistories[i].items.push({'value': floor_risings._100inch});
            $scope.purchaseHistories[i].items.push({'value': floor_risings._110inch});
            $scope.purchaseHistories[i].items.push({'value': mobiles._92inch});
            $scope.purchaseHistories[i].items.push({'value': mobiles._100inch});
            $scope.purchaseHistories[i].items.push({'value': mobiles._110inch});

            console.log($scope.purchaseHistories[i].items[0].value+','+$scope.purchaseHistories[i].items[1].value+','+$scope.purchaseHistories[i].items[2].value+','+$scope.purchaseHistories[i].items[3].value+','+$scope.purchaseHistories[i].items[4].value+','+$scope.purchaseHistories[i].items[5].value+','+$scope.purchaseHistories[i].items[6].value+','+$scope.purchaseHistories[i].items[7].value+','+$scope.purchaseHistories[i].items[8].value);
          }
        })
    }

    $scope.hrefs = function(index){
      if(index >=0 && index <= 2){
        $scope.goToTabTensionPage();
      }
      if(index >=3 && index <= 5){
        $scope.goToFloorRisingPage();
      }
      if(index >=6 && index <= 8){
        $scope.goToMobliePage();
      }
    }

    $scope.goToTabTensionPage= function(){
      $state.go('things-to-dos.tab-tension');
    }

    $scope.goToFloorRisingPage= function(){
      $state.go('things-to-dos.floor-rising');
    }

    $scope.goToMobliePage= function(){
      $state.go('things-to-dos.portable');
    }

  }
}());
