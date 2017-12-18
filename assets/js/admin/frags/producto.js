var app = angular.module('myapp');

app.controller('productoCtrl', function($scope, alertas, $rootScope, $http, mdDialog, $mdDialog, Producto) {

    // $scope.ProductoDialog = function(ev) {
    //     mdDialog.mostrardialog('nuevoProducto', 'productoCtrl', $scope.customFullscreen, ev);
    // };

    obtenerproductos()

    function obtenerproductos(){

        Producto.obtener().then(function(data) {
            $scope.productos = data.data;
            console.log($scope.productos);
            $scope.$digest();
        })
    }

    $scope.ProductoDialog = function(ev) {
        $mdDialog.show({
            templateUrl: '/partials/nuevoProducto',
            parent: angular.element(document.body),
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, Producto, alertas, $state){

                Producto.categorias().then(res => {$scope.categorias = res.data})

                $scope.submit = function(producto){

                    Producto.crear(producto).then(res => {
                        $mdDialog.hide();
                        $state.go('infoProducto', { id : res.data})
					})
                    // $mdDialog.hide(res.data);
                    alertas.mostrarToastEstandar("Producto editado correctamente");
                }

                $scope.close = function() {
                    $mdDialog.hide();
                }
            }
        })
    };

});
