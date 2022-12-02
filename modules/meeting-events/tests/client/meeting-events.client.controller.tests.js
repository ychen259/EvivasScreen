(function () {
  'use strict';

  describe('Meeting events Controller Tests', function () {
    // Initialize global variables
    var MeetingEventsController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      MeetingEventsService,
      mockMeetingEvent;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _MeetingEventsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      MeetingEventsService = _MeetingEventsService_;

      // create mock Meeting event
      mockMeetingEvent = new MeetingEventsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Meeting event Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Meeting events controller.
      MeetingEventsController = $controller('Meeting eventsController as vm', {
        $scope: $scope,
        meetingEventResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleMeetingEventPostData;

      beforeEach(function () {
        // Create a sample Meeting event object
        sampleMeetingEventPostData = new MeetingEventsService({
          name: 'Meeting event Name'
        });

        $scope.vm.meetingEvent = sampleMeetingEventPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (MeetingEventsService) {
        // Set POST response
        $httpBackend.expectPOST('api/meeting-events', sampleMeetingEventPostData).respond(mockMeetingEvent);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Meeting event was created
        expect($state.go).toHaveBeenCalledWith('meeting-events.view', {
          meetingEventId: mockMeetingEvent._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/meeting-events', sampleMeetingEventPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Meeting event in $scope
        $scope.vm.meetingEvent = mockMeetingEvent;
      });

      it('should update a valid Meeting event', inject(function (MeetingEventsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/meeting-events\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('meeting-events.view', {
          meetingEventId: mockMeetingEvent._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (MeetingEventsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/meeting-events\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Meeting events
        $scope.vm.meetingEvent = mockMeetingEvent;
      });

      it('should delete the Meeting event and redirect to Meeting events', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/meeting-events\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('meeting-events.list');
      });

      it('should should not delete the Meeting event and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
