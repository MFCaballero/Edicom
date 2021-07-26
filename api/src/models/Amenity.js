const {DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	sequelize.define('amenity', {
		amenity_type: {
			type: DataTypes.STRING,
		},
		quantity: {
			type: DataTypes.STRING,
		},
		capacity: {
			type: DataTypes.STRING,
		},
		amenity_detail: {
			type: DataTypes.STRING,
		},
	},{paranoid: true});
};
