// Meeting events service used to communicate Meeting events REST endpoints
(function () {
  'use strict';

  angular
    .module('meeting-events')
    .factory('MeetingEventsService', MeetingEventsService);

  MeetingEventsService.$inject = ['$resource'];

  function MeetingEventsService($resource) {
    return $resource('api/meeting-events/:meetingEventId', {
      meetingEventId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
