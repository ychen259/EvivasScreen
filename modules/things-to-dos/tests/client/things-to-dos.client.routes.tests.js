(function () {
  'use strict';

  describe('Things to dos Route Tests', function () {
    // Initialize global variables
    var $scope,
      ThingsToDosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _ThingsToDosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      ThingsToDosService = _ThingsToDosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('things-to-dos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/things-to-dos');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          ThingsToDosController,
          mockThingsToDo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('things-to-dos.view');
          $templateCache.put('modules/things-to-dos/client/views/view-things-to-do.client.view.html', '');

          // create mock Things to do
          mockThingsToDo = new ThingsToDosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Things to do Name'
          });

          // Initialize Controller
          ThingsToDosController = $controller('ThingsToDosController as vm', {
            $scope: $scope,
            thingsToDoResolve: mockThingsToDo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:thingsToDoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.thingsToDoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            thingsToDoId: 1
          })).toEqual('/things-to-dos/1');
        }));

        it('should attach an Things to do to the controller scope', function () {
          expect($scope.vm.thingsToDo._id).toBe(mockThingsToDo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/things-to-dos/client/views/view-things-to-do.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          ThingsToDosController,
          mockThingsToDo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('things-to-dos.create');
          $templateCache.put('modules/things-to-dos/client/views/form-things-to-do.client.view.html', '');

          // create mock Things to do
          mockThingsToDo = new ThingsToDosService();

          // Initialize Controller
          ThingsToDosController = $controller('ThingsToDosController as vm', {
            $scope: $scope,
            thingsToDoResolve: mockThingsToDo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.thingsToDoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/things-to-dos/create');
        }));

        it('should attach an Things to do to the controller scope', function () {
          expect($scope.vm.thingsToDo._id).toBe(mockThingsToDo._id);
          expect($scope.vm.thingsToDo._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/things-to-dos/client/views/form-things-to-do.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          ThingsToDosController,
          mockThingsToDo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('things-to-dos.edit');
          $templateCache.put('modules/things-to-dos/client/views/form-things-to-do.client.view.html', '');

          // create mock Things to do
          mockThingsToDo = new ThingsToDosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Things to do Name'
          });

          // Initialize Controller
          ThingsToDosController = $controller('ThingsToDosController as vm', {
            $scope: $scope,
            thingsToDoResolve: mockThingsToDo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:thingsToDoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.thingsToDoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            thingsToDoId: 1
          })).toEqual('/things-to-dos/1/edit');
        }));

        it('should attach an Things to do to the controller scope', function () {
          expect($scope.vm.thingsToDo._id).toBe(mockThingsToDo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/things-to-dos/client/views/form-thingsToDo.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
