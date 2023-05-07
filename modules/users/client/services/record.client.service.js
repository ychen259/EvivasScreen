// ThingsToDosService service used to communicate Ducs REST endpoints
(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('UsersRecordService', ['$http', function($http){
    var methods = {
      getRecord: function() {
        console.log("getrecord servvice function");
        return $http.get('/api/users/record');
      },
      update: function(listing) {

              console.log("_92inch: " + listing.shoppingCart.tab_tension._92inch);
    console.log("_100inch: " + listing.shoppingCart.tab_tension._100inch);
      console.log("_110inch: " + listing.shoppingCart.tab_tension._110inch);
        return $http.put('/api/users/record', listing);
      }
    };
    return methods;
  }]);
}()

);
