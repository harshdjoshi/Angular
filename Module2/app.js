(function () {

    'use strict';
  

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService',ShoppingListCheckOffService);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService)
    {
        var list = this;
        list.items = ShoppingListCheckOffService.getItems();
        list.BuyItem = function (itemIndex) {
            ShoppingListCheckOffService.BuyItem(itemIndex);
        };
    }
    function ShoppingListCheckOffService() {
        var service = this;
        var toBuyList = [
        {
            name: "Ravioli",
            quantity: "2"
        },
        {
            name: "Bread",
            quantity: "4"
        },
        {
            name: "Cookies",
            quantity: "300"
        },
        {
            name: "Chocolate",
            quantity: "5"
        },
        {
            name: "Coke",
            quantity: "7"
        }
        ];
        var boughtList = [];

        service.BuyItem = function (itemIndex) {
            var item = {
                name: toBuyList[itemIndex - 1].name,
                quantity: toBuyList[itemIndex - 1].quantity
            };
            boughtList.push(item);
            toBuyList.splice(itemIndex, 1);
        };
        service.getItems = function () {
            return toBuyList;
        };
    }
        

    })