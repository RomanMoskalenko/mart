/**
 * Created by Roma on 06.10.2016.
 */

'use strict';

app.controller('cartCtrl', ['$scope', '$location', 'martCart', 'FlashService', function ($scope, $location, cart, FlashService) {
    cart.init('artworks');

    updateCartData();

    $scope.addToCart = function (id) {
        //cart.addItem(id);
        //updateCartData();
    }

    $scope.removeFromCartById = function (id) {
        let items = cart.getAllItems();
        let index;
        for (let i = 0; i < items.length; i++) {
            if (items[i]['id'] === id) {
                index = i;
                break;
            }
        }

        cart.removeItem(index);
        updateCartData();
    }

    $scope.removeFromCartByIndex = function (index) {
        cart.removeItem(index);
        updateCartData();
    }

    $scope.isTheItemInCart = function (id) {
        let items = cart.getAllItems();
        let result = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i]['id'] === id) {
                result = true;
                break;
            }
        }

        return result;
    }

    $scope.plusOneItem = function (index) {
        let items = cart.getAllItems();
        let currentCount = cart.getQuantityByIndex(index);
        if (currentCount < 20) cart.updateQuantity(index, currentCount+1);
        updateCartData();
    }

    $scope.minusOneItem = function (index) {
        let items = cart.getAllItems();
        let currentCount = cart.getQuantityByIndex(index);
        if (currentCount > 1) cart.updateQuantity(index, currentCount-1);
        updateCartData();
    }

    $scope.getPriceByIndex = function(index) {
        return cart.price.subTotal(index);
    }

    $scope.cartNextStep = function () {
        if ($scope.activeStep > 2) return;
        $scope.activeStep += 1;
    }

    $scope.cartPrevStep = function () {
        if ($scope.activeStep < 1) return;
        $scope.activeStep -= 1;
    }

    $scope.submit = function () {
        cart.createOrder($scope.orderData).then(function (data) {
            console.log(data);
            //FlashService.Success('cart_1', true);
            cart.clearCookie();
        }, function () {
            FlashService.Error('cart_0', false);
        });
    }

    function updateCartData() {
        $scope.cartItemsCount = cart.totalItems();
        $scope.cartItems = cart.getAllItems();
        $scope.priceTotal = cart.price.total();
        $scope.activeStep = 0;
        $scope.orderData = {
            artworks: [],
            order_price: cart.price.total()
        };

        let index = 0;

        angular.forEach($scope.cartItems, function (value, key) {
            $scope.orderData.artworks.push({id: value.id, artwork_data: "holst, maslo", qty: cart.getQuantityByIndex(index), subtotal: cart.price.subTotal(index)});
            index++;
        });


        if ($scope.cartItemsCount === 0 && $location.path() === '/cart') {
            $location.path('/');
        }
    }
}]);