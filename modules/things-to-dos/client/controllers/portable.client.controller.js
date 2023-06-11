


(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('Portable-Outdoor-Controller', ThingsToDosViewController);

  ThingsToDosViewController.$inject = ['$scope', '$state', '$window', 'Authentication', 'Notification', 'UsersRecordService'];

  function ThingsToDosViewController ($scope, $state, $window, Authentication, Notification, UsersRecordService) {

    $scope.typeOfScreen = $state.params.product_name;
    
      /*Portable outdoor Start*/
      $scope.quantity= 1;
      $scope.maxPurchase = 5; //change header controller if you want to update this data
      $scope.minPurchase = 1; //change header controller if you want to update this data
      $scope.imgSrc = $window.mobileImg;    //link for pick image
      $scope.imgPickOrder = 1;                                      //Order of image is being pick
      $scope.sizePick = 92;                                         //size of screen is being pick
      $scope.priceFor92 = $window.mobile92Price;
      $scope.priceFor100 = $window.mobile100Price;
      $scope.priceFor110 = $window.mobile110Price;
      $scope.price = $scope.priceFor92;
      $scope.title = $window.mobile92Title;

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
        $scope.imgSrc = "/modules/things-to-dos/client/img/portable/1.webp";
        $scope.imgPickOrder = 1;
      }
      $scope.get2Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/portable/2.webp";
        $scope.imgPickOrder = 2;
      }
    
      $scope.get3Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/portable/3.webp";
        $scope.imgPickOrder = 3;
      }
    
      $scope.get4Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/portable/4.webp";
        $scope.imgPickOrder = 4;
      }
    
      $scope.get5Img = function(){
        $scope.imgSrc = "/modules/things-to-dos/client/img/portable/5.webp";
        $scope.imgPickOrder = 5;
      }


      $scope.get92inch = function(){
        $scope.sizePick = 92;

        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/portable/3.webp";
        }

        $scope.price = $scope.priceFor92;
        $scope.title = $window.mobile92Title;
      }
      $scope.get100inch = function(){
        $scope.sizePick = 100;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/portable/3.webp";
        }

        $scope.price = $scope.priceFor100;
        $scope.title = $window.mobile100Title;
      }
      $scope.get110inch = function(){
        $scope.sizePick = 110;
        if($scope.imgPickOrder == 3){
          $scope.imgSrc = "/modules/things-to-dos/client/img/portable/3.webp";
        }

        $scope.price = $scope.priceFor110;
        $scope.title = $window.mobile110Title;
      }      

      //call this function to update total otherwise the value on the bottom will be 0
      updateTotal();
      
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

      var size = $scope.sizePick;
      var quantity = $scope.quantity;
      var type = "mobile";
      addProductToCart(title, price, productImg, size, quantity, type);

      updateTotal();
    }else{

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

  function addProductToCart(title, price, productImg, size, quantity, type){
    $window.addProductToCart(title, price, productImg, size, quantity, type);
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
