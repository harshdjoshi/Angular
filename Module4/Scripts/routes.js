(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home.template.html' 
            })

            // Categories page
            .state('categories', {
                url: '/categories',
                component: 'categories',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories().then(function (response) {
                            return response.data;
                        });
                    }]
                }
            })

            // Items page
            .state('items', {
                url: '/items/{categoryId}',
                component: 'items',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.categoryId).then(function (response) {
                            return response.data.menu_items;
                        });
                    }]
                }
            });
        
    }

})();