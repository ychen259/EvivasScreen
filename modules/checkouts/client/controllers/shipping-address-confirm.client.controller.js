(function () {
  'use strict';

  angular
    .module('checkouts')
    .controller('ShippingComfirmController', ShippingComfirmController);

  ShippingComfirmController.$inject = ['CheckoutsService', '$state', 'Notification', '$window', '$scope', 'UsersRecordService'];

  function ShippingComfirmController(CheckoutsService, $state, Notification, $window, $scope, UsersRecordService  ) {

    $scope.name = $state.params.shippingInfo.shippingName;
    $scope.zipcode = $state.params.shippingInfo.zipcode;
    $scope.phone = $state.params.shippingInfo.phone;
    $scope.city = $state.params.shippingInfo.city;
    $scope.address = $state.params.shippingInfo.address;
    $scope.appartment = $state.params.shippingInfo.appartment;
    $scope.email = $window.user.email;

    if($scope.appartment)
      $scope.detailAddress = 'APT #' + $scope.appartment + ', ' + $scope.address + ', ' + $scope.city + ', ' + $scope.zipcode;
    else
      $scope.detailAddress = $scope.address + ', ' + $scope.city + ', ' + $scope.zipcode;

    $scope.confirm = false; //default user did not confirm the shipping address

    /*if did not get shipping address from user then back to form page to ask for information*/
    if(!$state.params.shippingInfo){
      $state.go('checkouts.form');
    }

    //back to form page if user want to edit the address
    $scope.backToForm = function(){
      $state.go('checkouts.form');
    }

    $scope.continueToPayment = function(){
        $scope.confirm = true;
    };

    $scope.getProductRecord = function(){
      UsersRecordService.getRecord()
        .then(function(response) {
          var productRecord = response.data;
          /*quantity for each type of screen for different size in shopping cart*/
          $window.cartTabTension92 = productRecord.shoppingCart.tab_tension._92inch;
          $window.cartTabTension100 = productRecord.shoppingCart.tab_tension._100inch;
          $window.cartTabTension110 = productRecord.shoppingCart.tab_tension._110inch;
          $window.cartFloorRising92 = productRecord.shoppingCart.floor_rising._92inch;
          $window.cartFloorRising100 = productRecord.shoppingCart.floor_rising._100inch;
          $window.cartFloorRising110 = productRecord.shoppingCart.floor_rising._110inch;
          $window.cartMobile92 = productRecord.shoppingCart.mobile._92inch;
          $window.cartMobile100 = productRecord.shoppingCart.mobile._100inch;
          $window.cartMobile110 = productRecord.shoppingCart.mobile._110inch;

          //if database show that shopping cart tab tension screen 92 inch is not 0, add it to shopping cart
          if($window.cartTabTension92){
            var productImg = $window.tabTensionImg;
            var title = $window.tabTension92Title;
            var price = $window.tabTension92Price;
            var quantity = $window.cartTabTension92;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartTabTension100){
            var productImg = $window.tabTensionImg;
            var title = $window.tabTension100Title;
            var price = $window.tabTension100Price;
            var quantity = $window.cartTabTension100;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartTabTension110){
            var productImg = $window.tabTensionImg;
            var title = $window.tabTension110Title;
            var price = $window.tabTension110Price;
            var quantity = $window.cartTabTension110;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartFloorRising92){
            var productImg = $window.floorRisingImg ;
            var title = $window.floorRising92Title;
            var price = $window.floorRising92Price;
            var quantity = $window.cartFloorRising92;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartFloorRising100){
            var productImg = $window.floorRisingImg ;
            var title = $window.floorRising100Title;
            var price = $window.floorRising100Price;
            var quantity = $window.cartFloorRising100;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartFloorRising110){
            var productImg = $window.floorRisingImg ;
            var title = $window.floorRising110Title;
            var price = $window.floorRising110Price;
            var quantity = $window.cartFloorRising110;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartMobile92){
            var productImg = $window.mobileImg ;
            var title = $window.mobile92Title;
            var price = $window.mobile92Price;
            var quantity = $window.cartMobile92;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartMobile100){
            var productImg = $window.mobileImg ;
            var title = $window.mobile100Title;
            var price = $window.mobile100Price;
            var quantity = $window.cartMobile100;
            addProductToCart(title, price, productImg, quantity);
          }
          if($window.cartMobile110){
            var productImg = $window.mobileImg ;
            var title = $window.mobile110Title;
            var price = $window.mobile110Price;
            var quantity = $window.cartMobile110;
            addProductToCart(title, price, productImg, quantity);
          }

          updateSubtotal();
          updateTax();
          updateTotal();
          
        }, function(error) {
             console.log(error);
        });
    }

    function addProductToCart(title, price, productImg, quantity){
      var cartShopBox = document.createElement('div');
      cartShopBox.classList.add('cart-box');
      var cartItems = document.getElementsByClassName('shopping-cart-content')[0];


                                                             

      var cartBoxContent = '<div class="a-text-center a-fixed-left-grid-col a-col-left" style="width:100px;float:left;">' + 
                            '<img src='+productImg+' alt="" class="cart-img">'+
                            '<span class="item-view-qty" ng-if="' +quantity + '!=1" style="bottom: -3px; right: -3px;">' + quantity + '</span>' +
                            '</div>' +
                             '<div class="detail-box">'+
                                '<div class="cart-product-title">'+title+'</div>'+
                                '<div class="cart-price">' + price + '</div>'+
                             '</div>';


      cartShopBox.innerHTML = cartBoxContent;
      cartItems.append(cartShopBox);

    }


    function updateSubtotal(){
          if(!$window.cartTabTension92){
            $window.cartTabTension92 = 0;
          }
          if(!$window.cartTabTension100){
            $window.cartTabTension100 = 0;
          }
          if(!$window.cartTabTension110){
            $window.cartTabTension110 = 0;
          }
          if(!$window.cartFloorRising92){
            $window.cartFloorRising92 = 0;
          }
          if(!$window.cartFloorRising100){
            $window.cartFloorRising100 = 0;
          }
          if(!$window.cartFloorRising110){
            $window.cartFloorRising110 = 0;
          }
          if(!$window.cartMobile92){
            $window.cartMobile92 = 0;
          }
          if(!$window.cartMobile100){
            $window.cartMobile100 = 0;
          }
          if(!$window.cartMobile110){
            $window.cartMobile110 = 0;
          }

      $scope.subtotal = parseFloat($window.tabTension92Price.replace('$','')) * $window.cartTabTension92 +
                  parseFloat($window.tabTension100Price.replace('$','')) * $window.cartTabTension100 +
                  parseFloat($window.tabTension110Price.replace('$','')) * $window.cartTabTension110 +
                  parseFloat($window.floorRising92Price.replace('$','')) * $window.cartFloorRising92 +
                  parseFloat($window.floorRising100Price.replace('$','')) * $window.cartFloorRising100 +
                  parseFloat($window.floorRising110Price.replace('$','')) * $window.cartFloorRising110 +
                  parseFloat($window.mobile92Price.replace('$','')) * $window.cartMobile92 +
                  parseFloat($window.mobile100Price.replace('$','')) * $window.cartMobile100 +
                  parseFloat($window.mobile110Price.replace('$','')) * $window.cartMobile110;

      //if price contain some value like 0.4 x 5 comes out 1.9999, round up number
      $scope.subtotal =  Math.round($scope.subtotal*100)/100;
      $scope.subtotal = '$' + $scope.subtotal;
    }

    function updateTax(){
      $scope.tax = parseFloat($scope.subtotal.replace('$','')) * $window.taxPercentage;
      $scope.tax =  Math.round($scope.tax*100)/100;
      $scope.tax = '$' + $scope.tax;
    }

    function updateTotal(){
      $scope.total = parseFloat($scope.subtotal.replace('$','')) * ($window.taxPercentage+1);
      $scope.total =  Math.round($scope.total*100)/100;
      $scope.total = '$' + $scope.total;
    }

    $window.paypalButtonClicked = function(){
      if($window.user){
          /*remove shopping cart item from shopping cart*/
          var cartContent = document.getElementsByClassName('cart-content')[0];
          while(cartContent.hasChildNodes()){
            cartContent.removeChild(cartContent.firstChild);
          }

          //clean up the shopping record back to 0
          var data = {
              "shoppingCart":{
                "tab_tension": {"_92inch":0,"_100inch":0, "_110inch":0},
                "floor_rising": {"_92inch":0,"_100inch":0, "_110inch":0},
                "mobile": {"_92inch":0,"_100inch":0, "_110inch":0}
              }
          };

          //store value to user database
          $window.updateShoppingToDatabase(data);

          data = {
              "purchaseHistory":{
                "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
                "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
                "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
              },
              'address': $scope.detailAddress
          };

          $window.updatePurchaseHistoryToDataBase(data);
          
          //updata Total back to 0
          $window.updateTotal();

          /*reset globlo value back to 0*/
          $window.cartTabTension92 = 0;
          $window.cartTabTension100 = 0;
          $window.cartTabTension110 = 0;
          $window.cartFloorRising92 = 0;
          $window.cartFloorRising100 = 0;
          $window.cartFloorRising110 = 0;
          $window.cartMobile92 = 0;
          $window.cartMobile100 = 0;
          $window.cartMobile110 = 0;

          $scope.isEmptyShoppingCart = true;
      }
      //if there is no user go to login
      else{
        //go to login page and close shopping cart
        $state.go('authentication.signin');
        cart.classList.remove('active');
      }

    }

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
            color:  'gold',
            shape:  'pill',
            label:  'checkout',
            height: 55, 

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
