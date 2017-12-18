var app = angular.module('myapp');

app.controller('categoriasCtrl', function($scope, $state, Producto, alertas, $mdDialog) {

    Producto.categorias().then(res => {
        $scope.categorias = res.data
        $scope.$digest();
    })

	$scope.irA = (categoria) => {

        $state.go('filtro', {id: categoria.id, titulo: _.snakeCase(categoria.nombre)})

	}

});
