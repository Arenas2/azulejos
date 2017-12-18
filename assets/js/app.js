// var app = angular.module('myapp', ['ngMaterial', 'ui.router', 'ngAnimate', 'ngStorage', 'oc.lazyLoad']);

var app = angular.module('myapp', [
    'ngMaterial',
    'ui.router',
    'ngAnimate',
    'oc.lazyLoad',
    'ngStorage',
    'uiGmapgoogle-maps',
    'ngCroppie',
    'md.data.table',
    'angulartics',
    'angulartics.google.tagmanager'
]);

//TEMAS
app.config(function($mdThemingProvider, $mdPanelProvider) {
    $mdThemingProvider.theme('default').primaryPalette('indigo',{
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    }).accentPalette('red').warnPalette('red').backgroundPalette('grey');

    $mdPanelProvider.definePreset('Panel', {
        attachTo: angular.element(document.body),
        controller: function PanelMenuCtrl(mdPanelRef, $mdDialog, $scope, AuthService) {
            this.closeMenu = function() {
                mdPanelRef && mdPanelRef.close();
            };

            $scope.logout = function(){

                ventana = $mdDialog.confirm()
                .title('¿Quieres hacer Logout?')
                .textContent('Si quieres hacerlo dale Aceptar')
                .ok('Aceptar')
                .cancel('Cerrar')
                .clickOutsideToClose(true);

                $mdDialog.show(ventana).then(function() {

                    AuthService.logout();

                }, function() {

                });
            }

            $scope.secciones = [
                {nombre: 'home'},
                {nombre: 'categorias'},
                {nombre: 'catalogos'},
                {nombre: 'ubicaciones'},
                {nombre: 'nosotros'}
            ];
        },
        controllerAs: 'ctrl',
        template: '' +
            '<md-card>' +
            '   <md-list>' +
            '       <md-list-item ui-sref="{{seccion.nombre}}" ng-repeat="seccion in secciones">' +
            '           <p> {{seccion.nombre}} </p>  ' +
            '       </md-list-item>' +
            '       <md-divider></md-divider>' +
            '   </md-list>' +
            '</md-card>',
        panelClass: 'panel',
        clickOutsideToClose: true,
        focusOnOpen: false,
        zIndex: 100,
        hasBackdrop : true,
        disableParentScroll: false,
        propagateContainerEvents: true,
        groupName: 'menus'
    });

});

app.config(['uiGmapGoogleMapApiProvider', function (uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyAqXo2belQRByZzSEr5MgqzKKIYmGcmoes',
            v: '3.20', //defaults to latest 3.X anyhow
            libraries: 'weather,geometry,visualization, places',
            china: true
        });
}]);

//TEMAS
// app.config(function($mdThemingProvider) {
//     $mdThemingProvider.theme('default').primaryPalette('indigo').accentPalette('orange').warnPalette('red').backgroundPalette('grey');
// });

app.run(function($rootScope, $transitions, $timeout) {
    $transitions.onStart({}, trans => {
        $rootScope.loading = true;
        $timeout.cancel()

    });

    $transitions.onSuccess({}, trans => {
        $rootScope.loading = false;
    });
})
app.service('mdDialog', function ($mdDialog) {

    this.mostrardialog = function (template, DialogController, tamanioPantalla, ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/partials/' + template,
            parent: angular.element(document.body),
            clickOutsideToClose: true,
            fullscreen: tamanioPantalla
        }).then(function (answer) {
            console.log(template);
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.personalizable = function (answer) {
            $mdDialog.hide(answer);
            //OCULTA Y HAZ ALGO
        };
    }
});

app.service('database', function ($http) {

    this.getAll = function (datatable, success) {
        $http.post('db/pop.php', {
            table: datatable
        }).success(success);
    };
});

app.service('alertas', [
    '$mdToast',
    function($mdToast) {
        this.mostrarToastEstandar = function(mensaje) {
            var last = {
                bottom: true,
                top: false,
                left: false,
                right: true
            };

            var toastPosition = angular.extend({}, last);

            function getToastPosition() {
                sanitizePosition();

                return Object.keys(toastPosition).filter(function(pos) {
                    return toastPosition[pos];
                }).join(' ');
            };

            function sanitizePosition() {
                var current = toastPosition;

                if (current.bottom && last.top)
                    current.top = false;
                if (current.top && last.bottom)
                    current.bottom = false;
                if (current.right && last.left)
                    current.left = false;
                if (current.left && last.right)
                    current.right = false;

                last = angular.extend({}, current);
            }

            var pinTo = getToastPosition();

            $mdToast.show($mdToast.simple().textContent(mensaje).position(pinTo).theme('green').hideDelay(3000));
        }
    }
]);
