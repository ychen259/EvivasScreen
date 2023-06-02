(function () {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserController', UserController);

  UserController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', '$stateParams','AdminService'];

  function UserController($scope, $state, $window, Authentication, Notification, $stateParams, AdminService) {
    var vm = this;

    vm.authentication = Authentication;

    vm.remove = remove;
    vm.update = update;
    var id = $stateParams.userId;

    $scope.findOne = function(){
      AdminService.read(id)
        .then(function(response) {
          vm.user = response.data;
          vm.isContextUserSelf = isContextUserSelf;
        });
    }

    function remove() {
      if ($window.confirm('Are you sure you want to delete this user?')) {
        AdminService.delete(id)
          .then(function(response) {
            $state.go('admin.users');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User deleted successfully!' });
          });
      }
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      var user = vm.user;

      AdminService.update(id, user)
          .then(function(response) {
            $state.go('admin.user', {userId: id});
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> User saved successfully!' });
          }, function(error) {
            Notification.error({ message: error.data.message, title: '<i class="glyphicon glyphicon-remove"></i> User update error!' });
          });

    }

    function isContextUserSelf() {
      return vm.user.username === vm.authentication.user.username;
    }
  }
}());
