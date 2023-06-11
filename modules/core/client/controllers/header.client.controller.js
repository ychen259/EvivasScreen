(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', 'Authentication', 'menuService', '$window', 'UsersRecordService', 'PurchaseHistoriesService','Notification'];

  function HeaderController($scope, $state, Authentication, menuService, $window, UsersRecordService, PurchaseHistoriesService,Notification) {
    var vm = this;

var screenWidth = window.innerWidth + 'px';
document.documentElement.style.setProperty('--screen-width', screenWidth);
console.log("screenWidth:" + screenWidth);
    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');
    $scope.maxPurchase = 5; //change header controller, tab-tension, floor rising, portable controllerif you want to update this data
    $scope.minPurchase = 1; //change header controller, tab-tension, floor rising, portable controllerif you want to update this data

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    $scope.isEmptyShoppingCart = false;

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
    let overlay = document.getElementById('overlay');

    //open shopping cart
    cartIcon.onclick = () => {
      cart.classList.add('active');
      overlay.classList.toggle('show');
      document.body.classList.toggle('cart-open');
    };

    //close shopping cart
    closeCart.onclick = () => {
      cart.classList.remove('active');
      overlay.classList.remove('show');
      document.body.classList.remove('cart-open'); 
    };

    overlay.addEventListener('click', () => {
      cart.classList.remove('active');
      overlay.classList.remove('show');
      document.body.classList.remove('cart-open'); 
    });

    //cart working js
    if(document.readyState=="loading"){
      document.addEventListener('DOMContentLoaded', ready);
    }
    else{
      ready();
    }

    //call this function is the page is finish loadding
    function ready(){

      /*this one is for old buy now button*/
      document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
    };

    //buy button
    function buyButtonClicked(){
      if($window.user){
        cart.classList.remove('active');
        $state.go('checkouts.form');
      }
      //if there is no user go to login
      else{
        //go to login page and close shopping cart
        $state.go('authentication.signin');
        cart.classList.remove('active');
      }

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
   

    /*If you want to change the price, please change the price in config file, config file is for database to calculate the total*/
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
    $window.floorRisingImg = '/modules/things-to-dos/client/img/floor-rising/1.jpg';
    $window.mobileImg = '/modules/things-to-dos/client/img/portable/1.webp';


    $window.cartTabTension92 = 0; 
    $window.cartTabTension100 = 0; 
    $window.cartTabTension110 = 0;
    $window.cartFloorRising92 = 0;
    $window.cartFloorRising100 = 0; 
    $window.cartFloorRising110 = 0;              
    $window.cartMobile92 = 0; 
    $window.cartMobile100 = 0; 
    $window.cartMobile110 = 0;

    /*get  shopping cart and purchase history when a user finish sign in process*/
    $window.getProductRecord = function(){
      if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
          $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
          $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){

        UsersRecordService.getRecord()
          .then(function(response){
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

            if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
              $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
              $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){
              $scope.isEmptyShoppingCart = true;
            }

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

            updateTotal();

          }, function(error) {
               console.log(error);
          });
      }
    }

    /*If */
    if($window.user){
      getProductRecord();
    }else{
      $scope.isEmptyShoppingCart = true;
    }

    function getProductRecord(){
      $window.getProductRecord();
    }

    //add product to cart, for getProductRecord function
    function addProductToCart(title, price, productImg, quantity){

      $scope.isEmptyShoppingCart = false;

      var cartShopBox = document.createElement('div');
      cartShopBox.classList.add('cart-box');
      var cartItems = document.getElementsByClassName('cart-content')[0];

      var cartBoxContent = '<img src='+productImg+' alt="" class="cart-img">'+
             '<div class="detail-box">'+
                '<div class="cart-product-title">'+title+'</div>'+
                '<div class="cart-price">' + price + '</div>'+
                '<input type="number" value="' + quantity +  '"class="cart-quantity" style="padding: 0" max="' + $scope.maxPurchase +  '"min="' + $scope.minPurchase+ '">'+
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
      else if(title == $window.mobile92Title){
        data.shoppingCart.mobile._92inch = updatedQuantity;
        $window.cartMobile92 =updatedQuantity;
      }
      else if(title == $window.mobile100Title){
        data.shoppingCart.mobile._100inch = updatedQuantity;
        $window.cartMobile100 = updatedQuantity;
      }
      else if(title == $window.mobile110Title){
        data.shoppingCart.mobile._110inch = updatedQuantity;
        $window.cartMobile110 = updatedQuantity;
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
      else if(title == $window.mobile92Title){
        data.shoppingCart.mobile._92inch = 0;
        $window.cartMobile92 = 0;
      }
      else if(title == $window.mobile100Title){
        data.shoppingCart.mobile._100inch = 0;
        $window.cartMobile100 = 0;
      }
      else if(title == $window.mobile110Title){
        data.shoppingCart.mobile._110inch = 0;
        $window.cartMobile110 = 0;
      }

      if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
            $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
            $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){
            $scope.isEmptyShoppingCart = true;
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

          let cart= document.querySelector('.cart');
          cart.classList.remove('active'); // close shopping cart
          $state.go('purchase-histories.list');
          Notification.success({ message: "Transaction " + transaction.status + ": " + transaction.id, title: '<i class="glyphicon glyphicon-ok"></i> Thank you!' });
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


    //add product to cart, but add to cart button
    $window.addProductToCart = function(title, price, productImg, size, quantity, type){
          $scope.isEmptyShoppingCart = false;
          
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
              var updateQuantity = parseInt(cartItemQuantity[i].value) + quantity; //update cart quantity depend on quantity on page   

              if(updateQuantity > 5){
                Notification.info({ message: "You have already reach purchase maximum, you cannot add product to the cart!", title: '<i class="glyphicon glyphicon-ok"></i>I am Sorry!' });
                return;
              }

              cartItemQuantity[i].value = updateQuantity;
              Notification.info({ message: "You have already add this item to cart.", title: '<i class="glyphicon glyphicon-ok"></i> Watch Out!' });

              if(size == 92 && type == "tab-tension"){
                data.shoppingCart.tab_tension._92inch = updateQuantity;
                $window.cartTabTension92 = updateQuantity;
              }
              if(size == 100 && type == "tab-tension"){
                data.shoppingCart.tab_tension._100inch = updateQuantity;
                $window.cartTabTension100 = updateQuantity;
              }
              if(size == 110 && type == "tab-tension"){
                data.shoppingCart.tab_tension._110inch = updateQuantity;
                $window.cartTabTension110 = updateQuantity;
              }
              if(size == 92 && type == "floor-rising"){
                data.shoppingCart.floor_rising._92inch = updateQuantity;
                $window.cartFloorRising92 = updateQuantity;
              }
              if(size == 100 && type == "floor-rising"){
                data.shoppingCart.floor_rising._100inch = updateQuantity;
                $window.cartFloorRising100 = updateQuantity;
              }
              if(size == 110 && type == "floor-rising"){
                data.shoppingCart.floor_rising._110inch = updateQuantity;
                $window.cartFloorRising110 = updateQuantity;
              }
              if(size == 92 && type == "mobile"){
                data.shoppingCart.mobile._92inch = updateQuantity;
                $window.cartMobile92 = updateQuantity;
              }
              if(size == 100 && type == "mobile"){
                data.shoppingCart.mobile._100inch = updateQuantity;
                $window.cartMobile100 = updateQuantity;
              }
              if(size == 110 && type == "mobile"){
                data.shoppingCart.mobile._110inch = updateQuantity;
                $window.cartMobile110 = updateQuantity;
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
                                  '<input type="number" value="' + quantity +  '"class="cart-quantity" style="padding: 0" max="' + $scope.maxPurchase +  '"min="' + $scope.minPurchase+ '">'+
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

          if(size == 92 && type == "tab-tension"){
                data.shoppingCart.tab_tension._92inch = quantity;
                $window.cartTabTension92 = quantity;
          }
          if(size == 100 && type == "tab-tension"){
                data.shoppingCart.tab_tension._100inch = quantity;
                $window.cartTabTension100 = quantity;
          }
          if(size == 110 && type == "tab-tension"){
                data.shoppingCart.tab_tension._110inch = quantity;
                $window.cartTabTension110 = quantity;
          }
          if(size == 92 && type == "floor-rising"){
                data.shoppingCart.floor_rising._92inch = quantity;
                $window.cartFloorRising92 = quantity;
          }
          if(size == 100 && type == "floor-rising"){
                data.shoppingCart.floor_rising._100inch = quantity;
                $window.cartFloorRising100 = quantity;
          }
          if(size == 110 && type == "floor-rising"){
                data.shoppingCart.floor_rising._110inch = quantity;
                $window.cartFloorRising110 = quantity;
          }
          if(size == 92 && type == "mobile"){
                data.shoppingCart.mobile._92inch = quantity;
                $window.cartMobile92 = quantity;
          }
          if(size == 100 && type == "mobile"){
                data.shoppingCart.mobile._100inch = quantity;
                $window.cartMobile100 = quantity;
          }
          if(size == 110 && type == "mobile"){
                data.shoppingCart.mobile._110inch = quantity;
                $window.cartMobile110 = quantity;
          }
          updateShoppingToDatabase(data);

    }


    $window.paypalButtonClicked = function(detailAddress){
      if($window.user){
          /*avoid user delete the item in checkout page*/
          if($window.cartTabTension92 == 0 && $window.cartTabTension100 == 0 && $window.cartTabTension110 == 0 &&
              $window.cartFloorRising92 == 0 && $window.cartFloorRising100 == 0 && $window.cartFloorRising110 == 0 &&
              $window.cartMobile92 == 0 && $window.cartMobile100 == 0 && $window.cartMobile110 == 0){
              Notification.error({ message: "You have nothing in the cart.", title: '<i class="glyphicon glyphicon-ok"></i> Watch Out!' });
              return;
          }

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
              'address': detailAddress
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
}
}());
