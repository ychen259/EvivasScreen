(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.users', {
        url: '/users',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm'
      })
      .state('admin.user', {
        url: '/users/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        data: {
          //pageTitle: '{{ userResolve.displayName }}'
        }
      })
      .state('admin.user-edit', {
        url: '/users/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
         // userResolve: getUser
        },
        data: {
          //pageTitle: '{{ userResolve.displayName }}'
        }
      })
      .state('admin.orders', {
        url: '/orders',
        templateUrl: '/modules/users/client/views/admin/list-orders.client.view.html',
        controller: 'OrderListController',
        controllerAs: 'vm'
      })
      .state('admin.order', {
        url: '/orders/:orderId',
        templateUrl: '/modules/users/client/views/admin/view-order.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          //userResolve: getUser
        },
        data: {
          //pageTitle: '{{ userResolve.displayName }}'
        }
      })
      .state('admin.order-edit', {
        url: '/orders/:orderId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
        //  userResolve: getUser
        },
        data: {
          //pageTitle: '{{ userResolve.displayName }}'
        }
      });

    /*getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }*/
  }
}());
