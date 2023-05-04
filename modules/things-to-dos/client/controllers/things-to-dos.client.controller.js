(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('ThingsToDosController', ThingsToDosController);

  ThingsToDosController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function ThingsToDosController ($scope, $state, $window, Authentication) {

    $scope.backToHomePage = function(){
       $state.go('home');
       window.scrollTo(0, 0);
    }



  let cartIcon= document.querySelector('#cart-icon');
  let cart= document.querySelector('.cart');
  let closeCart= document.querySelector('#close-cart');

  //open shopping cart
  cartIcon.onclick = () => {
    cart.classList.add('active');

  };

  //close shopping cart
  closeCart.onclick = () => {
    cart.classList.remove('active');
  };

  //cart working js
  if(document.readyState=="loading"){
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
    var addCart = document.getElementsByClassName('add-cart');
    for(var i = 0; i < addCart.length; i++){
      var button = addCart[i];
      button.addEventListener('click', addCartClicked);
    }

    document
      .getElementsByClassName('btn-buy')[0]
      .addEventListener('click', buyButtonClicked);
  };

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
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);

    updateTotal();
  }

  //add product to cart
  function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for(var i=0; i<cartItemsNames.length;i++){
      if(cartItemsNames[i].innerText == title){
        alert("You have already add this item to cart");
      }
    }

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
    document.getElementsByClassName('total-price')[0].innerText = "$" + total;
  }



  //for testing purpose
  /*$scope.goToDetailPage= function(name){
    $state.go('things-to-dos.view', {product_name:name});
  }*/
  $scope.goToTabTensionPage= function(){
    $state.go('things-to-dos.tab-tension');
  }

  $scope.goToFloorRisingPage= function(){
    $state.go('things-to-dos.floor-rising');
  }
}
}());
