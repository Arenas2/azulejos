app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	function complejo(url, template, controller, oz, roles, params) {
		let obj = {
			url: url,
			params: params,
			data: {
				authorizedRoles: roles
			},
			views: {
				'main': {
					templateUrl: template,
					controller: controller + ' as ctrl'
				}
			},
			resolve: {
				loadMyCtrl: [
					'$ocLazyLoad',
					function($ocLazyLoad) {
						return $ocLazyLoad.load([oz]);
					}
				]
			}
		}
		return obj
	}

	function simple(url, template) {
	    let obj = {
	        url: url,
	        views: {
	            'main': {
	                templateUrl: template
	            }
	        }
	    }
	    return obj
	}

	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('home', complejo('/', '/admin/home', 'homeCtrl', 'ozAdminHome', ['admin']))
	.state('producto', complejo('/producto', '/admin/producto', 'productoCtrl', 'ozAdminProducto', ['admin']))
	.state('infoProducto', complejo('/infoProducto/:id', '/admin/infoProducto', 'infoproductoCtrl', 'ozAdminInfoProducto', ['admin'], { 'id' : null}))
	.state('galeria', complejo('/galeria', '/admin/galeria', 'galeriaCtrl', 'ozAdminGaleria', ['admin']))
	.state('promo', complejo('/promo', '/admin/promo', 'promoCtrl', 'ozAdminPromo', ['admin']))
	.state('catalogo', complejo('/catalogo', '/admin/catalogo', 'catalogoCtrl', 'ozAdminCatalogo', ['admin']))
	.state('sucursales', complejo('/sucursales', '/admin/sucursales', 'sucursalesCtrl', 'ozAdminSucursales', ['admin']))
	.state('sucursal', complejo('/sucursal/:id', '/admin/sucursal', 'sucursalCtrl', 'ozAdminSucursal', ['admin'], { 'id' : null}))
	.state('telefono', complejo('/telefono', '/admin/telefono', 'telefonoCtrl', 'ozAdminTelefono', ['admin']))
	.state('cotizaciones', complejo('/cotizaciones', '/admin/cotizaciones', 'cotizacionesCtrl', 'ozAdminCotizaciones', ['admin']))
	.state('usuarios', complejo('/usuarios', '/admin/usuarios', 'usuariosCtrl', 'ozAdminUsuarios', ['admin']))
	.state('usuario', complejo('/usuario/:id', '/admin/usuario', 'usuarioCtrl', 'ozAdminUsuario', ['admin'], { 'id' : null}))
}]);
