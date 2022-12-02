(function () {
  'use strict';

  angular
    .module('core')
    .controller('FooterController', FooterController);

  FooterController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function FooterController($scope, $state, Authentication, menuService) {

    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }

    $scope.goToContact = function(){
       $state.go('contacts.default');
       window.scrollTo(0, 0);
    }

    $scope.goToLocation = function(){
       $state.go('locations.default');
       window.scrollTo(0, 0);
    }

    $scope.goToThingToDo = function(){
       $state.go('things-to-dos.default');
       window.scrollTo(0, 0);
    }

    $scope.goToMeetingEvent = function(){
       $state.go('meeting-events.default');
       window.scrollTo(0, 0);
    }
    $scope.goToDining = function(){
       $state.go('dinings.default');
       window.scrollTo(0, 0);
    }

     $scope.goToRooms = function(){
       $state.go('rooms.default');
       window.scrollTo(0, 0);
    }
  }
}());
