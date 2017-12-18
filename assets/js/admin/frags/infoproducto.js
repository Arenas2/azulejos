var app = angular.module('myapp');

app.controller('infoproductoCtrl', function($scope, $state, alertas, $stateParams,  $mdDialog, Producto) {

    console.log($stateParams)

    if($stateParams.id === null){
        $state.go('producto')
    }else{

        Producto.one($stateParams.id).then(res => {

            $scope.producto = res.data;
            obtenerCategoriasDisponibles(res.data.IdCategoria);
            obtenerAtributos(res.data.id);
            $scope.$digest();

        })

    	Producto.categorias().then(res => {$scope.categorias = res.data})
        Producto.marcas().then(res => {$scope.marcas = res.data})
        Producto.colores().then(res => {$scope.colores = res.data})
    }

    function obtenerAtributos(id){
        Producto.atributos(id).then(res => {
            $scope.atributos = res.data;
            $scope.$digest();
        })
    }

    function obtenerCategoriasDisponibles(id){

        console.log(id);

        if(id !== null){

            Producto.atributosdisponibles(id).then(res => {
                $scope.atributosdisponibles = res.data
                console.log(res.data);
                $scope.$digest();
            })
        }
    }

    $scope.submit = function(producto) {
        console.log(producto);
        Producto.editar(producto).then(function(res) {
            obtenerCategoriasDisponibles(producto.IdCategoria)
            obtenerAtributos(producto.id);
            alertas.mostrarToastEstandar("Producto editado correctamente");
        })
    }

    $scope.eliminarProducto = function(producto, $index) {
        console.log($index);
        ventana = $mdDialog.confirm().title('¿Seguro que quieres eliminar el Producto?').textContent('Para eliminar de forma permanente seleccione aceptar').ok('Aceptar').cancel('Cancelar').clickOutsideToClose(true);

        $mdDialog.show(ventana).then(function() {

            Producto.eliminar(producto.id).then(function(data) {
                $scope.productos.splice($index, 1)
                $scope.$digest();
            })

        }, function() {});
    }


    $scope.focusInfo = function(info){

        info ? (info.IdAtributo = info.atributo.id, $scope.info = info) : ($scope.info = {});

    }

    $scope.submitInfo = function(info){
        info.IdProducto = $scope.producto.id;
        info.id === undefined ?
        (
            Producto.crearInfo(info).then(res => {
                // $scope.op.materias.push(res.data)
                $scope.$digest();
                alertas.mostrarToastEstandar("Información creada");
                delete $scope.info;
            })
        ) : (
            Producto.editarInfo(info).then(res => {
                // $scope.op.materias.push(res.data)
                alertas.mostrarToastEstandar("Información editada");
                delete $scope.info;
            })
        );
    }

});
