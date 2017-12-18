var app = angular.module('myapp');

app.controller('cotizacionesCtrl', function($scope, Cotizacion, $mdDialog) {

    Cotizacion.obtener().then(res => {
        $scope.cotizaciones = res.data;
        console.log(res.data)
        $scope.$digest();
    })

    $scope.verCotizacion = function(cotizacion) {
        $mdDialog.show({
            templateUrl: '/partials/bolsa',
            parent: angular.element(document.body),
            locals: {
                id: cotizacion.id
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, alertas, $state, id, Cotizacion) {

                    Cotizacion.obtenerBolsa(id).then(res => {
                        $scope.productos = res.data;
                        $scope.$digest();
                        console.log(res.data)
                    })

                    $scope.close = function() {
                        $mdDialog.hide(false);

                    }
                }
            }).then(data => {


            });
        }

});
