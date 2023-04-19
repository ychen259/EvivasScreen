(function () {
  'use strict';

  describe('About us Route Tests', function () {
    // Initialize global variables
    var $scope,
      AboutUsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AboutUsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AboutUsService = _AboutUsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('about-us');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/about-us');
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
          AboutUsController,
          mockAboutU;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('about-us.view');
          $templateCache.put('modules/about-us/client/views/view-about-u.client.view.html', '');

          // create mock About u
          mockAboutU = new AboutUsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'About u Name'
          });

          // Initialize Controller
          AboutUsController = $controller('AboutUsController as vm', {
            $scope: $scope,
            aboutUResolve: mockAboutU
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:aboutUId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.aboutUResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            aboutUId: 1
          })).toEqual('/about-us/1');
        }));

        it('should attach an About u to the controller scope', function () {
          expect($scope.vm.aboutU._id).toBe(mockAboutU._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/about-us/client/views/view-about-u.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AboutUsController,
          mockAboutU;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('about-us.create');
          $templateCache.put('modules/about-us/client/views/form-about-u.client.view.html', '');

          // create mock About u
          mockAboutU = new AboutUsService();

          // Initialize Controller
          AboutUsController = $controller('AboutUsController as vm', {
            $scope: $scope,
            aboutUResolve: mockAboutU
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.aboutUResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/about-us/create');
        }));

        it('should attach an About u to the controller scope', function () {
          expect($scope.vm.aboutU._id).toBe(mockAboutU._id);
          expect($scope.vm.aboutU._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/about-us/client/views/form-about-u.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AboutUsController,
          mockAboutU;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('about-us.edit');
          $templateCache.put('modules/about-us/client/views/form-about-u.client.view.html', '');

          // create mock About u
          mockAboutU = new AboutUsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'About u Name'
          });

          // Initialize Controller
          AboutUsController = $controller('AboutUsController as vm', {
            $scope: $scope,
            aboutUResolve: mockAboutU
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:aboutUId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.aboutUResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            aboutUId: 1
          })).toEqual('/about-us/1/edit');
        }));

        it('should attach an About u to the controller scope', function () {
          expect($scope.vm.aboutU._id).toBe(mockAboutU._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/about-us/client/views/form-aboutU.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
