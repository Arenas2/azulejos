var app = angular.module('myapp');

app.controller('sucursalesCtrl', function($scope, alertas, $state, $rootScope, $http, mdDialog, $mdDialog, Sucursal) {

    $scope.section = 'Sucursal';

	$scope.irSucursal = (sucursal) => {
        $state.go('sucursal', {id: sucursal.id})
	}

    Sucursal.obtener().then(res => {
        $scope.sucursales = res.data
        $scope.$digest()
        console.log(res)
    })

    $scope.ventana = (sucursal) => {

        $mdDialog.show({
            templateUrl: '/dialogs/nuevasucursal',
            parent: angular.element(document.body),
            locals: {
                sucursal: sucursal
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: true,
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog, Producto, alertas, sucursal, $state, Sucursal){

                $scope.location = sucursal
                $scope.centro = { latitude: 22.2596989, longitude: -97.8482641}

                $scope.$watch('location', function(location) {

                    if(location){
                        $scope.centro = {
                            latitude: location.latitude,
                            longitude: location.longitude
                        };
                    }

                });

                $scope.close = function(){
                    $mdDialog.hide();
                }

                $scope.submit = (location) => {

                    Sucursal.crear(location).then(res => {
                        console.log(res)
                    })

                }
            }
        }).then(data => {

        });



    }

});
