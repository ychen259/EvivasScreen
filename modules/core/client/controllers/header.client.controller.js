(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($scope, $state, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    $scope.backToHomePage = function(){
       $state.go('home');
       //document.location.reload(); // refresh the page ,because the dash for home button has problem
    }

    $scope.goToContact = function(){
       $state.go('contacts.default');
    }

    $scope.goToLocation = function(){
       $state.go('locations.default');
    }

    $scope.goToThingToDo = function(){
       $state.go('things-to-dos.default');
    }

    /*get page width*/
    const root = document.documentElement;
    var scale = window.innerWidth / 1500;
        console.log("width: " +window.innerWidth);
    console.log("scale: " +scale);
        root.style.setProperty('--page-width', scale);
  }
}());
