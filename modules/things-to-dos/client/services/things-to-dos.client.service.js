// ThingsToDosService service used to communicate Ducs REST endpoints
(function () {
  'use strict';

  angular
    .module('things-to-dos')
    .factory('ThingsToDosService', ['$http', function($http){
    var methods = {

      create: function(listing) {
        return $http.post('/api/things-to-dos', listing);
      },
      getRecord: function(id) {
        return $http.get('/api/things-to-dos/' + id);
      },
      update: function(listing) {
        return $http.put('/api/things-to-dos', listing);
      },
    };
    return methods;
  }]);
}()

);
