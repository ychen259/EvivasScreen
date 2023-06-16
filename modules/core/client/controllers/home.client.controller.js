
  angular.module('core').controller('HomeController', ['$scope', '$location', '$stateParams', '$state',
    function ($scope, $location, $stateParams, $state ){

    $scope.goToTabTension = function(){
       $state.go('things-to-dos.tab-tension');
       window.scrollTo(0, 0);
    }
    $scope.goToFloorRising = function(){
       $state.go('things-to-dos.floor-rising');
       window.scrollTo(0, 0);
    }

     $scope.goToPortable = function(){
       $state.go('things-to-dos.portable');
       window.scrollTo(0, 0);
    }

}]);
