(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoriesController', CategoriesController);

    CategoriesController.$inject = ['categories']
    function CategoriesController(categories) {
        var categoriesCtrl = this;
        console.log(categories);
        categoriesCtrl.categories = categories;
    }

})();