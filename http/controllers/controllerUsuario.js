var _ = require('lodash');
var db = require('../relations');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var localStrategy = require('passport-local').Strategy;
var usuario = db.usuario;
var sucursal = db.sucursal;

var secret  = 'ScarlettJohanson';

var ex = module.exports = {};

passport.serializeUser(function(user, done) {

    var serializeData = {
        userId: user.id,
        username: user.nombre,
        email: user.correo
    };

    done(null, serializeData);

});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

ex.create = function(req, res, next) {

    // res.send({message: 'Esto es un mensaje'});

    // var data = req.body;
    //
    // console.log(data);
    // usuario.create(data).then(function() {
    //     res.status(200).jsonp(req.body);
    // });

};

ex.update = function(req, res, next) {

    var data = req.body;
    var id = req.params.id;

    var bandera = _.has(data, 'imagen')

    usuario.update(data, {
        where: {
            id: id
        }
    }).then(function(result) {
        res.status(200).jsonp(result);
    })

};

ex.read = function(req, res, next) {

    var id = req.params.id;

    if (id) {
        usuario.findById(id, {
            include : [
                {
                    model : sucursal,
                    as : 'Sucursal'
                }
            ]
        }).then(function(usuario) {
            res.status(200).jsonp(usuario);
        });
    } else {
        usuario.findAll().then(function(usuarios) {
            res.status(200).jsonp(usuarios);
        });
    }
};

ex.token = function(req, res, next){

    var token = req.body.token;

    jwt.verify(token, secret, function(err, decoded){
        if(err){
            res.json({success : false, message: 'token invalid'})
        }else{
            res.json(decoded)
        }
    });
}

ex.login = function(req, res, next) {

    var data = req.body;
    passport.authenticate('login', function(err, user, info) {

        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: 'Incorrect username or password.'});
        }

        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            var token = jwt.sign({ usuario: user }, secret, { expiresIn: '1h' });
            return res.send({success: true, message: 'Authentication succeeded', token: token});
        });


    })(req, res, next);

};

passport.use('login', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    usuario.findOne({
        where: {
            'correo': username
        }
    }).then(user => {
        if (!user) {
            return done(null, false)
        }
        if (password == user.password) {
            return done(null, user)
        }
        return done(null, false)
    })
}))

ex.registro = function(req, res, next) {

    var data = req.body;

    console.log(data);

    passport.authenticate('registro', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({success: false, message: info});
        }
        req.login(user, function(err) {
            if (err) {
                return next(err);
            }
            return res.send({success: true, message: 'Registration succeeded', usuario: user});
        });
    })(req, res, next);

};





passport.use('registro', new localStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    usuario.find({
        where: {
            'correo': username
        }
    }).then(user => {

        if (user) {
            return done(null, false);
        } else {
            var data = req.body;
            usuario.create(data).then(user => {
                return done(null, user);
            });
        }

    }, function(err) {
        done(err, null);
    });
}));
