var mysql = require('mysql');
var Sequelize = require('sequelize');

var sequelize = new Sequelize('gigante', 'root', '1234', {
    host: '130.211.165.85',
    dialect: 'mysql',
    port: '4306',
	operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// var sequelize = new Sequelize('gigante', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: '8889',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

sequelize.sync()
    .then(function() {
        console.log('Connecion realizada');
    })
    .catch(function(err) {
        console.log('No se puede conectar a la bd:', err);
    }
);

module.exports.Sequelize = Sequelize;
module.exports.sequelize = sequelize;
//mysql://b0904857903f5c:dd1b28ec@us-cdbr-iron-east-05.cleardb.net/heroku_f9d829d71b45599?reconnect=true
