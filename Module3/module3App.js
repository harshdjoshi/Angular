(function () {

    'use strict';
    angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");
    
    function FoundItemsDirective()
    {
        var ddo = {
            templateUrl: 'FoundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: MenuListDirectiveController,
            controllerAs: 'menu',
            bindToController: true
        };
        return ddo;
    }

    function MenuListDirectiveController()
    {
        //no use - still need it?
    }
    NarrowItDownController.$inject = ['MenuSearchService']
    function NarrowItDownController (MenuSearchService)
    {
        var controller = this;
        controller.enteredText = "";
       
        controller.getMenuItemsClicked = function () {
            if (controller.enteredText === "") {
                controller.found = []
            }
            else {
                var promise = MenuSearchService.getMatchedMenuItems(controller.enteredText);
                promise.then(function (response) {
                    controller.found = response;
                })
                .catch(function (error) {
                    console.log("Something went wrong", error);
                });
            }
        };
        controller.removeItem = function (itemIndex) {
            console.log(itemIndex);
            controller.found.splice(itemIndex, 1);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath','$q'];
    function MenuSearchService($http,ApiBasePath,$q){
        var service = this;
        var foundItems = [];
        service.getMatchedMenuItems = function (searchTerm) {
            foundItems = [];
            var response = $http({
                method: "GET",
                url: (ApiBasePath)
            }).then(function (result) {
               
                for (var i = 0; i < result.data.menu_items.length; i++)
                {
                    var item = result.data.menu_items[i];
                    if(item.description.indexOf(searchTerm) !== -1 )
                    {
                       foundItems.push(item);
                    }
                }
                
                return foundItems;
            });
            return response;
        };
     

    }

})();


