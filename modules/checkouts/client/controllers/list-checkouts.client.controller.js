(function () {
  'use strict';

  angular
    .module('checkouts')
    .controller('CheckoutsListController', CheckoutsListController);

  CheckoutsListController.$inject = ['CheckoutsService', '$state', 'Notification', '$window', '$scope'];

  function CheckoutsListController(CheckoutsService, $state, Notification, $window, $scope) {

    $scope.submit = function(isValid){
        if (!isValid) {
          $scope.$broadcast('show-errors-check-validity', 'info_form');
          return false;
        }
        
console.log($scope.name);
console.log($scope.zipcode);
console.log($scope.phone);
console.log($scope.city);
   console.log($scope.address);
   console.log($scope.appartment);
   console.log($scope.detail);
    };


    //buy now button with paypal
    function loadAsync(url, callback) {
      var s = document.createElement('script');
      s.setAttribute('src', url); s.onload = callback;
      document.head.insertBefore(s, document.head.firstElementChild);
    }

    loadAsync('https://www.paypal.com/sdk/js?client-id=AY1MyhC3J0flDf_jJIDmxFWdtLQhPf1ekMRVNMKstOBM9WFPGhIdsciDkOrIGeYz9Di9eeMqO30KbJ_4', function() {
                paypal
                  .Buttons({
                    style: {
                      color:  'blue',
                      shape:  'pill',
                      label:  'pay',
                      height: 40,
     
                    },
                    // Sets up the transaction when a payment button is clicked
                    createOrder: function () {

                      if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
                          $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
                          $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){
                          Notification.error({ message: "You do not have anything in your cart.", title: '<i class="glyphicon glyphicon-ok"></i>I am Sorry!' });
                          return;
                      }
                      else{

                          return fetch("/api/my-server/create-paypal-order", {
                            method: "post",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            // use the "body" param to optionally pass additional order information
                            // like product skus and quantities
                            body: JSON.stringify({
                              "purchaseHistory":{
                                    "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
                                    "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
                                    "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
                               }
                            }),
                          })
                          .then((response) => response.json())
                          .then((order) => order.id);
                      }

                    },
                    // Finalize the transaction after payer approval
                    onApprove: function (data) {
                      console.log(" onApprove function in controller");
                      return fetch("/api/my-server/capture-paypal-order", {
                        method: "post",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          orderID: data.orderID,
                        }),
                      })
                        .then((response) => response.json())
                        .then((orderData) => {

                          /*after paypal success then update shopping cart database and purchase history database*/
                          $window.paypalButtonClicked();
                   
                          const transaction = orderData.purchase_units[0].payments.captures[0];
                      /*    alert(
                            "Transaction " +
                              transaction.status +
                              ": " +
                              transaction.id +
                              "\n\nSee console for all available details"
                          );*/
                          let cart= document.querySelector('.cart');
                          cart.classList.remove('active'); // close shopping cart
                          $state.go('purchase-histories.list');
                          Notification.success({ message: "Transaction " + transaction.status + ": " + transaction.id, title: '<i class="glyphicon glyphicon-ok"></i> Thank you!' });
                        });

                    },
                  })
                  .render("#paypal-button-container");
    });
  }
}());
