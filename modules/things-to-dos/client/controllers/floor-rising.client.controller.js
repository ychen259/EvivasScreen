(function () {
  'use strict';

  // Things to dos controller
  angular
    .module('things-to-dos')
    .controller('Floor-rising-Controller', ThingsToDosViewController);

  ThingsToDosViewController.$inject = ['$scope', '$state', '$window', 'Authentication'];

  function ThingsToDosViewController ($scope, $state, $window, Authentication) {

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

      /*Tab tension end here*/  
   // }
    /*else if($scope.typeOfScreen == "floor-up"){
    }
    else{
    }*/


} 
}());
