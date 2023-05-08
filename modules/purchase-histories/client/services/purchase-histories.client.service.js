// ThingsToDosService service used to communicate Ducs REST endpoints
(function () {
  'use strict';

  angular
    .module('purchase-histories')
    .factory('PurchaseHistoriesService', ['$http', function($http){
    var methods = {
      create: function(listing) {
        return $http.post('/api/purchase-histories', listing);
      },
      getAll: function(){
        return $http.get('/api/purchase-histories');
      }
    };
    return methods;
  }]);
}()

);
