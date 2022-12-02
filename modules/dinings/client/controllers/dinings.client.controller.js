(function () {
  'use strict';

  // Dinings controller
  angular
    .module('dinings')
    .controller('DiningsController', DiningsController);

  DiningsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function DiningsController ($scope, $state, $window, Authentication) {
    
    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }
  }
}());
