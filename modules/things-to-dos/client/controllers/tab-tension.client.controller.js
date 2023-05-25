


(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('Tab-tension-Controller', ThingsToDosViewController);

  ThingsToDosViewController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'UsersRecordService'];

  function ThingsToDosViewController ($scope, $state, $window, Authentication, Notification, UsersRecordService) {

    $scope.typeOfScreen = $state.params.product_name;
    

   // if($scope.typeOfScreen == "tab-tensioned"){

      /*Tab Tensioned Start*/
      $scope.quantity= 1;
      $scope.maxPurchase = 5;
      $scope.minPurchase = 1;
      $scope.imgSrc = $window.tabTensionImg;    //link for pick image
      $scope.imgPickOrder = 1;                                      //Order of image is being pick
      $scope.sizePick = 92;                                         //size of screen is being pick
      $scope.priceFor92 = $window.tabTension92Price;
      $scope.priceFor100 = $window.tabTension100Price;
      $scope.priceFor110 = $window.tabTension110Price;
      $scope.price = $scope.priceFor92;
      $scope.title = $window.tabTension92Title;

      $scope.increaseQuantity = function(){
        if($scope.quantity < $scope.maxPurchase)
          $scope.quantity++;
      }

      $scope.decreaseQuantity = function(){
        if($scope.quantity > $scope.minPurchase)
          $scope.quantity--;
      }

      /*change image from selection*/
      $scope.get1Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/1.png";
        $scope.imgPickOrder = 1;
      }
      $scope.get2Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/2.png";
        $scope.imgPickOrder = 2;
      }
    
      $scope.get3Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/3dimension " + $scope.sizePick + "inch.png";
        $scope.imgPickOrder = 3;
      }
    
      $scope.get4Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/4.png";
        $scope.imgPickOrder = 4;
      }
    
      $scope.get5Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/5.png";
        $scope.imgPickOrder = 5;
      }


      $scope.get92inch = function(){
        $scope.sizePick = 92;

        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor92;
        $scope.title = $window.tabTension92Title;
      }
      $scope.get100inch = function(){
        $scope.sizePick = 100;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor100;
        $scope.title = $window.tabTension100Title;
      }
      $scope.get110inch = function(){
        $scope.sizePick = 110;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/Tab-tension/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor110;
        $scope.title = $window.tabTension110Title;
      }      

      /*------------------------------------Shopping cart -----------------------------------------------*/

    //Add to Cart
    var addCart = document.getElementsByClassName('addCart');
    for(var i = 0; i < addCart.length; i++){
      var button = addCart[i];
      button.addEventListener('click', addCartClicked);
    }

  //Add to cart
  function addCartClicked(event){

    if($window.user){
      var title = $scope.title;
      var price = $scope.price;
      var productImg = $scope.imgSrc;
      addProductToCart(title, price, productImg);

      updateTotal();
    }else{
      console.log("no window.user");
      $state.go('authentication.signin');
    }


  }

  //quantity changes function
  function quantityChanged(event){
    $window.quantityChanged(event)
  }


  function removeCartItem(event){
    $window.removeCartItem(event);

  }; 



  //add product to cart
  function addProductToCart(title, price, productImg){
    var data = {
        "shoppingCart":{
          "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
          "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
          "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
        }
    };

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');


    var cartItemQuantity = cartItems.getElementsByClassName('cart-quantity');

    /*If the item already in cart, then update the quantity*/
    for(var i=0; i<cartItemsNames.length;i++){
      if(cartItemsNames[i].innerText == title){
        var updateQuantity = parseInt(cartItemQuantity[i].value) + $scope.quantity; //update cart quantity depend on quantity on page   
        cartItemQuantity[i].value = updateQuantity;
        Notification.info({ message: "You have already add this item to cart.", title: '<i class="glyphicon glyphicon-ok"></i> Watch Out!' });

        if($scope.sizePick == 92){
          data.shoppingCart.tab_tension._92inch = updateQuantity;
          $window.cartTabTension92 = updateQuantity;
        }
        if($scope.sizePick == 100){
          data.shoppingCart.tab_tension._100inch = updateQuantity;
          $window.cartTabTension100 = updateQuantity;
        }
        if($scope.sizePick == 110){
          data.shoppingCart.tab_tension._110inch = updateQuantity;
          $window.cartTabTension110 = updateQuantity;
        }

        updateShoppingToDatabase(data);
        return;
      }
    }

    Notification.success({ message: "You add this item to cart.", title: '<i class="glyphicon glyphicon-ok"></i> Thank you!' });

    var cartBoxContent =  '<img src='+productImg+' alt="" class="cart-img">'+
                          '<div class="detail-box">'+
                            '<div class="cart-product-title">'+title+'</div>'+
                            '<div class="cart-price">' + price + '</div>'+
                            '<input type="number" value="'+ $scope.quantity + '" class="cart-quantity" style="padding: 0">'+
                          '</div>'+
                          '<i class="bx bxs-trash-alt cart-remove"></i>';

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox
      .getElementsByClassName('cart-remove')[0]
      .addEventListener('click', removeCartItem);
    cartShopBox
      .getElementsByClassName('cart-quantity')[0]
      .addEventListener('change', quantityChanged);

    if($scope.sizePick == 92){
          data.shoppingCart.tab_tension._92inch = $scope.quantity;
          $window.cartTabTension92 = $scope.quantity;
    }
    if($scope.sizePick == 100){
          data.shoppingCart.tab_tension._100inch = $scope.quantity;
          $window.cartTabTension100 = $scope.quantity;
    }
    if($scope.sizePick == 110){
          data.shoppingCart.tab_tension._110inch = $scope.quantity;
          $window.cartTabTension110 = $scope.quantity;
    }

    updateShoppingToDatabase(data);

  }

  function updateShoppingToDatabase(data){
    $window.updateShoppingToDatabase(data);
  }
  function updateTotal(){
      $window.updateTotal();
  }

      /*------------------------------------Shopping cart end-----------------------------------------------*/
} 
}());
