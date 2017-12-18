var app = angular.module('myapp');

app.controller('usuarioCtrl', function($scope, $stateParams, $mdDialog, Usuario, alertas) {

    var id = $stateParams.id

    $scope.actualizar = (usuario) => {

        Usuario.editar(usuario).then(res => {
            alertas.mostrarToastEstandar("Usuario editado");
        })

    }


    Usuario.one(id).then(res => {
        $scope.usuario = res.data;
        console.log(res)
    })


    $scope.agregarSucursal = () => {

        $mdDialog.show({
            templateUrl: '/dialogs/agregarsucursal',
            parent: angular.element(document.body),
            locals: {
                id : id
            },
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, Sucursal, id) {

                Sucursal.obtener().then(res => {
                    $scope.sucursales = res.data;
                })

                $scope.submit = (sucursal) => {

                    console.log(sucursal)
                    Sucursal.unir(sucursal.id, id).then(res => {
                        $mdDialog.hide(sucursal)
                    })
                }
            },
        }).then(data => {

            $scope.usuario.Sucursal.push(data)

        }, function() {})



    }

});
