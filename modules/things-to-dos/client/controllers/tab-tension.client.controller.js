


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
      $scope.maxPurchase = 5; //change header controller if you want to update this data
      $scope.minPurchase = 1; //change header controller if you want to update this data
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
      var type = "tab-tension";
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
