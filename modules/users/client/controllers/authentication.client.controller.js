(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification', ];

  function AuthenticationController($scope, $state, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;

    // Get an eventual error defined in the URL query string:
    if ($location.search().err) {
      Notification.error({ message: $location.search().err });
    }

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');

      //$state.go($state.previous.state.name , $state.previous.params);
           // console.log($state.previous.state.name);
    }

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignup(vm.credentials)
        .then(onUserSignupSuccess)
        //.then(createProductRecord)
        .catch(onUserSignupError);

    }

    /*create initial shopping cart and purchase history when a user finish sign up process*/
   /* function createProductRecord(){
      var data = {
        "shoppingCart":{
          "tab_tension": {"_92inch":0,"_100inch":0, "_110inch":0},
          "floor_rising": {"_92inch":0,"_100inch":0, "_110inch":0},
          "mobile": {"_92inch":0,"_100inch":0, "_110inch":0}
        },
        "purchaseHistory":{
          "tab_tension": {"_92inch":0,"_100inch":0, "_110inch":0},
          "floor_rising": {"_92inch":0,"_100inch":0, "_110inch":0},
          "mobile": {"_92inch":0,"_100inch":0, "_110inch":0}
        }
      };

      /* Save the products record and purchase history using the ThingsToDosService factory */
     /* UsersService.create(data)
        .then(function(response) {
        }, function(error) {
             console.log(error);
        });
    }*/

    function signin(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userSignin(vm.credentials)
        .then(onUserSigninSuccess)
        .catch(onUserSigninError);
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }

    // Authentication Callbacks

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      $window.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Signup successful!' });
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }

    function onUserSigninSuccess(response) {
      // If successful we assign the response to the global user model
      vm.authentication.user = response;
      $window.user = response;
      Notification.info({ message: 'Welcome ' + response.firstName });
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
//console.log("back to previous page");
      /*refresh the page to let it call header controller again to load shopping cart*/
      //$window.location.reload()
      $window.getProductRecord();
    }

    function onUserSigninError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signin Error!', delay: 6000 });
    }
  }
}());
