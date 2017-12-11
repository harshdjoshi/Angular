(function () {

    'use strict';

    angular.module('Module1', [])
    .controller('Module1Controller', function ($scope) {
        $scope.result = "";
        $scope.lunchMenu = "";
        $scope.itemCount = function () {
            var countTotal = 0;
            var items = $scope.lunchMenu.split(",");
            for(var i=0;i<items.length;i++)
            {
                if (items[i].replace(/ /g,'').length > 0)
                    countTotal++;
            }
            return countTotal;
        }
        $scope.CheckTooMuch = function()
        {
            var count = $scope.itemCount();
            if (count == 0)
                $scope.result = "Please enter data first";
            if (count > 0 && count < 4)
                $scope.result = "Enjoy!";
            if (count > 3)
                $scope.result = "Too much!";
        }
    });

})();