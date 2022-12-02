(function () {
  'use strict';

  // Meeting events controller
  angular
    .module('meeting-events')
    .controller('MeetingEventsController', MeetingEventsController);

  MeetingEventsController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function MeetingEventsController ($scope, $state, $window, Authentication) {


    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }

  }
}());
