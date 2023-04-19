(function () {
  'use strict';

  // About us controller
  angular
    .module('about-us')
    .controller('AboutUsController', AboutUsController);

  AboutUsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function AboutUsController ($scope, $state, $window, Authentication) {
    var vm = this;

    $scope.showButton=true;

    var video = document.getElementById("myVideo"); 
    
    $scope.playVid = function(){

      video.play(); 
      $scope.showButton=false;
    } 


  }
}());
