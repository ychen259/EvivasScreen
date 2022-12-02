(function () {
  'use strict';

  // Services controller
  angular
    .module('services')
    .controller('ServicesController', ServicesController);

  ServicesController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function ServicesController ($scope, $state, $window, Authentication) {

    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }
    
    
  }
}());
