// Contacts service used to communicate Contacts REST endpoints
/*(function () {
  'use strict';

  angular
    .module('contacts')
    .factory('ContactsService', ContactsService);

  ContactsService.$inject = ['$resource'];

  function ContactsService($resource) {
    return $resource('api/contacts/:contactId', {
      contactId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());*/


(function () {
  'use strict';

  angular
    .module('contacts')
    .factory('ContactsService', ['$http', function($http){
    var methods = {

      email: function(data) {
        return $http.post('/api/sendEmail/', data);
      }


    };

    return methods;
  }]);
}()

);