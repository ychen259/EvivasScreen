(function () {
  'use strict';

  describe('Things to dos Controller Tests', function () {
    // Initialize global variables
    var ThingsToDosController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      ThingsToDosService,
      mockThingsToDo;

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
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _ThingsToDosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      ThingsToDosService = _ThingsToDosService_;

      // create mock Things to do
      mockThingsToDo = new ThingsToDosService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Things to do Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Things to dos controller.
      ThingsToDosController = $controller('Things to dosController as vm', {
        $scope: $scope,
        thingsToDoResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleThingsToDoPostData;

      beforeEach(function () {
        // Create a sample Things to do object
        sampleThingsToDoPostData = new ThingsToDosService({
          name: 'Things to do Name'
        });

        $scope.vm.thingsToDo = sampleThingsToDoPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (ThingsToDosService) {
        // Set POST response
        $httpBackend.expectPOST('api/things-to-dos', sampleThingsToDoPostData).respond(mockThingsToDo);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Things to do was created
        expect($state.go).toHaveBeenCalledWith('things-to-dos.view', {
          thingsToDoId: mockThingsToDo._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/things-to-dos', sampleThingsToDoPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Things to do in $scope
        $scope.vm.thingsToDo = mockThingsToDo;
      });

      it('should update a valid Things to do', inject(function (ThingsToDosService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/things-to-dos\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('things-to-dos.view', {
          thingsToDoId: mockThingsToDo._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (ThingsToDosService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/things-to-dos\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Things to dos
        $scope.vm.thingsToDo = mockThingsToDo;
      });

      it('should delete the Things to do and redirect to Things to dos', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/things-to-dos\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('things-to-dos.list');
      });

      it('should should not delete the Things to do and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
