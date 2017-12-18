app.controller('mainCtrl', function($scope, $rootScope, $state, mdDialog, AuthService, $localStorage, $mdPanel, Producto) {

    $localStorage.usuario = false;

    Producto.categorias().then(res => {
        $scope.categorias = res.data
        // console.log(res.data)
        $scope.$digest();
    })

    $scope.irA = (categoria) => {
        $state.go('filtro', {id: categoria.id, titulo: _.snakeCase(categoria.nombre)})
    }

    $scope.registro = function(usuario) {
        AuthService.registro(usuario);
    }

    $scope.login = function(x) {
        AuthService.login(x);
    }


    $scope.iniciosesion = function(ev) {
        mdDialog.mostrardialog('login', 'mainCtrl', $scope.customFullscreen);
    };

    $scope.registrarse = function() {
        mdDialog.mostrardialog('registro', 'mainCtrl', $scope.customFullscreen);
    }

    $scope.showPanel = function($event) {
        $mdPanel.open('Panel', {
            id: 'esto es un menu',
            position:
                $mdPanel
                .newPanelPosition()
                .relativeTo($event.srcElement)
                .addPanelPosition($mdPanel.xPosition.ALIGN_END, $mdPanel.yPosition.BELOW),
            locals: {
                items: ['Account', 'Sign Out']
            },
            openFrom: $event
        });
    }
    
});
