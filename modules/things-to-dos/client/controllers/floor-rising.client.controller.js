(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('Floor-rising-Controller', ThingsToDosViewController);

  ThingsToDosViewController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification'];

  function ThingsToDosViewController ($scope, $state, $window, Authentication, Notification) {

    //$scope.typeOfScreen = $state.params.product_name;
    

   // if($scope.typeOfScreen == "tab-tensioned"){

      /*Tab Tensioned Start*/
      $scope.quantity= 1;
      $scope.maxPurchase = 5;
      $scope.minPurchase = 1;
      $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/1.png";    //link for pick image
      $scope.imgPickOrder = 1;                                      //Order of image is being pick
      $scope.sizePick = 92;                                         //size of screen is being pick
      $scope.priceFor92 = 1299;
      $scope.priceFor100 = 1499;
      $scope.priceFor110 = 1599;
      $scope.price = $scope.priceFor92;
    
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
        $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/1.png";
        $scope.imgPickOrder = 1;
      }
      $scope.get2Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/2.png";
        $scope.imgPickOrder = 2;
      }
    
      $scope.get3Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/3dimension " + $scope.sizePick + "inch.png";
        $scope.imgPickOrder = 3;
      }
    
      $scope.get4Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/4.png";
        $scope.imgPickOrder = 4;
      }
    
      $scope.get5Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/5.png";
        $scope.imgPickOrder = 5;
      }


      $scope.get92inch = function(){
        $scope.sizePick = 92;

        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor92;
      }
      $scope.get100inch = function(){
        $scope.sizePick = 100;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor100;
      }
      $scope.get110inch = function(){
        $scope.sizePick = 110;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/floor-rising/3dimension " + $scope.sizePick + "inch.png";
        }

        $scope.price = $scope.priceFor110;
      }      

      /*------------------------------------Shopping cart -----------------------------------------------*/
  /*let cartIcon= document.querySelector('#cart-icon');
  let cart= document.querySelector('.cart');
  let closeCart= document.querySelector('#close-cart');

  //open shopping cart
  cartIcon.onclick = () => {
    cart.classList.add('active');

  };

  //close shopping cart
  closeCart.onclick = () => {
    cart.classList.remove('active');
  };*/

  //cart working js
  /*if(document.readyState=="loading"){
    document.addEventListener('DOMContentLoaded', ready);
  }
  else{
    ready();
  }

  //call this function is the page is finish loadding
  function ready(){
    //remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');

    for(var i=0; i<removeCartButtons.length;i++){
      var button = removeCartButtons[i];
      button.addEventListener('click', removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
      var input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
    }

    //Add to Cart
    var addCart = document.getElementsByClassName('addCart');
    for(var i = 0; i < addCart.length; i++){
      var button = addCart[i];
      console.log("addcart: " + addCart.length);
      button.addEventListener('click', addCartClicked);
    }

    document
      .getElementsByClassName('btn-buy')[0]
      .addEventListener('click', buyButtonClicked);
  };*/

  //buy button
  function buyButtonClicked(){
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
      cartContent.removeChild(cartContent.firstChild);
    }

    updateTotal();
  }

  //quantity changes function
  function quantityChanged(){
    var input = event.target;
    if(isNaN(input.value) || input.value <=0){
      input.value = 1;
    }
    updateTotal();
  }

  function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

    updateTotal();

  };

  //Add to cart
  function addCartClicked(event){
    //var button = event.target;
    //var shopProducts = button.parentElement;
    var title = document.getElementsByClassName('Text_heading__jNwbK')[0].innerText;
    console.log("title:" + title);
    var price = document.getElementsByClassName('itemPrice')[0].innerText;
    var productImg = '/modules/things-to-dos/client/img/floor-rising/1.png';
    addProductToCart(title, price, productImg);

    updateTotal();
  }

  
  //add product to cart
  function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');


    var cartItemQuantity = cartItems.getElementsByClassName('cart-quantity');

    for(var i=0; i<cartItemsNames.length;i++){
      if(cartItemsNames[i].innerText == title){
        var updateQuantity = parseInt(cartItemQuantity[i].value) + $scope.quantity; //update cart quantity depend on quantity on page
        cartItemQuantity[i].setAttribute("value", updateQuantity);
        Notification.info({ message: "You have already add this item to cart.", title: '<i class="glyphicon glyphicon-ok"></i> Watch Out!' });
        return;
      }
    }

    Notification.success({ message: "You add this item to cart.", title: '<i class="glyphicon glyphicon-ok"></i> Thank you!' });

    var cartBoxContent = '<img src='+productImg+' alt="" class="cart-img">'+
             '<div class="detail-box">'+
                '<div class="cart-product-title">'+title+'</div>'+
                '<div class="cart-price">' + price + '</div>'+
                '<input type="number" value="1" class="cart-quantity" style="padding: 0">'+
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


  }

  //update total
  function updateTotal(){
    var cartContent = document.getElementsByClassName('cart-content')[0];
    var cartBoxes = cartContent.getElementsByClassName('cart-box');
 

    var total = 0;
    for(var i=0; i<cartBoxes.length;i++){
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName('cart-price')[0];
      var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
      var price = parseFloat(priceElement.innerText.replace('$',""));
      var quantity = quantityElement.value;
      total = total + (price * quantity);
    }

    //if price contain some value like 0.4 x 5 comes out 1.9999, round up number
    total = Math.round(total*100)/100;
    //var totalPrices = document.getElementsByClassName('total-price')[0].innerText;
    var totalPrices = document.getElementsByClassName('total-price');
    //totalPrices[0].innerText = "$" + total;

    for(var i = 0; i < totalPrices.length; i++){
      totalPrices[i].innerText =  "$" + total;
    }
  }

      /*------------------------------------Shopping cart end-----------------------------------------------*/

} 
}());
