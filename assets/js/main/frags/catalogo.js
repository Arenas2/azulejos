var app = angular.module('myapp');

app.controller('catalogoCtrl', function($scope, $sce, $stateParams, Catalogo, Marca, $mdDialog) {

    console.log($stateParams)

    var id = $stateParams.id

    Marca.one(id).then(res => {
        $scope.marca = res.data;
        console.log(res)
        $scope.$digest()
    })

    $scope.cambio = (direccion) => {

        console.log(direccion)

        $mdDialog.show({
            templateUrl: '/dialogs/catalogo',
            parent: angular.element(document.body),
            locals: {
                direccion: direccion
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, Producto, alertas, $state, direccion){

                $scope.direccion = direccion;

                $scope.trustSrc = function(src) {
                   return $sce.trustAsResourceUrl(src);
                }

                $scope.close = function(){
                    $mdDialog.hide();
                }

                $scope.agregar = function(){
                    $mdDialog.hide(producto);
                }

            }
        }).then(data => {

            $scope.agregar(data)

        });

    }



});
