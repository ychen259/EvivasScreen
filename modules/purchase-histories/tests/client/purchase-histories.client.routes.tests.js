(function () {
  'use strict';

  describe('Purchase histories Route Tests', function () {
    // Initialize global variables
    var $scope,
      PurchaseHistoriesService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PurchaseHistoriesService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PurchaseHistoriesService = _PurchaseHistoriesService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('purchase-histories');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/purchase-histories');
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
          PurchaseHistoriesController,
          mockPurchaseHistory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('purchase-histories.view');
          $templateCache.put('modules/purchase-histories/client/views/view-purchase-history.client.view.html', '');

          // create mock Purchase history
          mockPurchaseHistory = new PurchaseHistoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Purchase history Name'
          });

          // Initialize Controller
          PurchaseHistoriesController = $controller('PurchaseHistoriesController as vm', {
            $scope: $scope,
            purchaseHistoryResolve: mockPurchaseHistory
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:purchaseHistoryId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.purchaseHistoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            purchaseHistoryId: 1
          })).toEqual('/purchase-histories/1');
        }));

        it('should attach an Purchase history to the controller scope', function () {
          expect($scope.vm.purchaseHistory._id).toBe(mockPurchaseHistory._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/purchase-histories/client/views/view-purchase-history.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PurchaseHistoriesController,
          mockPurchaseHistory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('purchase-histories.create');
          $templateCache.put('modules/purchase-histories/client/views/form-purchase-history.client.view.html', '');

          // create mock Purchase history
          mockPurchaseHistory = new PurchaseHistoriesService();

          // Initialize Controller
          PurchaseHistoriesController = $controller('PurchaseHistoriesController as vm', {
            $scope: $scope,
            purchaseHistoryResolve: mockPurchaseHistory
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.purchaseHistoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/purchase-histories/create');
        }));

        it('should attach an Purchase history to the controller scope', function () {
          expect($scope.vm.purchaseHistory._id).toBe(mockPurchaseHistory._id);
          expect($scope.vm.purchaseHistory._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/purchase-histories/client/views/form-purchase-history.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PurchaseHistoriesController,
          mockPurchaseHistory;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('purchase-histories.edit');
          $templateCache.put('modules/purchase-histories/client/views/form-purchase-history.client.view.html', '');

          // create mock Purchase history
          mockPurchaseHistory = new PurchaseHistoriesService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Purchase history Name'
          });

          // Initialize Controller
          PurchaseHistoriesController = $controller('PurchaseHistoriesController as vm', {
            $scope: $scope,
            purchaseHistoryResolve: mockPurchaseHistory
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:purchaseHistoryId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.purchaseHistoryResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            purchaseHistoryId: 1
          })).toEqual('/purchase-histories/1/edit');
        }));

        it('should attach an Purchase history to the controller scope', function () {
          expect($scope.vm.purchaseHistory._id).toBe(mockPurchaseHistory._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/purchase-histories/client/views/form-purchaseHistory.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
