(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('ThingsToDosController', ThingsToDosController);

  ThingsToDosController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function ThingsToDosController ($scope, $state, $window, Authentication) {

    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }
  }
}());
