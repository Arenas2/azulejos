var app = angular.module('myapp');

app.controller('catalogosCtrl', function($scope, Catalogo, Marca) {


    Marca.catalogos().then(res => {
        $scope.marcas = res.data;
        console.log(res)
    })


    Catalogo.obtener().then(res =>{

        $scope.catalogos = res.data;
        $scope.$digest();

        console.log(res.data);

    })

});
