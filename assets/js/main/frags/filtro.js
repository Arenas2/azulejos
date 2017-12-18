var app = angular.module('myapp');

app.controller('filtroCtrl', function($scope, $state, $stateParams, Producto, $mdDialog, alertas, $analytics, Cotizacion) {

    console.log(navigator)

    self = this;
    $scope.loading = true;

    var id = $stateParams.id !== null ? $stateParams.id : 1;

    Producto.categoria(id).then(res => {
        self.selectedCategoria = res.data
        console.log(res)
    })

    Producto.categorias().then(res => { $scope.categorias = res.data })

    $scope.eliminarFiltro = (x, idx) => {

        filtro.atributos = idx
        filtro.obtener()

    }

    $scope.currentPage = 1;

    class Paginacion {

        constructor(){

            this.total = 0,
            this.current = 1,
            this.onPageChanged = function(){

                $analytics.eventTrack('pagina', {  category: 'pagina', action: 'cambio de pagina', label: this.current });


                filtro.pagina = this.current;
                $scope.currentPage = this.current;
                filtro.obtener()
            }

        }

    }

    $scope.paging = new Paginacion()

    class Filtro{

        constructor(){

            this.pagina = 1,
            this.limite = (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? this.limite = 18 : this.limite = 4,
			this.order =  ['id'],
            this.where = {
                IdCategoria : id
            },
            this.include = []
        }

        nombres(){
            Producto.nombres({ where: this.where }).then(res => {
                $scope.nombres = res.data;
                $scope.$digest()
            })
        }

        obtener(peticion){

            this.where = peticion ? (peticion.where) : (this.where);

            console.log(this)

            return new Promise((resolve, reject) => {
                Producto.filtro(this).then(res => {
                    $scope.productos = res.data.items;
                    $scope.paging.total = res.data.paginas;
                    $scope.currentPage = res.data.pagina;
                    $scope.loading = false;
                    $scope.$digest()
                    resolve(res.data)
                    console.log(res)
                })
            })
        }

        get peticion(){
            //- console.log('inicie get')
            return this
        }

        set atributos(value){

            this.include = value

        }

        set eliminarAtributo(index){
            this.include.splice(index, 1)
        }

    }

    var filtro = new Filtro()

    filtro.obtener()
    filtro.nombres()


    // $scope.paging = {
    //     total: cantidad,
    //     current: filtro.offset,
    //     onPageChanged: loadPages,
    // };

    // $scope.currentPage = 0;
    //
    // function loadPages() {
    //
    //     // //- console.log('Current page is : ' + $scope.paging.current);
    //
    //     filtro.offset = $scope.paging.current;
    //
    //     // TODO : Load current page Data here
    //
    //     $scope.currentPage = $scope.paging.current;
    //
    // }

    $scope.mostrarfiltro = (ev) => {

        $analytics.eventTrack('filtros', {  category: 'abrir ventana', action: 'abrir ventana', label: 'abrir ventana' });

        $scope.categoria === undefined  ? (

            alert = $mdDialog.alert()
            .title('Alerta')
            .content('Para acceder a los filtros especiales por categoría necesitas seleccionar primero una categoría')
            .ok('Close'),

            $mdDialog
                .show( alert )
                .finally(function() {
                alert = undefined;
            })

        ) : (

            $mdDialog.show({
                templateUrl: '/dialogs/filtro',
                parent: angular.element(document.body),
                locals: {
                    id: $scope.categoria.id
                },
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: $scope.customFullscreen,
                controller: function($scope, $mdDialog, id, Categoria, Producto) {


                    Producto.marcas().then(res => { $scope.marcas = res.data})
                    Producto.colores().then(res => { $scope.colores = res.data})

                    $scope.peticion = {
                        atributos : []
                    }

                    Categoria.one(id).then(res => {

                        $scope.categoria = res.data
                        console.log(res.data)
                        $scope.$digest();

                    })

                    // $scope.contar = (id) => {
                    //     Categoria.contarOpcionesProductos(id).then(res => {
                    //         console.log(res)
                    //     })
                    // }

                    $scope.seleccionar = function(atributo, opcion){

                        $scope.peticion.atributos.push({atributo : atributo.nombre, opcion: opcion.nombre, IdOpcion : opcion.id})

                    }

                    $scope.hide = function() {
                        $mdDialog.hide();
                    };

                    $scope.aplicar = function(){
                        $mdDialog.hide($scope.peticion);
                    }

                },
            }).then(data => {

                if(data.atributos){

                    $scope.filtrosaplicados = data.atributos;
                    filtro.atributos = _.map(data.atributos, 'IdOpcion')
                    filtro.pagina = 1;
                    filtro.obtener()

                }

            }, function() {})
        )
    }

    self.BuscarNombreChange = (text) => {}
    self.nombreSeleccionadoChange = (item) => {

        item ? (
            filtro.obtener({
                model : 'opcion',
                as: 'Opcion',
                where: {
                    nombre : item.nombre
                }
            })
        ) : (
            filtro.obtener()
        )
    }


    self.BuscarCategoriaChange = (text) => {}
    self.CategoriaSeleccionadoChange = (item) => {

        $scope.categoria = item;

        item ? (
            filtro.obtener({
                where : {
                    IdCategoria : item.id
                }
            })

        ) : (
            delete $scope.peticion.where.IdColor,
            filtro.obtener()
        )
    }


    //-- COTIZACION

	$scope.cotizacion = {
        bolsa : []
    };

    $scope.agregar = (producto) => {

        $analytics.eventTrack('agregar producto', {  category: 'Se agrego un producto', action: 'agregar', label: producto.id + ' ' + producto.nombre });

        alert = $mdDialog.alert()
        .title('Exito')
        .content('El Producto ' + producto.nombre + ' ha sido agregado a tu lista, para visualizarla haz click en el carrito de la esquina')
        .ok('Close');

        $mdDialog
            .show( alert )
            .finally(function() {
            alert = undefined;
        });

        $scope.cotizacion.bolsa.push({id: producto.id, nombre: producto.nombre});

    }

    $scope.verProducto = (producto) => {

        $analytics.eventTrack('ver producto', {  category: 'Se ve producto', action: 'abrir ventana', label: producto.id + ' ' + producto.nombre });

        $mdDialog.show({
            templateUrl: '/dialogs/fichaproducto',
            parent: angular.element(document.body),
            locals: {
                id: producto.id
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: $scope.customFullscreen,
            controller: function($scope, $mdDialog, Producto, alertas, $state, id, Producto){

                Producto.info(id).then(res => {
                    $scope.producto = res.data;
                    console.log(res)
                })

                $scope.close = function(){
                    $mdDialog.hide();
                }

                $scope.agregar = function(){
                    $mdDialog.hide(producto);
                }

            }
        }).then(data => {

            $scope.agregar(data)

        });

    }

    $scope.verBolsa = () => {

        $analytics.eventTrack('ver bolsa', {  category: 'ver bolsa', action: 'ver bolsa', label: 'ver bolsa' });

        $mdDialog.show({
            templateUrl: '/dialogs/listadecompra',
            parent: angular.element(document.body),
            locals: {
                cotizacion: $scope.cotizacion
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: true,
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog, Producto, alertas, $state, cotizacion){

                $scope.cotizacion = cotizacion;

                console.log(cotizacion)

                $scope.eliminar = function(idx){
                    $scope.cotizacion.bolsa.splice(idx, 1);
                }

                $scope.seguir = function(){
                    $mdDialog.hide(2);
                }

                $scope.enviar = function(){
                    $mdDialog.hide(3);
                }

                $scope.close = () => {
                    $mdDialog.hide();
                }

            }
        }).then(data => {

            switch (data) {
                case 1:
                    $scope.cotizacion = {
                        bolsa : []
                    }
                    alertas.mostrarToastEstandar("Se ha eliminado la lista");
                    break;
                case 2:
                    alertas.mostrarToastEstandar("puedes seguir editando");
                    break;
                case 3:
                $scope.enviarCotizacion()
                    break;
                default:
            }

        });

    }

    $scope.enviarCotizacion = () => {

        $analytics.eventTrack('Cotizacion', {  category: 'Revisar', action: 'Revisar', label: 'Revisar' });

        $mdDialog.show({
            templateUrl: '/dialogs/cotizacion',
            parent: angular.element(document.body),
            locals: {
                cotizacion: $scope.cotizacion
            },
            bindToController: true,
            preserveScope: true,
            fullscreen: true,
            clickOutsideToClose: true,
            controller: function($scope, $mdDialog, Producto, alertas, $state, cotizacion, Sucursal){

                Sucursal.obtener().then(res => {
                    $scope.sucursales = res.data;
                    console.log(res)
                })

                console.log($scope.posicion)

                $scope.cotizacion = cotizacion;

                console.log(cotizacion)

                navigator.geolocation.getCurrentPosition(position => {

                    let lat1  = position.coords.latitude
                    let lon1 = position.coords.longitude

                    let menor = 6371
                    let index = 0
                    let temp = 0

                    _.forEach($scope.sucursales, function(sucursal) {

                        let lat2 = sucursal.latitude;
                        let lon2 = sucursal.longitude;

                        let distancia = getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2)

                        if(menor > distancia){
                            temp = sucursal.id
                            menor = distancia
                        }

                        index++

                        if(index === $scope.sucursales.length){
                            $scope.cotizacion.IdSucursal = temp
                            $scope.$digest();
                        }

                    })
                })

                function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
                      var R = 6371; // Radius of the earth in km
                      var dLat = deg2rad(lat2-lat1);  // deg2rad below
                      var dLon = deg2rad(lon2-lon1);
                      var a =
                        Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2)
                        ;
                      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                      var d = R * c; // Distance in km
                      return d;
                }

                function deg2rad(deg) {
                  return deg * (Math.PI/180)
                }

                $scope.enviar = function(cotizacion){
                    $mdDialog.hide(cotizacion);
                }

                $scope.close = () => {
                    $mdDialog.hide();
                }

            }
        }).then(data => {

            Cotizacion.crear(data).then(res => {

                alertas.mostrarToastEstandar("Se ha enviado la cotizaicon");
                $analytics.eventTrack('Cotizacion', {  category: 'Revisar', action: 'Revisar', label: 'Revisar' });
            })

        });

    }


});
