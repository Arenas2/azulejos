var app = angular.module('myapp');

app.controller('sucursalCtrl', function($scope, $stateParams, $mdDialog, Sucursal, alertas) {

    var id = $stateParams.id

    Sucursal.one(id).then(res => {
        $scope.sucursal = res.data;
        console.log(res)
    })

    $scope.actualizar = (sucursal) => {

        Sucursal.editar(sucursal).then(res => {
            alertas.mostrarToastEstandar("Sucursal editada");
        })

    }

    $scope.agregarUsuario = () => {

        $mdDialog.show({
            templateUrl: '/dialogs/agregarusuario',
            parent: angular.element(document.body),
            locals: {
                id : id
            },
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, Usuario, Sucursal, id) {

                Usuario.obtener().then(res => {
                    $scope.usuarios = res.data;
                })

                $scope.submit = (usuario) => {
                    Sucursal.unir(id, usuario.id).then(res => {
                        $mdDialog.hide(usuario)
                    })
                }

            },
        }).then(data => {

            $scope.sucursal.Usuario.push(data)

        }, function() {})
    }

});
