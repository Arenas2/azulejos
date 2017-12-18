app.run([
    '$rootScope',
    '$state',
    '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);

app.config([
    '$urlRouterProvider',
    '$stateProvider',
    function($urlRouterProvider, $stateProvider) {

    	function template(url, template, controller, oz, params) {
    		let obj = {
    			url: url,
    			params: params,
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

        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', template('/', '/main/home', 'homeCtrl', 'ozHome'))
        .state('categorias', template('/categorias', '/main/categorias', 'categoriasCtrl', 'ozCategorias'))

        .state('llantas', template('/llantas', '/main/llantas', 'galeriaCtrl', 'ozGaleria'))

        .state('galeria', template('/galeria', '/main/galeria', 'galeriaCtrl', 'ozGaleria'))
        .state('promociones', template('/promociones', '/main/promociones', 'promocionesCtrl', 'ozPromos'))
        .state('catalogos', template('/catalogos', '/main/catalogos', 'catalogosCtrl', 'ozCatalogos'))

        .state('catalogo', template('/catalogo/:id', '/main/catalogo', 'catalogoCtrl', 'ozCatalogo', {id : null}))
        .state('ubicaciones', template('/ubicaciones', '/main/ubicaciones', 'ubicacionesCtrl', 'ozUbicaciones'))
        .state('nosotros', template('/nosotros', '/main/nosotros', 'nosotrosCtrl', 'ozNosotros'))
		.state('filtro', template('/filtro/:id/:titulo', '/main/filtro', 'filtroCtrl', 'ozFiltro', { 'id' : null, 'titulo' : null}))

		.state('acceso', template('/acceso', '/main/acceso', 'accesoCtrl', 'ozAcceso'))

    }
]);
