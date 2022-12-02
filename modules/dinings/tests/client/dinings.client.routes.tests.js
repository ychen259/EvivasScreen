(function () {
  'use strict';

  describe('Dinings Route Tests', function () {
    // Initialize global variables
    var $scope,
      DiningsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DiningsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DiningsService = _DiningsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('dinings');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/dinings');
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
          DiningsController,
          mockDining;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('dinings.view');
          $templateCache.put('modules/dinings/client/views/view-dining.client.view.html', '');

          // create mock Dining
          mockDining = new DiningsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dining Name'
          });

          // Initialize Controller
          DiningsController = $controller('DiningsController as vm', {
            $scope: $scope,
            diningResolve: mockDining
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:diningId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.diningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            diningId: 1
          })).toEqual('/dinings/1');
        }));

        it('should attach an Dining to the controller scope', function () {
          expect($scope.vm.dining._id).toBe(mockDining._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/dinings/client/views/view-dining.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DiningsController,
          mockDining;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('dinings.create');
          $templateCache.put('modules/dinings/client/views/form-dining.client.view.html', '');

          // create mock Dining
          mockDining = new DiningsService();

          // Initialize Controller
          DiningsController = $controller('DiningsController as vm', {
            $scope: $scope,
            diningResolve: mockDining
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.diningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/dinings/create');
        }));

        it('should attach an Dining to the controller scope', function () {
          expect($scope.vm.dining._id).toBe(mockDining._id);
          expect($scope.vm.dining._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/dinings/client/views/form-dining.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DiningsController,
          mockDining;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('dinings.edit');
          $templateCache.put('modules/dinings/client/views/form-dining.client.view.html', '');

          // create mock Dining
          mockDining = new DiningsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Dining Name'
          });

          // Initialize Controller
          DiningsController = $controller('DiningsController as vm', {
            $scope: $scope,
            diningResolve: mockDining
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:diningId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.diningResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            diningId: 1
          })).toEqual('/dinings/1/edit');
        }));

        it('should attach an Dining to the controller scope', function () {
          expect($scope.vm.dining._id).toBe(mockDining._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/dinings/client/views/form-dining.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
