(function () {

    'use strict';
    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('CategoriesPath', "https://davids-restaurant.herokuapp.com/categories.json")
        .constant('CategoryItemPath'," https://davids-restaurant.herokuapp.com/menu_items.json");
    
    
    MenuDataService.$inject = ['$http', 'CategoriesPath', 'CategoryItemPath', '$q'];
    function MenuDataService($http, CategoriesPath, CategoryItemPath, $q) {
        var service = this;

        service.getItemsForCategory = function (categoryShortName) {
            console.log("Param :",categoryShortName);
            return  $http({
                method: 'GET',
                url: (CategoryItemPath),
                params: { category: categoryShortName }
            });
            
        };
        
        service.getAllCategories = function () {
            
            return  $http({
                method: 'GET',
                url: (CategoriesPath)
            });
            
        }
    
    };
    

   
})();