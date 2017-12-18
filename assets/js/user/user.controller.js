app.controller('userCtrl', function($window, $scope, $rootScope, $http, mdDialog, $timeout, $mdSidenav, $localStorage) {

    $scope.usuario = $localStorage.usuario;

    $scope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        };
    }

});
