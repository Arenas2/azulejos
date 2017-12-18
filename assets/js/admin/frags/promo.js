var app = angular.module('myapp');

app.controller('promoCtrl', function($scope, alertas, $rootScope, $http, mdDialog, $mdDialog, Promo) {

    $scope.section = 'Promocion';

    Promo.obtener().then(res => {
        $scope.promos = res.data;
        $scope.$digest();
        console.log(res.data)
    })

    $scope.crearPromocion = function(promo){

        promo.status = 0;
        Promo.crear(promo).then(res => {
            console.log(res.data);
        })
    }

});
