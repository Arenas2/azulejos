app.controller('adminCtrl', function ($scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, AuthService,  $transitions, $state, $mdDialog, $window, $localStorage) {

    $scope.productos = [];

    $scope.mdDialogTarjeta = function(data){
        mdDialog.mostrardialog('nuevoproducto', 'adminCtrl', $scope.customFullscreen);
    }

    $transitions.onSuccess({}, trans => {
        var authorizedRoles = $state.current.data.authorizedRoles;
        var s = AuthService.autorizacion(authorizedRoles);
        if (s === false) {

            alert = $mdDialog.alert()
            .title('Alerta')
            .content('No estas autorizado para estar en esta sección')
            .ok('Close'),

            $mdDialog
                .show( alert )
                .finally(function() {
                alert = undefined;
            })
            $state.go('home');
        }
    });

    $scope.token = $localStorage.token

    AuthService.token($scope.token)
    .then(data => {
        console.log(data)

        $scope.usuario = data.usuario;
        $scope.secciones.forEach(seccion => {
            let rol = data.usuario.privilegio;
            let bandera = _.includes(seccion.estado, rol)
            if(bandera === false){
                seccion.visible = false;
            }else{
                seccion.visible = true;
            }

            console.log($scope.secciones)
        })
    })

    $scope.secciones = [
        {
            nombre: 'Home',
            icon: 'home',
            state: 'home'
        }, {
            nombre: 'Productos',
            icon: 'shopping_cart',
            state: 'producto'
        },
        {
            nombre: 'Cotizaciones',
            icon: 'list',
            state: 'cotizaciones'
        },
        {
            nombre: 'Galeria',
            icon: 'photo_album',
            state: 'galeria'
        }, {
            nombre: 'Promociones',
            icon: 'local_offer',
            state: 'promo'
        }, {
            nombre: 'Catalogos',
            icon: 'bookmaker',
            state: 'catalogo'
        }, {
            nombre: 'Sucursales',
            icon: 'store',
            state: 'sucursales'
        },
		{
            nombre: 'Usuarios',
            icon: 'person',
            state: 'usuarios'
        }
    ];

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

    $scope.Dropify = function() {

        $('.dropify').dropify({
            messages: {
                default: 'Agregar',
                replace: 'Reemplazar',
                remove: 'Eliminar',
                error: 'Error'
            }
        });

        $('.dropify').on('change', function() {

            var input = this;
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    // bind new Image to Component
                    $scope.$apply(function() {
                        $scope.inputImage = e.target.result;
                    });
                }

                reader.readAsDataURL(input.files[0]);
            }
        });

    };

});
