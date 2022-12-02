(function () {
  'use strict';

  // Locations controller
  angular
    .module('locations')
    .controller('LocationsController', LocationsController);

  LocationsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function LocationsController ($scope, $state, $window, Authentication) {
      
    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }
  }
}());
