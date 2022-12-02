(function () {
  'use strict';

  angular
    .module('meeting-events')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('meeting-events', {
        abstract: true,
        url: '/meeting-events',
        template: '<ui-view/>'
      })
      .state('meeting-events.default', {
        url: '',
        templateUrl: 'modules/meeting-events/client/views/meeting-event.client.view.html',
        controller: 'MeetingEventsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Meeting & Event'
        }
      });
  }

  getMeetingEvent.$inject = ['$stateParams', 'MeetingEventsService'];

  function getMeetingEvent($stateParams, MeetingEventsService) {
    return MeetingEventsService.get({
      meetingEventId: $stateParams.meetingEventId
    }).$promise;
  }

  newMeetingEvent.$inject = ['MeetingEventsService'];

  function newMeetingEvent(MeetingEventsService) {
    return new MeetingEventsService();
  }
}());
