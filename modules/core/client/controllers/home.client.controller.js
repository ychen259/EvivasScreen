
  angular.module('core').controller('HomeController', ['$scope', '$location', '$stateParams', '$state',
    function ($scope, $location, $stateParams, $state ){

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
    $scope.goToLocation = function(){
       $state.go('locations.default');
       window.scrollTo(0, 0);
    }

}]);
