(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$window', 'UsersRecordService', 'PurchaseHistoriesService','Notification'];

  function HeaderController($scope, $state, Authentication, menuService, $window, UsersRecordService, PurchaseHistoriesService,Notification) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    $scope.backToHomePage = function(){
       $state.go('home');
       //document.location.reload(); // refresh the page ,because the dash for home button has problem
    }

    $scope.goToContact = function(){
       $state.go('contacts.default');
    }

    $scope.goToLocation = function(){
       $state.go('locations.default');
    }

    $scope.goToThingToDo = function(){
       $state.go('things-to-dos.default');
    }

    /*--------------------------------shopping cart start--------------------------------*/
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
      document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
    };

    //buy button
    function buyButtonClicked(){

      //if the shopping cart is empty, do not store the data to database
      if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
        $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
        $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){
        Notification.error({ message: "Sorry, You do not have anything in shopping Cart.", title: '<i class="glyphicon glyphicon-remove"></i> Thank you!' });
        return;
      }

      //show notification to user
      Notification.success({ message: "Your Order is placed.", title: '<i class="glyphicon glyphicon-ok"></i> Thank you!' });

      var totalPrices = document.getElementsByClassName('total-price');
      var total =parseFloat(totalPrices[0].innerText.replace('$',""));    //total is for purchase history record

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
      updateShoppingToDatabase(data);

      data = {
          "purchaseHistory":{
            "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
            "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
            "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
          },
          "total": total
      };
      updatePurchaseHistoryToDataBase(data);
      
      //updata Total back to 0
      updateTotal();

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

    }


    $window.tabTension92Title = "Nova Spectrum Tab-Tension, 92-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.tabTension100Title = "Nova Spectrum Tab-Tension, 100-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.tabTension110Title = "Nova Spectrum Tab-Tension, 110-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.floorRising92Title = "Nova Spectrum Floor-Rising, 92-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.floorRising100Title = "Nova Spectrum Floor-Rising, 100-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.floorRising110Title = "Nova Spectrum Floor-Rising, 110-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.mobile92Title = "Nova Spectrum Portable Outdoor, 92-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.mobile100Title = "Nova Spectrum Portable Outdoor, 100-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
    $window.mobile110Title = "Nova Spectrum Portable Outdoor, 110-Inch, Active 3D 1080 8K Ultra HD [16:9]. Electric Motorized Projector Screen, Indoor/Outdoor Projector Movie Screen for Home Theater.";
   

    $window.tabTension92Price = '$779';
    $window.tabTension100Price = '$799';
    $window.tabTension110Price = '$999';
    $window.floorRising92Price = '$1299';
    $window.floorRising100Price = '$1499';
    $window.floorRising110Price = '$1599';
    $window.mobile92Price = '$50';
    $window.mobile100Price = '$60';
    $window.mobile110Price = '$70';

    $window.tabTensionImg = '/modules/things-to-dos/client/img/Tab-Tension/1.png';
    $window.floorRisingImg = '/modules/things-to-dos/client/img/floor-rising/1.png';
    $window.mobileImg = '/modules/things-to-dos/client/img/mobile/1.png';



    /*get  shopping cart and purchase history when a user finish sign in process*/
    $window.getProductRecord = function(){
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
          updateTotal();

        }, function(error) {
             console.log(error);
        });
    }

    /*If */
    if($window.user){
      getProductRecord();
    }

    function getProductRecord(){
      $window.getProductRecord();
    }

    //add product to cart
    function addProductToCart(title, price, productImg, quantity){
      var cartShopBox = document.createElement('div');
      cartShopBox.classList.add('cart-box');
      var cartItems = document.getElementsByClassName('cart-content')[0];

      var cartBoxContent = '<img src='+productImg+' alt="" class="cart-img">'+
             '<div class="detail-box">'+
                '<div class="cart-product-title">'+title+'</div>'+
                '<div class="cart-price">' + price + '</div>'+
                '<input type="number" value="' + quantity +  '"class="cart-quantity" style="padding: 0">'+
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

    //quantity changes function
    function quantityChanged(event){
      $window.quantityChanged(event)
    }

    function removeCartItem(event){
      $window.removeCartItem(event);
    }; 

    //let updateTotal function same as $window.updateTotal function
    function updateTotal(){
      $window.updateTotal();
    }

    $window.quantityChanged = function(event){
      console.log("change function is called");
      var input = event.target;
      if(isNaN(input.value) || input.value <=0){
        input.value = 1;
      }
      updateTotal();

      var updatedQuantity = event.target.value;
      var title = event.target.parentElement.getElementsByClassName('cart-product-title')[0].innerText;

      var data = {
        "shoppingCart":{
          "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
          "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
          "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
        }
      };

      if(title == $window.tabTension92Title){
        data.shoppingCart.tab_tension._92inch = updatedQuantity;
        $window.cartTabTension92 = updatedQuantity;
      }
      else if(title == $window.tabTension100Title){
        data.shoppingCart.tab_tension._100inch = updatedQuantity;
        $window.cartTabTension100 = updatedQuantity;
      }
      else if(title == $window.tabTension110Title){
        data.shoppingCart.tab_tension._110inch = updatedQuantity;
        $window.cartTabTension110 = updatedQuantity;
      }
      else if(title == $window.floorRising92Title){
        data.shoppingCart.floor_rising._92inch = updatedQuantity;
        $window.cartFloorRising92 =updatedQuantity;
      }
      else if(title == $window.floorRising100Title){
        data.shoppingCart.floor_rising._100inch = updatedQuantity;
        $window.cartFloorRising100 = updatedQuantity;
      }
      else if(title == $window.floorRising110Title){
        data.shoppingCart.floor_rising._110inch = updatedQuantity;
        $window.cartFloorRising110 = updatedQuantity;
      }

      updateShoppingToDatabase(data);
    }

    $window.removeCartItem = function(event){
      var buttonClicked = event.target;
      buttonClicked.parentElement.remove();

      /*set database to 0 when user want to delete start*/
      var data = {
        "shoppingCart":{
          "tab_tension": {"_92inch":$window.cartTabTension92,"_100inch":$window.cartTabTension100, "_110inch":$window.cartTabTension110},
          "floor_rising": {"_92inch":$window.cartFloorRising92,"_100inch":$window.cartFloorRising100, "_110inch":$window.cartFloorRising110},
          "mobile": {"_92inch":$window.cartMobile92,"_100inch":$window.cartMobile100, "_110inch":$window.cartMobile110}
        }
      };

      var title = buttonClicked.parentElement.getElementsByClassName('cart-product-title')[0].innerText;

      if(title == $window.tabTension92Title){
        data.shoppingCart.tab_tension._92inch = 0;
        $window.cartTabTension92 = 0;

      }
      else if(title == $window.tabTension100Title){
        data.shoppingCart.tab_tension._100inch = 0;
        $window.cartTabTension100 = 0;
      }
      else if(title == $window.tabTension110Title){
        data.shoppingCart.tab_tension._110inch = 0;
        $window.cartTabTension110 = 0;
      }
      else if(title == $window.floorRising92Title){
        data.shoppingCart.floor_rising._92inch = 0;
        $window.cartFloorRising92 = 0;
      }
      else if(title == $window.floorRising100Title){
        data.shoppingCart.floor_rising._100inch = 0;
        $window.cartFloorRising100 = 0;
      }
      else if(title == $window.floorRising110Title){
        data.shoppingCart.floor_rising._110inch = 0;
        $window.cartFloorRising110 = 0;
      }

       updateShoppingToDatabase(data);

      updateTotal();
    }

    function updateShoppingToDatabase(data){
      $window.updateShoppingToDatabase(data);
    }

    function updatePurchaseHistoryToDataBase(data){
      $window.updatePurchaseHistoryToDataBase(data);
    }

    $window.updatePurchaseHistoryToDataBase = function(data){
        PurchaseHistoriesService.create(data)
        .then(function(response) {
      }, function(error) {
        console.log(error);
      });
    }

    $window.updateShoppingToDatabase = function(data){
      /* Save the products record and purchase history using the UsersRecordService factory */
      UsersRecordService.update(data)
        .then(function(response) {

      }, function(error) {
        console.log(error);
      });
    }

    //update total
    $window.updateTotal = function(){
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
  }
}());
