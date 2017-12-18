var ex = function(conector) {

    var Sequelize = conector.Sequelize;
    var sequelize = conector.sequelize;

    var Promo = sequelize.define('promo', {
        nombre : Sequelize.STRING,
        status : Sequelize.INTEGER,
        imagen: {
            type: Sequelize.BLOB('medium'),
            get() {
                var imagenBin = this.getDataValue('imagen');
                var Imagenes = new Buffer(imagenBin).toString('ascii');
                return Imagenes
            },
        }
    })

    return Promo;

};

module.exports = ex;
