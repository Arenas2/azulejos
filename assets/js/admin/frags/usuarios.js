var app = angular.module('myapp');

app.controller('usuariosCtrl', function($scope, $stateParams, $mdDialog, Usuario) {

    Usuario.obtener().then(res => {
        $scope.usuarios = res.data;
    })

});
