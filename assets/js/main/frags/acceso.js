var app = angular.module('myapp');

app.controller('accesoCtrl', function($scope, AuthService) {

    $scope.acceder = function(usuario){

        console.log(usuario)

        AuthService.login(usuario).then(res => {
            console.log(res.data);
        })
    }

});
