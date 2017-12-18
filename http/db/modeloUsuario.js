var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Usuario = sequelize.define('usuario', {
        nombre: Sequelize.STRING,
        correo: Sequelize.STRING,
		fb_id: Sequelize.STRING,
        password: Sequelize.STRING,
        customer_id: Sequelize.STRING,
        privilegio: Sequelize.STRING
    })

    return Usuario;

};

module.exports = ex;
