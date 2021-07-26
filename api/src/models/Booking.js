const {DataTypes} = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
	sequelize.define('booking', {
		start: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		finish: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM({
				values: ['free', 'booked', 'cancelled'],
			}),
			defaultValue: 'free',
		},
	},{paranoid: true});
};
