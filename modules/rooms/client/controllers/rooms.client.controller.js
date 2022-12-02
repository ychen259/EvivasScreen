(function () {
  'use strict';

  // Rooms controller
  angular
    .module('rooms')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function RoomsController ($scope, $state, $window, Authentication) {
   
    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }
    
  }
}());
