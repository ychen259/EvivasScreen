(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('OrderListController', OrderListController);

  OrderListController.$inject = ['$scope', '$filter', 'AdminService', '$window', 'UsersRecordService'];

  function OrderListController($scope, $filter, AdminService, $window, UsersRecordService) {
    var vm = this;
    vm.buildPager = buildPager;
    vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
    vm.pageChanged = pageChanged;


    AdminService.getOrders()
      .then(function(response) {
        vm.orders = response.data;
        for(var i = 0; i < vm.orders.length; i++){
          vm.orders[i].created = vm.orders[i].created.replace('T', ' ');
          var temp = new Date(vm.orders[i].created.replace('T', ' '));
          var year = temp.getFullYear();
          var month = temp.getMonth() + 1; //jan get 0 on getMonth()
          var date = temp.getDate();
          var hour = temp.getHours();
          var minute = temp.getMinutes();
          var time = year + '-' + month + '-' + date + ', ' + hour + ':' + minute;
          vm.orders[i].created = time;

          //create purchaseHIstories array
          var tab_tensions = vm.orders[i].purchaseHistory.tab_tension;
          var floor_risings = vm.orders[i].purchaseHistory.floor_rising;
          var mobiles = vm.orders[i].purchaseHistory.mobile;

          if(vm.orders[i].isShipped == 'Yes'){
            vm.orders[i].alreadyShip = true;
          }
          else
            vm.orders[i].alreadyShip = false;

          vm.orders[i].items = [];
          vm.orders[i].items.push({'value': tab_tensions._92inch}); 
          vm.orders[i].items.push({'value': tab_tensions._100inch});
          vm.orders[i].items.push({'value': tab_tensions._110inch});
          vm.orders[i].items.push({'value': floor_risings._92inch});
          vm.orders[i].items.push({'value': floor_risings._100inch});
          vm.orders[i].items.push({'value': floor_risings._110inch});
          vm.orders[i].items.push({'value': mobiles._92inch});
          vm.orders[i].items.push({'value': mobiles._100inch});
          vm.orders[i].items.push({'value': mobiles._110inch});

        }
        vm.buildPager();
      });


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

    $scope.imgs = [$window.tabTensionImg,$window.tabTensionImg,$window.tabTensionImg, 
                  $window.floorRisingImg,$window.floorRisingImg,$window.floorRisingImg,
                  $window.mobileImg,$window.mobileImg,$window.mobileImg];
    $scope.titles = [$window.tabTension92Title,$window.tabTension100Title,$window.tabTension110Title, 
                  $window.floorRising92Title,$window.floorRising100Title,$window.floorRising110Title,
                  $window.mobile92Title,$window.mobile100Title,$window.mobile110Title];

    $scope.prices = [$window.tabTension92Price,$window.tabTension100Price,$window.tabTension110Price, 
                  $window.floorRising92Price,$window.floorRising100Price,$window.floorRising110Price,
                  $window.mobile92Price,$window.mobile100Price,$window.mobile110Price];

    $scope.goToTabTensionPage= function(){
      $state.go('things-to-dos.tab-tension');
    }

    $scope.goToFloorRisingPage= function(){
      $state.go('things-to-dos.floor-rising');
    }

    $scope.goToMobliePage= function(){
      $state.go('things-to-dos.portable');
    }

    $scope.changeShippingStatus = function(id, isShipped){

      var tempForShipped;
      var temp;
      if(isShipped == 'No'){ tempForShipped = 'Yes'; temp = true;}
      if(isShipped == 'Yes'){ tempForShipped = 'No'; temp = false;}

      var order = {
          "isShipped": tempForShipped
      };

      AdminService.updateOrder(id, order)
        .then(function(response) {
              for(var i = 0; i < vm.orders.length; i++){
                if(vm.orders[i]._id == id){
                  vm.orders[i].isShipped = tempForShipped;
                  vm.orders[i].alreadyShip = temp; //for shipping button color
                }
              }

      }, function(error) {
        console.log(error);
      });
    }

    function buildPager() {
      vm.pagedItems = [];
      vm.itemsPerPage = 15;
      vm.currentPage = 1;
      vm.figureOutItemsToDisplay();
    }

    function figureOutItemsToDisplay() {
      vm.filteredItems = $filter('filter')(vm.orders, {
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
