// ThingsToDosService service used to communicate Ducs REST endpoints
(function () {
  'use strict';

  angular
    .module('users.services')
    .factory('UsersRecordService', ['$http', function($http){
    var methods = {
      getRecord: function() {
        return $http.get('/api/users/record');
      },
      /*because i store purchase record to each user*/
      update: function(listing) {
        return $http.put('/api/users/record', listing);
      }
    };
    return methods;
  }]);
}()

);
