var app = angular.module('myapp');

app.controller('homeCtrl', function($scope, $rootScope, $http, $mdDialog, $localStorage,mdDialog, $timeout, $mdSidenav, $state, $stateParams, Usuario) {

    console.log($localStorage.token);

    var token = $localStorage.token

    $http.get('/data/token/' + token).then(data => {
        let id = data.data.id
        Usuario.one(id).then(data => {
            console.log(data);
        })
    })

});
