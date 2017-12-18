app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
}]);

app.config(['$urlRouterProvider', '$stateProvider', function ($urlRouterProvider, $stateProvider) {

	$urlRouterProvider.otherwise('/');
	$stateProvider

	.state('home', {
		url: '/',
		views: {
			'main': {
				templateUrl: '/user/home',
				controller: 'homeCtrl as ctrl'
			}
		},
		resolve: {
			loadMyCtrl: [
				'$ocLazyLoad',
				function($ocLazyLoad) {
					return $ocLazyLoad.load(['ozUserHome']);
				}
			]
		}
	});
}]);
