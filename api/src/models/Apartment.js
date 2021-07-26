const {DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	sequelize.define('apartment', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		cata_apartment: {
			type: DataTypes.STRING(20),
			unique: true,
		},
		number_apartment: {
			type: DataTypes.STRING(20),
			unique: 'compUnique',  
		},
		mt2: {
			type: DataTypes.INTEGER,
		},
		state: {
			type: DataTypes.INTEGER,
		},
	},{paranoid: true});
};
