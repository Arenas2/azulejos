// app.constant('roless', {
//     all: 'all',
//     admin: 'admin',
//     editor: 'editor',
//     guest: 'guest'
// })


app.factory('AuthService', function($q, $window, $http, Session, $localStorage, alertas, $state, $rootScope) {

    var authService = {};



    authService.registro = function(credentials) {
        var deferred = $q.defer();

        $http.post('/data/registro', credentials)
        .success(data => {
            console.log(data);
            // alertas.mostrarToastEstandar("Usuario registrado");
            // Session.create(data.user);
            // $window.location.href = "/user";
            // $localStorage.auth = true;
        })
        .error(err => {
            alertas.mostrarToastEstandar("No se pudo registrar");
            console.log(err);
        });
        return deferred.promise;

    };

    // authService.login = function(credentials) {
    //     $http.post('/data/login', credentials)
    //     .success(data => {
    //         if(data.token){
    //             console.log(data);
    //             Session.create(data.token);
    //             // $localStorage.auth = true;
    //             $window.location.href = "/user";
    //         }else{
    //             alertas.mostrarToastEstandar("Usuario o contraseña incorrecta");
    //         }
    //
    //     })
    //     .error(function(data){
    //         console.log(data);
    //     })
    // };

    authService.login = function(credentials) {
        var deferred = $q.defer();
        $http.post('/data/login', credentials)
        .then(res => {

            if(res.data.token){
                console.log(res);
                Session.create(res.data.token);
                $window.location.href = "/admin";
            }else{
                alertas.mostrarToastEstandar("Usuario o contraseña incorrecta");
            }
            deferred.resolve(res.data);

        })
        return deferred.promise;

    };


    authService.logout = function() {
        Session.destroy();
    };

    authService.update = function(user) {
        var deferred = $q.defer();
        return $http.post( '/user/update', user).then(function(resp) {
            if (resp.status === 200) {
                Session.create(resp.data);
            }
            return resp;
        });
    };

    authService.token = function(token) {
        var deferred = $q.defer();
        $http.post('/data/token', {token: token}).then(res => {
            console.log(res)
            deferred.resolve(res.data);
            if (res.data.success === false) {
                alertas.mostrarToastEstandar("No se pudo logear");
                $window.location.href = "/#!/acceso";
            } else {
                $rootScope.rol = res.data.usuario.privilegio;
                alertas.mostrarToastEstandar("Paso el proceso de seguridad");
            }
        })

        return deferred.promise;
    }

    authService.autorizacion = function(roles) {
            let rol = $rootScope.rol;
            x = _.includes(roles, rol)
            return x;
    };

    return authService;

});


app.service('Session', function($localStorage) {
    this.create = function(data) {
        $localStorage.$reset();
        $localStorage.token = data;
    };

    this.destroy = function() {
        $localStorage.$reset();
    };
});
